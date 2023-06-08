"use client";
import React from "react";
import { useSession, signIn } from "next-auth/react";

const LoginForm: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const session = useSession();

  React.useEffect(() => {
    console.log(session);
  }, [session]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);

    signIn("tawebsite", {
      redirect: false,
      username: formProps.username,
      password: formProps.password,
      callbackUrl: "/",
    });
  };

  return (
    <form onSubmit={submitHandler} className="mx-auto flex max-w-[25em] flex-col space-y-4">
      {children}
    </form>
  );
};

export default LoginForm;
