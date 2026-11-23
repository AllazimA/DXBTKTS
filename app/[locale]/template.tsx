/** Re-mounts on every navigation, so each page arrives with a quiet fade. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="dxb-page-in">{children}</div>
}
