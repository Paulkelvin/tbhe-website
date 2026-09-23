import { hasAdminToken } from "@/sanity/adminClient"

export default function AdminDashboardPage() {
  return (
    <div>
      <p className="eyebrow text-primary">Dashboard</p>
      <h1 className="text-h2 mt-2 text-ink">Edit website content</h1>
      <p className="text-body-sm mt-3 max-w-xl text-body">
        Changes here go live on the real site within a minute or so — no
        code, no deploy. Open the menu in the top right to pick a section to
        edit.
      </p>

      {!hasAdminToken() ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">
          <p className="font-semibold">Setup needed</p>
          <p className="mt-1">
            The <code className="rounded bg-red-100 px-1">SANITY_API_WRITE_TOKEN</code>{" "}
            environment variable isn&apos;t set, so this dashboard can&apos;t read or
            write content yet. Add it in your hosting provider&apos;s environment
            variables, then redeploy.
          </p>
        </div>
      ) : null}
    </div>
  )
}
