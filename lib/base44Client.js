// LocalStorage persistence layer — drop-in replacement for Base44/Supabase.
// All data lives in the browser. No backend required.

function uuid() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now();
}

function parseSort(sortStr) {
  if (!sortStr) return null;
  const ascending = !sortStr.startsWith('-');
  const column = sortStr.replace(/^-/, '');
  return { column, ascending };
}

function createEntityApi(storageKey) {
  const getAll = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch {
      return [];
    }
  };

  const saveAll = (items) => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  };

  const sortItems = (items, sortStr) => {
    if (!sortStr) return items;
    const { column, ascending } = parseSort(sortStr);
    return [...items].sort((a, b) => {
      const av = a[column] ?? '';
      const bv = b[column] ?? '';
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return ascending ? cmp : -cmp;
    });
  };

  return {
    async list(sort, limit) {
      let items = getAll();
      if (sort) items = sortItems(items, sort);
      if (limit) items = items.slice(0, limit);
      return items;
    },

    async filter(params, sort, limit) {
      let items = getAll().filter((item) =>
        Object.entries(params).every(([k, v]) => item[k] === v)
      );
      if (sort) items = sortItems(items, sort);
      if (limit) items = items.slice(0, limit);
      return items;
    },

    async create(data) {
      const items = getAll();
      const newItem = { ...data, id: uuid(), created_date: new Date().toISOString() };
      items.push(newItem);
      saveAll(items);
      return newItem;
    },

    async update(id, data) {
      const items = getAll();
      const idx = items.findIndex((i) => i.id === id);
      if (idx === -1) throw new Error(`Item not found: ${id}`);
      items[idx] = { ...items[idx], ...data };
      saveAll(items);
      return items[idx];
    },

    async delete(id) {
      saveAll(getAll().filter((i) => i.id !== id));
    },

    async bulkCreate(dataArray) {
      const items = getAll();
      const created = dataArray.map((data) => ({
        ...data,
        id: uuid(),
        created_date: new Date().toISOString(),
      }));
      saveAll([...items, ...created]);
      return created;
    },
  };
}

// ── Auth ──────────────────────────────────────────────────────────────────────

const SESSION_KEY = 'atlas_session';
const USERS_KEY   = 'atlas_users';

function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; }
}

export const base44 = {
  entities: {
    Client:             createEntityApi('atlas_clients'),
    Portfolio:          createEntityApi('atlas_portfolios'),
    Holding:            createEntityApi('atlas_holdings'),
    FinancialReview:    createEntityApi('atlas_financial_reviews'),
    RiskAssessment:     createEntityApi('atlas_risk_assessments'),
    WatchlistItem:      createEntityApi('atlas_watchlist_items'),
    GeneratedReport:    createEntityApi('atlas_generated_reports'),
    RegulatoryDocument: createEntityApi('atlas_regulatory_documents'),
    ClientInteraction:  createEntityApi('atlas_client_interactions'),
    RebalanceAction:    createEntityApi('atlas_rebalance_actions'),
  },

  auth: {
    async me() {
      const session = getSession();
      if (!session) throw new Error('Not authenticated');
      return session;
    },

    async logout() {
      localStorage.removeItem(SESSION_KEY);
      window.location.href = '/Login';
    },

    redirectToLogin() {
      window.location.href = '/Login';
    },

    async updateMe(data) {
      const session = getSession();
      if (!session) throw new Error('Not authenticated');
      const updated = { ...session, ...data };
      localStorage.setItem(SESSION_KEY, JSON.stringify(updated));

      // Also update in users store
      try {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const idx = users.findIndex((u) => u.id === session.id);
        if (idx !== -1) { users[idx] = { ...users[idx], ...data }; localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
      } catch {}
    },

    // Called by Login page
    async signIn(email, password) {
      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail || !password) throw new Error('Email and password are required');
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      const user = users.find((u) => u.email.toLowerCase() === normalizedEmail && u.password === password);
      if (!user) throw new Error('Invalid email or password');
      const { password: _pw, ...session } = user;
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    },

    async signUp(email, password, fullName) {
      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail || !password || !fullName) throw new Error('All fields are required');
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      if (users.find((u) => u.email.toLowerCase() === normalizedEmail)) throw new Error('Email already registered');
      const newUser = { id: uuid(), email: normalizedEmail, password, full_name: fullName, created_date: new Date().toISOString() };
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      const { password: _pw, ...session } = newUser;
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    },
  },

  appLogs: { logUserInApp: () => Promise.resolve() },
};
