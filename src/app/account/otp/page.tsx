import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/account/auth-layout";
import { OtpLogin } from "@/components/account/otp-login";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Log in with a code" };

export default async function OtpPage() {
  if (await getCurrentUser()) redirect("/account");

  return (
    <AuthLayout
      title="Log in with a code"
      subtitle="We'll send a one-time code to your email or mobile — no password needed."
      footer={
        <>
          Prefer a password?{" "}
          <Link href="/account/login" className="font-medium text-accent hover:underline">
            Log in with password
          </Link>
        </>
      }
    >
      <OtpLogin />
    </AuthLayout>
  );
}
