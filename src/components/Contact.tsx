import { useState, type FormEvent } from 'react';
import { Check, Clipboard, ExternalLink, Mail, MapPin, MessageCircle, Send } from 'lucide-react';

interface ContactProps {
  isArabic: boolean;
  /**
   * Suppresses the in-component section header. Set false by /contact, where the routed
   * page already supplies the <h1>; the mechanisms below are otherwise untouched.
   */
  showHeader?: boolean;
}

type ContactChannel = 'whatsapp' | 'email';
type CopiedValue = 'email' | 'message' | null;

const CONTACT_EMAIL = 'contact@menaorg.com';
const WHATSAPP_URL = 'https://wa.me/962790607949';
const VOLUNTEER_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe6XrNbP3hm6Q_To_Ex1ryC4Rv21AQ-PJ3Acb9sgfAuGzE0GA/viewform';

const TOPICS = [
  { value: 'programs', en: 'Programs & activities', ar: 'البرامج والأنشطة' },
  { value: 'volunteering', en: 'Volunteering', ar: 'التطوّع' },
  { value: 'research', en: 'Research collaboration', ar: 'التعاون البحثي' },
  { value: 'partnerships', en: 'Partnerships & sponsorship', ar: 'الشراكات والرعاية' },
  { value: 'missions', en: 'Analog missions', ar: 'بعثات المحاكاة' },
] as const;

