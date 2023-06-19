import dynamic from "next/dynamic";
import "./globals.css";
const Navbar = dynamic(() => import("@/core/components/Navbar"), {
  loading: () => <div className="h-22 m-4 w-full animate-pulse bg-gradient-metal"></div>,
});
// Providers manager
import Providers from "@/core/providers/Providers";
// Providers for client-side
import AuthProvider from "@/core/providers/AuthProvider";
import CustomToastContextProvider from "@/core/components/CustomToast/provider/CustomToastContextProvider";
import LoadingScreenContextProvider from "@/core/components/LoadingScreen/provider/LoadingScreenContextProvider";
import ClientLocalizationProvider from "@/core/providers/ClientLocalizationProvider";
import ClientQueryClientProvider from "@/core/providers/ClientQueryClientProvider";
export const metadata = {
  title: "ระบบรับสมัครผู้ช่วยสอน | ITKMITL",
  description: "ระบบรับสมัครผู้ช่วยสอนสำหรับคณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  console.log(process.env.SOME_FLAG || "ไม่สามารถโหลด SOME_FLAG environment variable ได้");
  return (
    <html lang="en">
      <body className="min-h-screen w-full">
        <Providers
          providers={[
            <AuthProvider key="auth-provider" />,
            <CustomToastContextProvider key="customtoast-provider" />,
            <LoadingScreenContextProvider key="loadingscreen-provider" />,
            <ClientLocalizationProvider key="localization-provider" />,
            <ClientQueryClientProvider key="queryclient-provider" />,
          ]}
        >
          <Navbar />
          <div className="pt-8">{children}</div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
