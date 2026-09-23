import "@/app/(site)/globals.css"

export const metadata = {
  title: "TBHE Admin",
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-canvas-soft font-sans text-ink antialiased">{children}</body>
    </html>
  )
}
