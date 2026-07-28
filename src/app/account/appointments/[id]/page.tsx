import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getAppointment } from "@/lib/db";
import { canModify, formatDate, formatSlot, isPast } from "@/lib/booking";
import { AppointmentForm } from "@/components/account/appointment-form";
import { CancelForm } from "@/components/account/cancel-form";
import { updateAppointmentAction } from "@/app/account/actions";

export const metadata: Metadata = { title: "Change appointment" };

export default async function AppointmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login");

  const { id } = await params;
  const appt = getAppointment(id);
  if (!appt || appt.user_id !== user.id) notFound();

  const editable =
    appt.status === "booked" &&
    !isPast(appt.date, appt.time_slot) &&
    canModify(appt.date, appt.time_slot);

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
        {editable ? "Change appointment" : "Appointment"}
      </h1>
      <p className="mt-2 text-sm text-muted">
        {appt.type} · {formatDate(appt.date)} · {formatSlot(appt.time_slot)}
      </p>

      {editable ? (
        <>
          <div className="mt-8 rounded-3xl border border-line bg-surface p-8 shadow-sm">
            <AppointmentForm
              action={updateAppointmentAction}
              submitLabel="Save changes"
              id={appt.id}
              defaults={{ type: appt.type, date: appt.date, slot: appt.time_slot }}
            />
          </div>
          <div className="mt-6 rounded-2xl border border-line bg-surface-2 p-6">
            <p className="text-sm font-medium text-foreground">Cancel this appointment</p>
            <p className="mt-1 mb-4 text-sm text-muted">
              Cancellations are allowed up to 24 hours before the appointment.
            </p>
            <CancelForm id={appt.id} />
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-line bg-surface-2 p-6 text-sm text-muted">
          {appt.status === "cancelled"
            ? "This appointment has been cancelled."
            : isPast(appt.date, appt.time_slot)
              ? "This appointment has passed."
              : "This appointment is less than 24 hours away and can no longer be changed online. Please call the clinic on +91 98103 09132."}
        </div>
      )}
    </div>
  );
}
