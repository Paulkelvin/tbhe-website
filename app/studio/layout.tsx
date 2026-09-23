// Sanity Studio gets its own root layout — a bare <html>/<body> with none
// of the marketing site's header, footer, or fonts, since Studio is a
// full-viewport app in its own right.
export const metadata = {
  title: "TBHE Content Studio",
  robots: { index: false, follow: false },
}

export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