export default function Contact({ isArabic, showHeader = true }: ContactProps) {
  const [channel, setChannel] = useState<ContactChannel>('whatsapp');
  const [copied, setCopied] = useState<CopiedValue>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'programs',
    message: '',
  });

  const selectedTopic = TOPICS.find((topic) => topic.value === formData.interest) ?? TOPICS[0];
  const topicLabel = isArabic ? selectedTopic.ar : selectedTopic.en;
  const subject = isArabic ? `استفسار من الموقع — ${topicLabel}` : `Website inquiry — ${topicLabel}`;
  const preparedMessage = isArabic
    ? [
        'مرحباً فريق مِنا،',
        '',
        `الاسم: ${formData.name}`,
        `البريد الإلكتروني: ${formData.email}`,
        `موضوع التواصل: ${topicLabel}`,
        '',
        formData.message,
      ].join('\n')
    : [
        'Hello MENA team,',
        '',
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Contact topic: ${topicLabel}`,
        '',
        formData.message,
      ].join('\n');
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(preparedMessage)}`;
  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(preparedMessage)}`;

  const copyText = async (value: string, kind: Exclude<CopiedValue, null>) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 2200);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = channel === 'whatsapp' ? whatsappHref : mailtoHref;
  };

  const fieldClass = 'min-h-12 w-full rounded-md border border-[var(--page-border)] bg-[var(--page-bg)] px-3.5 text-sm text-[var(--page-ink)] outline-none transition-colors placeholder:text-[var(--page-subtle)] focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20';
  const labelClass = 'mb-2 block text-xs font-bold text-[var(--page-muted)]';

  return (
    <section id="contact" className={`section-block contact-dossier${showHeader ? '' : ' contact-dossier--headless'}`}>
      <div className="site-container">
        {showHeader && (
          <div className="mission-gallery-header mb-12">
            <div>
              <span className="section-index">{isArabic ? '09 · تواصل' : '09 · Contact'}</span>
              <h2 className="section-title mt-5">{isArabic ? 'لنتحدّث' : 'Let’s talk'}</h2>
            </div>
            <p className="section-copy">
              {isArabic
                ? 'اختر الطريقة التي تناسبك. يمكنك مراسلة فريق مِنا مباشرة عبر واتساب أو البريد، أو فتح نموذج التطوّع الرسمي.'
                : 'Choose the route that fits. Message the MENA team directly on WhatsApp or by email, or open the official volunteer application.'}
            </p>
          </div>
        )}

        <div className="grid gap-8 border-t border-[var(--page-border)] pt-10 lg:grid-cols-[minmax(280px,.72fr)_minmax(0,1.28fr)] lg:gap-12">
          <aside className="space-y-3">
            <h3 className="mb-5 font-display text-2xl font-semibold text-[var(--page-ink)]">
              {isArabic ? 'قنوات التواصل الرسمية' : 'Official contact routes'}
            </h3>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="contact-route group">
              <span className="contact-route__icon"><MessageCircle aria-hidden="true" /></span>
              <span className="min-w-0 flex-1">
                <strong>{isArabic ? 'واتساب' : 'WhatsApp'}</strong>
                <small>{isArabic ? 'محادثة مباشرة مع فريق مِنا' : 'Chat directly with the MENA team'}</small>
              </span>
              <ExternalLink className="h-4 w-4 shrink-0 text-[var(--page-subtle)] transition-colors group-hover:text-brand-teal" aria-hidden="true" />
            </a>

            <div className="contact-route">
              <span className="contact-route__icon"><Mail aria-hidden="true" /></span>
              <span className="min-w-0 flex-1">
                <strong>{isArabic ? 'البريد الإلكتروني' : 'Email'}</strong>
                <a dir="ltr" href={`mailto:${CONTACT_EMAIL}`} className="block truncate text-start text-xs text-[var(--page-muted)] hover:text-brand-teal">{CONTACT_EMAIL}</a>
              </span>
              <button type="button" onClick={() => copyText(CONTACT_EMAIL, 'email')} className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-[var(--page-border)] text-[var(--page-muted)] hover:border-brand-teal hover:text-brand-teal" aria-label={isArabic ? 'نسخ البريد الإلكتروني' : 'Copy email address'}>
                {copied === 'email' ? <Check className="h-4 w-4" aria-hidden="true" /> : <Clipboard className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>

            <a href={VOLUNTEER_FORM_URL} target="_blank" rel="noopener noreferrer" className="contact-route group">
              <span className="contact-route__icon"><ExternalLink aria-hidden="true" /></span>
              <span className="min-w-0 flex-1">
                <strong>{isArabic ? 'طلب التطوّع' : 'Volunteer application'}</strong>
                <small>{isArabic ? 'افتح النموذج الرسمي في تبويب جديد' : 'Open the official form in a new tab'}</small>
              </span>
              <ExternalLink className="h-4 w-4 shrink-0 text-[var(--page-subtle)] transition-colors group-hover:text-brand-teal" aria-hidden="true" />
            </a>

            <p className="flex items-start gap-3 pt-3 text-xs leading-6 text-[var(--page-subtle)]">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
              <span>{isArabic ? 'الموقع الميداني: وادي رم، الأردن' : 'Field site: Wadi Rum, Jordan'}</span>
            </p>
          </aside>

          <div className="rounded-xl border border-[var(--page-border)] bg-[var(--page-surface)] p-5 sm:p-8">
            <div className="mb-6">
              <h3 className="font-display text-3xl font-semibold text-[var(--page-ink)]">{isArabic ? 'حضّر رسالتك' : 'Prepare your message'}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--page-muted)]">
                {isArabic ? 'سنفتح القناة التي تختارها مع رسالة جاهزة للمراجعة والإرسال.' : 'We’ll open your chosen channel with a ready-to-review message.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <fieldset>
                <legend className={labelClass}>{isArabic ? 'طريقة الإرسال' : 'Send with'}</legend>
                <div className="grid grid-cols-2 gap-2 rounded-md bg-[var(--page-bg)] p-1.5">
                  {(['whatsapp', 'email'] as ContactChannel[]).map((option) => (
                    <button key={option} type="button" aria-pressed={channel === option} onClick={() => setChannel(option)} className={`min-h-11 rounded px-3 text-xs font-bold transition-colors ${channel === option ? 'bg-brand-teal text-[#21150f]' : 'text-[var(--page-muted)] hover:text-[var(--page-ink)]'}`}>
                      {option === 'whatsapp' ? (isArabic ? 'واتساب' : 'WhatsApp') : (isArabic ? 'البريد الإلكتروني' : 'Email')}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <label>
                  <span className={labelClass}>{isArabic ? 'الاسم أو اسم المؤسسة' : 'Name or organization'}</span>
                  <input required name="name" type="text" autoComplete="name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className={fieldClass} />
                </label>
                <label>
                  <span className={labelClass}>{isArabic ? 'بريدك الإلكتروني' : 'Your email'}</span>
                  <input required name="email" type="email" autoComplete="email" spellCheck={false} dir="ltr" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className={`${fieldClass} text-start`} />
                </label>
              </div>

              <label>
                <span className={labelClass}>{isArabic ? 'موضوع التواصل' : 'Contact topic'}</span>
                <select name="interest" value={formData.interest} onChange={(event) => setFormData({ ...formData, interest: event.target.value })} className={fieldClass}>
                  {TOPICS.map((topic) => <option key={topic.value} value={topic.value}>{isArabic ? topic.ar : topic.en}</option>)}
                </select>
              </label>

              <label>
                <span className={labelClass}>{isArabic ? 'رسالتك' : 'Your message'}</span>
                <textarea required name="message" rows={4} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className={`${fieldClass} resize-y py-3`} />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" className="mission-button sm:min-w-48">
                  {channel === 'whatsapp' ? <MessageCircle className="h-4 w-4" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                  {channel === 'whatsapp'
                    ? (isArabic ? 'افتح واتساب' : 'Open WhatsApp')
                    : (isArabic ? 'افتح البريد' : 'Open email')}
                </button>
                <button type="button" onClick={() => copyText(preparedMessage, 'message')} className="mission-button-secondary">
                  {copied === 'message' ? <Check className="h-4 w-4" aria-hidden="true" /> : <Clipboard className="h-4 w-4" aria-hidden="true" />}
                  {copied === 'message' ? (isArabic ? 'تم النسخ' : 'Copied') : (isArabic ? 'انسخ الرسالة' : 'Copy message')}
                </button>
              </div>
              <p role="status" aria-live="polite" className="min-h-5 text-xs text-[var(--page-subtle)]">
                {copied === 'email' && (isArabic ? 'تم نسخ البريد الإلكتروني.' : 'Email address copied.')}
                {copied === 'message' && (isArabic ? 'تم نسخ الرسالة؛ يمكنك لصقها في أي تطبيق.' : 'Message copied; paste it into any app.')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
