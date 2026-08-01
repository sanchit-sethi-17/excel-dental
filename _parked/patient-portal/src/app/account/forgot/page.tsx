import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/account/auth-layout";
import { ForgotForm } from "@/components/account/auth-forms";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPage() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter the email or mobile number on your account and we'll send a reset link."
      footer={
        <Link href="/account/login" className="font-medium text-accent hover:underline">
          Back to log in
        </Link>
      }
    >
      <ForgotForm />
    </AuthLayout>
  );
}
