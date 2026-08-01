import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarPlus, Clock, LogOut } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { listAppointmentsForUser } from "@/lib/db";
import { canModify, formatDate, formatSlot, isPast } from "@/lib/booking";
import { Alert } from "@/components/account/form-ui";
import { logoutAction } from "@/app/account/actions";

export const metadata: Metadata = { title: "My appointments" };

const notices: Record<string, string> = {
  booked: "Your appointment has been booked.",
  updated: "Your appointment has been updated.",
  cancelled: "Your appointment has been cancelled.",
};

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ booked?: string; updated?: string; cancelled?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login");

  const sp = await searchParams;
  const noticeKey = Object.keys(notices).find((k) => sp[k as keyof typeof sp] === "1");

  const all = listAppointmentsForUser(user.id);
  const upcoming = all.filter(
    (a) => a.status === "booked" && !isPast(a.date, a.time_slot)
  );
  const history = all
    .filter((a) => a.status === "cancelled" || isPast(a.date, a.time_slot))
    .reverse();

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            My account
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Hello, {user.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {user.email ?? user.phone}
          </p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </form>
      </div>

      {noticeKey && (
        <div className="mt-6">
          <Alert kind="notice">{notices[noticeKey]}</Alert>
        </div>
      )}

      {/* Book CTA */}
      <Link
        href="/account/book"
        className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-brand p-6 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-deep"
      >
        <div>
          <p className="font-display text-lg font-medium">Book a new appointment</p>
          <p className="mt-0.5 text-sm text-orange-100/90">Pick a treatment, date and time.</p>
        </div>
        <CalendarPlus className="h-6 w-6 shrink-0" />
      </Link>

      {/* Upcoming */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-medium text-foreground">Upcoming appointments</h2>
        {upcoming.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-line-strong bg-surface-2 px-6 py-8 text-center text-sm text-muted">
            You have no upcoming appointments.
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {upcoming.map((a) => {
              const editable = canModify(a.date, a.time_slot);
              return (
                <li
                  key={a.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 shadow-sm"
                >
                  <div>
                    <p className="font-medium text-foreground">{a.type}</p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                      <Clock className="h-4 w-4 text-accent" />
                      {formatDate(a.date)} · {formatSlot(a.time_slot)}
                    </p>
                  </div>
                  {editable ? (
                    <Link
                      href={`/account/appointments/${a.id}`}
                      className="rounded-full border border-line-strong bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
                    >
                      Change or cancel
                    </Link>
                  ) : (
                    <span className="rounded-full bg-surface-2 px-4 py-2 text-xs font-medium text-subtle">
                      Locked — within 24h, please call the clinic
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* History */}
      {history.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-medium text-foreground">Past &amp; cancelled</h2>
          <ul className="mt-4 space-y-3">
            {history.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface-2 px-5 py-4 text-sm"
              >
                <div>
                  <span className="font-medium text-foreground">{a.type}</span>
                  <span className="text-muted"> · {formatDate(a.date)} · {formatSlot(a.time_slot)}</span>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    a.status === "cancelled"
                      ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                      : "bg-surface text-subtle"
                  }`}
                >
                  {a.status === "cancelled" ? "Cancelled" : "Completed"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
