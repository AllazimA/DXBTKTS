#!/bin/bash
# Daily backup of the DXB TKTS website's live data, run by the LaunchAgent com.dxbtkts.backup (21:45).
# The code is in git; this covers what git ignores: the order/payment/enquiry/request logs (data/*.jsonl),
# the published pricing (data/published/), the CRM outbox (data/crm-outbox/) and .env.local.
# Writes backups/daily/dxbtkts-data-<timestamp>.tar.gz, checks the archive reads back with every file,
# keeps the newest 30, and copies it to the USB drive when it is plugged in (a missing drive is not a failure).
# Log: ~/Library/Logs/DXBTKTS/backup.log. A failure shows a macOS notification.
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
cd "/Users/ahmeda/Cowork Playground/DXBTKTS" || exit 1
stamp() { date '+%F %T'; }
notify() { /usr/bin/osascript -e "display notification \"$1\" with title \"DXB TKTS website\"" >/dev/null 2>&1; }
fail() { echo "$(stamp) BACKUP FAILED: $1"; notify "The daily website backup failed. See ~/Library/Logs/DXBTKTS/backup.log"; exit 1; }

DEST="$PWD/backups/daily"
USB="/Volumes/AHMED USB/DXBTKTS-backups"
mkdir -p "$DEST" || fail "cannot create $DEST"

ITEMS=()
for p in data/*.jsonl data/published data/crm-outbox .env.local; do [ -e "$p" ] && ITEMS+=("$p"); done
[ ${#ITEMS[@]} -gt 0 ] || fail "nothing to back up (data files missing?)"

FILE="$DEST/dxbtkts-data-$(date '+%Y-%m-%dT%H-%M-%S').tar.gz"
tar -czf "$FILE" "${ITEMS[@]}" || fail "tar failed"

# Verify: the archive lists the same number of files as are on disk.
want=$(find "${ITEMS[@]}" -type f | wc -l | tr -d ' ')
got=$(tar -tzf "$FILE" | grep -v '/$' | wc -l | tr -d ' ')
[ "$want" = "$got" ] || fail "archive has $got files, expected $want"
echo "$(stamp) backup verified: $(basename "$FILE") ($got files, $(du -h "$FILE" | cut -f1))"

# Keep the newest 30 local archives.
ls -1t "$DEST"/dxbtkts-data-*.tar.gz 2>/dev/null | tail -n +31 | while read -r old; do rm -f "$old"; done

if [ -d "/Volumes/AHMED USB" ]; then
  # Copied with node: macOS lets node (not launchd's bash) write to the removable drive, as for the finance jobs.
  node -e 'const fs=require("fs"),p=require("path");const[f,d]=process.argv.slice(1);fs.mkdirSync(d,{recursive:true});const t=p.join(d,p.basename(f));fs.copyFileSync(f,t);if(!fs.readFileSync(f).equals(fs.readFileSync(t)))process.exit(1)' "$FILE" "$USB" \
    && echo "$(stamp) ok   copied to $USB" \
    || { echo "$(stamp) USB COPY FAILED (the local backup is fine)"; notify "The USB copy of the website backup failed."; }
else
  echo "$(stamp) USB drive not plugged in; local backup only"
fi
