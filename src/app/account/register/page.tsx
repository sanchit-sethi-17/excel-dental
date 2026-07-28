import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/account/auth-layout";
import { RegisterForm } from "@/components/account/auth-forms";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Create an account" };

export default async function RegisterPage() {
  if (await getCurrentUser()) redirect("/account");

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register to book appointments and manage them online."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/account/login" className="font-medium text-accent hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
}
