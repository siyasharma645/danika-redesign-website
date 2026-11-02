'use client';

import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Loader2, Phone } from 'lucide-react';
import { REQUIRED, validateLead, type LeadErrors, type LeadInput, type LeadType } from '@/lib/validation';
import { SITE, orig } from '@/data/site';
import { cn } from '@/lib/utils';
import { buttonClasses } from '@/components/ui/Button';

type Status = 'idle' | 'submitting' | 'success' | 'not_configured' | 'error';

const field =
  'mt-1.5 block w-full rounded-field border bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft/60 transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100';

const SUBMIT_LABEL: Record<LeadType, string> = {
  help: 'Get Help Now', quote: 'Request a Quote', schedule: 'Schedule Service', callback: 'Request a Call', message: 'Send Message',
};
const MESSAGE_LABEL: Record<LeadType, string> = {
  help: 'How can we help?', quote: 'How can we help?', schedule: 'Anything we should know? (optional)',
  callback: 'What is it about? (optional)', message: 'Your message',
};

function Field({ id, label, required = true, error, children }: { id: string; label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required && <><span className="text-brand-700" aria-hidden> *</span><span className="sr-only">(required)</span></>}
      </label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}

/** One form for every kind of request. `type` decides which fields are required and what the button says. */
export function QuoteForm({ type = 'quote' }: { type?: LeadType }) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const need = REQUIRED[type];
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? '');
    const values: LeadInput = {
      firstName: get('firstName'), lastName: get('lastName'), phone: get('phone'), email: get('email'), message: get('message'),
      type, preferredDate: get('preferredDate'), preferredWindow: get('preferredWindow'),
    };

    const found = validateLead(values, type);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof LeadInput)[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website: get('website') }),
      });
      if (res.ok) { setStatus('success'); formRef.current?.reset(); return; }
      if (res.status === 503) { setStatus('not_configured'); return; }
      if (res.status === 422) {
        const data = await res.json().catch(() => null);
        setErrors(data?.errors ?? {});
        setStatus('idle');
        return;
      }
      setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-card bg-green-50 p-6 text-green-900">
        <CheckCircle2 className="h-8 w-8 text-green-600" aria-hidden />
        <h3 className="mt-3 text-xl font-bold !text-green-900">Thanks, we&rsquo;ve got your request.</h3>
        <p className="mt-2 text-[0.95rem]">Someone from our Everett office will reach out shortly. For anything urgent, call <a className="font-bold underline" href={SITE.phoneHref}>{SITE.phone}</a>, we answer 24/7.</p>
      </div>
    );
  }

  const invalid = (k: keyof LeadInput) => (errors[k] ? true : undefined);
  const border = (k: keyof LeadInput) => (errors[k] ? 'border-red-500' : 'border-line');
  const desc = (k: keyof LeadInput) => (errors[k] ? `${id(k)}-error` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={id('note')} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={id('firstName')} label="First name" error={errors.firstName}>
          <input id={id('firstName')} name="firstName" autoComplete="given-name" aria-invalid={invalid('firstName')} aria-describedby={desc('firstName')} className={cn(field, border('firstName'))} />
        </Field>
        <Field id={id('lastName')} label="Last name" required={need.lastName} error={errors.lastName}>
          <input id={id('lastName')} name="lastName" autoComplete="family-name" aria-invalid={invalid('lastName')} aria-describedby={desc('lastName')} className={cn(field, border('lastName'))} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={id('phone')} label="Phone" error={errors.phone}>
          <input id={id('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(425) 555-0123" aria-invalid={invalid('phone')} aria-describedby={desc('phone')} className={cn(field, border('phone'))} />
        </Field>
        <Field id={id('email')} label="Email" required={need.email} error={errors.email}>
          <input id={id('email')} name="email" type="email" autoComplete="email" aria-invalid={invalid('email')} aria-describedby={desc('email')} className={cn(field, border('email'))} />
        </Field>
      </div>

      {type === 'schedule' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={id('preferredDate')} className="text-sm font-semibold text-ink">Preferred date <span className="font-normal text-ink-soft">(optional)</span></label>
            <input id={id('preferredDate')} name="preferredDate" type="date" className={cn(field, 'border-line')} />
          </div>
          <div>
            <label htmlFor={id('preferredWindow')} className="text-sm font-semibold text-ink">Best time <span className="font-normal text-ink-soft">(optional)</span></label>
            <select id={id('preferredWindow')} name="preferredWindow" defaultValue="" className={cn(field, 'border-line')}>
              <option value="">Any time</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
        </div>
      )}

      <Field id={id('message')} label={MESSAGE_LABEL[type]} required={need.message} error={errors.message}>
        <textarea id={id('message')} name="message" rows={type === 'callback' ? 3 : 4} aria-invalid={invalid('message')} aria-describedby={desc('message')} className={cn(field, border('message'), 'resize-y')} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <p id={id('note')} className="text-xs leading-relaxed text-ink-soft">
        Once you submit our form, we may reach out to you via phone, email, or text to communicate service details, which you can opt out of at any time.
        This form consent is not a condition of purchase. Message/data rates apply.{' '}
        <a className="font-semibold underline" href={orig('/terms-conditions/')}>Terms and Conditions</a> | <a className="font-semibold underline" href={orig('/privacy-policy/')}>Privacy Policy</a>.
      </p>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={buttonClasses('brand', 'lg', 'w-full disabled:cursor-wait disabled:opacity-70')}
      >
        {status === 'submitting' ? <><Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Sending…</> : SUBMIT_LABEL[type]}
      </button>

      <div aria-live="polite">
        {status === 'not_configured' && (
          <div role="alert" className="flex gap-3 rounded-field border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
            <p>
              <strong>Online requests aren&rsquo;t connected yet on this site.</strong> Nothing was sent. Please call{' '}
              <a href={SITE.phoneHref} className="inline-flex items-center gap-1 font-bold underline"><Phone className="h-4 w-4" aria-hidden />{SITE.phone}</a>.
            </p>
          </div>
        )}
        {status === 'error' && (
          <div role="alert" className="flex gap-3 rounded-field border border-red-300 bg-red-50 p-4 text-sm text-red-900">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden />
            <p>Something went wrong and your request may not have been sent. Please try again, or call <a href={SITE.phoneHref} className="font-bold underline">{SITE.phone}</a>.</p>
          </div>
        )}
      </div>
    </form>
  );
}
