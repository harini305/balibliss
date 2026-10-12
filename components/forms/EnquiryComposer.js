'use client';

import { useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { TextField, TextArea, SelectField, RadioGroup, Checkbox } from '@/components/ui/Field';
import styles from './EnquiryComposer.module.css';

/**
 * Frontend-only enquiry form. It validates in the browser, then hands a prefilled
 * message to WhatsApp or the visitor's email app. Nothing is sent by this site,
 * so it never shows a fake "sent" state.
 *
 * whatsappNumber / email: destinations. When either is missing the composer runs in
 * preview mode (shows the composed message only) — used until Phase 0 Q2 is answered.
 */
export default function EnquiryComposer({ whatsappNumber, email, topics, idPrefix = 'enq' }) {
  const [channel, setChannel] = useState('WhatsApp');
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const summaryRef = useRef(null);
  const formRef = useRef(null);

  const id = (k) => `${idPrefix}-${k}`;
  const destination = channel === 'WhatsApp' ? whatsappNumber : email;

  function validate(data) {
    const e = {};
    if (!data.name.trim()) e.name = 'Enter your name.';
    if (!data.contact.trim()) e.contact = 'Enter an email address or WhatsApp number so we can reply.';
    else if (!/@/.test(data.contact) && !/^[+\d][\d\s-]{6,}$/.test(data.contact.trim()))
      e.contact = 'Enter a valid email address or a phone number with country code, e.g. +44 7700 900123.';
    if (!data.message.trim()) e.message = 'Tell us a little about what you are looking for.';
    if (!data.terms) e.terms = 'Please confirm you have read the Terms & Conditions.';
    return e;
  }

  function onSubmit(event) {
    event.preventDefault();
    if (busy) return; // duplicate-open guard
    const f = new FormData(event.currentTarget);
    const data = {
      name: String(f.get(id('name')) ?? ''),
      contact: String(f.get(id('contact')) ?? ''),
      topic: String(f.get(id('topic')) ?? ''),
      dates: String(f.get(id('dates')) ?? ''),
      message: String(f.get(id('message')) ?? ''),
      terms: f.get(id('terms')) === 'on',
    };
    const e = validate(data);
    setErrors(e);
    setResult(null);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const lines = [
      `Hello Bali Bliss, my name is ${data.name}.`,
      data.topic ? `I'm interested in: ${data.topic}.` : null,
      data.dates ? `Preferred dates: ${data.dates}.` : null,
      '',
      data.message,
      '',
      `You can reach me at: ${data.contact}`,
    ].filter((l) => l !== null);
    const text = lines.join('\n');

    if (!destination) {
      setResult({ mode: 'preview', text });
      return;
    }

    const url =
      channel === 'WhatsApp'
        ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
        : `mailto:${email}?subject=${encodeURIComponent(`Enquiry from ${data.name}`)}&body=${encodeURIComponent(text)}`;

    setBusy(true);
    if (channel === 'WhatsApp') window.open(url, '_blank', 'noopener');
    else window.location.href = url;
    setResult({ mode: 'opened', text });
    setTimeout(() => setBusy(false), 3000);
  }

  const errorList = Object.entries(errors);

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
      <div aria-live="polite" className={styles.live}>
        {errorList.length > 0 && (
          <div ref={summaryRef} tabIndex={-1} className={styles.summary} role="alert">
            <p className={styles.summaryTitle}>
              <Icon name="alert" size={20} />
              Please check {errorList.length === 1 ? '1 field' : `${errorList.length} fields`}
            </p>
            <ul>
              {errorList.map(([k, msg]) => (
                <li key={k}>
                  <a href={`#${id(k)}`}>{msg}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {result?.mode === 'opened' && (
          <div className={styles.ok}>
            <p className={styles.summaryTitle}>
              <Icon name="check" size={20} />
              {channel === 'WhatsApp'
                ? 'Your message is ready in WhatsApp — press send there.'
                : 'Your message is ready in your email app — press send there.'}
            </p>
            <p className={styles.small}>Nothing has been sent yet. If no window opened, copy the message below.</p>
            <pre className={styles.preview}>{result.text}</pre>
          </div>
        )}
        {result?.mode === 'preview' && (
          <div className={styles.info}>
            <p className={styles.summaryTitle}>
              <Icon name="info" size={20} />
              Preview only — this is the message that would open in {channel}.
            </p>
            <p className={styles.small}>The destination number/email is awaiting confirmation, so nothing was opened.</p>
            <pre className={styles.preview}>{result.text}</pre>
          </div>
        )}
      </div>

      <div className={styles.grid}>
        <TextField id={id('name')} label="Your name" required autoComplete="name" error={errors.name} />
        <TextField
          id={id('contact')}
          label="Email or WhatsApp number"
          required
          autoComplete="email"
          inputMode="email"
          hint="Include your country code for WhatsApp."
          error={errors.contact}
        />
        {topics && <SelectField id={id('topic')} label="What are you interested in?" options={topics} />}
        <TextField id={id('dates')} label="Preferred dates" hint="For example: 14–16 November" />
      </div>
      <TextArea id={id('message')} label="Your message" required rows={5} error={errors.message} />
      <RadioGroup
        id={id('channel')}
        label="Continue in"
        showOptional={false}
        options={['WhatsApp', 'Email']}
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
      />
      <Checkbox
        id={id('terms')}
        required
        error={errors.terms}
        label={
          <>
            I have read the <a href="/terms-conditions/">Terms &amp; Conditions</a>
          </>
        }
      />

      <div className={styles.submit}>
        <Button type="submit" variant={channel === 'WhatsApp' ? 'whatsapp' : 'primary'} icon={channel === 'Email' ? 'mail' : undefined} loading={busy} fullWidthOnMobile>
          {channel === 'WhatsApp' ? 'Continue in WhatsApp' : 'Open email'}
        </Button>
        <p className={styles.small}>This opens {channel} with your message prefilled. You send it from there.</p>
      </div>
    </form>
  );
}
