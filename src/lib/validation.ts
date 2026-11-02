/** Which kind of request a visitor is making. `help` is the header "Get Help Now" popup. */
export type LeadType = 'help' | 'quote' | 'schedule' | 'callback' | 'message';
export const LEAD_TYPES: readonly LeadType[] = ['help', 'quote', 'schedule', 'callback', 'message'];

export type LeadInput = {
  firstName: string; lastName: string; phone: string; email: string; message: string;
  type?: LeadType; preferredDate?: string; preferredWindow?: string;
};
export type LeadErrors = Partial<Record<keyof LeadInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Fields that must be filled in, per request type. First name and phone are always required. */
export const REQUIRED: Record<LeadType, { lastName: boolean; email: boolean; message: boolean }> = {
  help: { lastName: true, email: true, message: true },
  quote: { lastName: true, email: true, message: true },
  message: { lastName: true, email: true, message: true },
  schedule: { lastName: true, email: true, message: false },
  callback: { lastName: false, email: false, message: false },
};

/** Shared by the client form and the API route so both enforce identical rules. */
export function validateLead(v: LeadInput, type: LeadType = 'quote'): LeadErrors {
  const need = REQUIRED[type];
  const e: LeadErrors = {};
  if (!v.firstName.trim()) e.firstName = 'Please enter your first name.';
  if (need.lastName && !v.lastName.trim()) e.lastName = 'Please enter your last name.';
  const digits = v.phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 11) e.phone = 'Enter a valid 10-digit phone number.';
  if ((need.email || v.email.trim()) && !EMAIL.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (need.message && v.message.trim().length < 5) e.message = 'Tell us briefly how we can help.';
  if (v.message.length > 2000) e.message = 'Please keep your message under 2,000 characters.';
  return e;
}
