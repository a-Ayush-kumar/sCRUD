
import "./globals.css";

export const metadata = {
  title: "sCRUD - Simple CRUD App",
  description: "CRUD Assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}