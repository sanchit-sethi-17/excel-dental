import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/account/auth-layout";
import { ResetForm } from "@/components/account/auth-forms";

export const metadata: Metadata = { title: "Set a new password" };

export default async function ResetPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <AuthLayout
        title="Invalid reset link"
        subtitle="This link is missing or incomplete. Please request a new one."
        footer={
          <Link href="/account/forgot" className="font-medium text-accent hover:underline">
            Request a new link
          </Link>
        }
      >
        <div />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Set a new password" subtitle="Choose a new password for your account.">
      <ResetForm token={token} />
    </AuthLayout>
  );
}
