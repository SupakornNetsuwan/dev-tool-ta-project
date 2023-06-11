import "./globals.css";
import Navbar from "@/core/components/Navbar";
import AuthProvider from "@/core/providers/AuthProvider";

export const metadata = {
  title: "ระบบรับสมัครผู้ช่วยสอน | ITKMITL",
  description: "ระบบรับสมัครผู้ช่วยสอนสำหรับคณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="min-h-screen w-full">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
