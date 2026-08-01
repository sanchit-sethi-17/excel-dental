import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/account/auth-layout";
import { LoginForm } from "@/components/account/auth-forms";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Log in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string }>;
}) {
  if (await getCurrentUser()) redirect("/account");
  const { reset } = await searchParams;

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to view and manage your appointments."
      footer={
        <>
          New patient?{" "}
          <Link href="/account/register" className="font-medium text-accent hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm justReset={reset === "1"} />
    </AuthLayout>
  );
}
