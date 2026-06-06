import { Metadata } from "next";
import { Suspense } from "react";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "注册 | Association de Beijing du Québec",
  description: "创建新账户",
};

export default function RegisterPage() {
  return (
    <div className="auth-page">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
