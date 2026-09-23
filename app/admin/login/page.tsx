import { login } from "@/app/admin/actions"

export const dynamic = "force-dynamic"

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>
}) {
  const params = await searchParams
  const hasError = params.error === "1"

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-hairline bg-canvas p-8 shadow-[0_20px_45px_-24px_rgba(37,24,39,0.25)]">
        <p className="eyebrow text-primary">TBHE Admin</p>
        <h1 className="text-h3 mt-2 text-ink">Sign in</h1>
        <form action={login} className="mt-6 flex flex-col gap-4">
          <input type="hidden" name="from" value={params.from ?? "/admin"} />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-semibold text-body-strong">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="rounded-lg border border-hairline-strong bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-primary"
            />
          </div>
          {hasError ? (
            <p className="text-sm font-medium text-red-600">Incorrect password. Try again.</p>
          ) : null}
          <button
            type="submit"
            className="mt-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
