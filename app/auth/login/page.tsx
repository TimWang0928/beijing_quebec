import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "登录 | Association de Beijing du Québec",
  description: "登录您的账户",
};

export default function LoginPage() {
  return (
    <div className="auth-page">
      <LoginForm />
    </div>
  );
}
