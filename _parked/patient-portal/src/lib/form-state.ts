export type ActionState = {
  error?: string;
  notice?: string;
  /** Dev-only: password-reset link surfaced because email isn't wired yet. */
  resetUrl?: string;
  /** OTP flow: true once a code has been requested (advances the UI). */
  sent?: boolean;
  /** OTP flow: the identifier the code was sent to (carried between steps). */
  identifier?: string;
  /** Dev-only: the OTP code, surfaced because email/SMS isn't wired yet. */
  devCode?: string;
};

export const emptyState: ActionState = {};
