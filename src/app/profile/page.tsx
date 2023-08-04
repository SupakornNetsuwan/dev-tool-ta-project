import React from "react";
import PageWrapper from "@/core/components/PageWrapper";
import Form from "./components/Form";
// React hook form
import ProfileFormProvider from "./providers/ProfileFormProvider";
import checkAuth from "@/core/func/checkAuth";

export const metadata = {
  title: "จัดการบัญชีผู้ใช้",
};

const page = async () => {
  const { session } = await checkAuth(["ADMIN", "PROFESSOR", "STUDENT", "SUPERADMIN"]);

  return (
    <PageWrapper>
      <ProfileFormProvider session={session!}>
        <Form />
      </ProfileFormProvider>
    </PageWrapper>
  );
};

export default page;
