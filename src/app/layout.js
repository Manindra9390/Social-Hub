import "./globals.css";

export const metadata = {
  title: "NexusTrade Admin - Command Center",
  description: "NexusTrade admin dashboard"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-[var(--text)] font-sans">
        {children}
      </body>
    </html>
  );
}
