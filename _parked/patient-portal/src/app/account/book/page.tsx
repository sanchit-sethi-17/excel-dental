import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { AppointmentForm } from "@/components/account/appointment-form";
import { bookAction } from "@/app/account/actions";

export const metadata: Metadata = { title: "Book an appointment" };

export default async function BookPortalPage() {
  if (!(await getCurrentUser())) redirect("/account/login");

  return (
    <div className="mx-auto max-w-lg px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <Link
        href="/account"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to my account
      </Link>

      <h1 className="mt-6 font-display text-3xl font-medium tracking-tight text-foreground">
        Book an appointment
      </h1>
      <p className="mt-2 text-sm text-muted">
        Choose a treatment, date and time. You can change or cancel it later, up to 24 hours before.
      </p>

      <div className="mt-8 rounded-3xl border border-line bg-surface p-8 shadow-sm">
        <AppointmentForm action={bookAction} submitLabel="Book appointment" />
      </div>
    </div>
  );
}
