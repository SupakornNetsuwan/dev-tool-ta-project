import dynamic from "next/dynamic";
import "./globals.css";
const Navbar = dynamic(() => import("@/core/components/Navbar"));
// Providers manager
import Providers from "@/core/providers/Providers";
// Providers for client-side
import AuthProvider from "@/core/providers/AuthProvider";
import CustomToastContextProvider from "@/core/components/CustomToast/provider/CustomToastContextProvider";
import LoadingScreenContextProvider from "@/core/components/LoadingScreen/provider/LoadingScreenContextProvider";

export const metadata = {
  title: "ระบบรับสมัครผู้ช่วยสอน | ITKMITL",
  description: "ระบบรับสมัครผู้ช่วยสอนสำหรับคณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="min-h-screen w-full">
        <Providers providers={[<AuthProvider />, <CustomToastContextProvider />, <LoadingScreenContextProvider />]}>
          <Navbar />
          <div className="pt-8">{children}</div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
