import "./globals.css";
import Navbar from "@/core/components/Navbar";
import AuthProvider from "@/core/providers/AuthProvider";

export const metadata = {
  title: "TA Registration Website | ITKMITL",
  description: "TA Registration Website for IT KMITL",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="w-full min-h-screen">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
