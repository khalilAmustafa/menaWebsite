import { ArrowRight, Check, HeartHandshake, MapPin, ShieldCheck } from 'lucide-react';
import { useSiteContext } from '../components/SiteLayout';
import { useDocumentTitle } from '../lib/useDocumentTitle';

interface DonorTier {
  amount: string;
  title: { en: string; ar: string };
  rewards: { en: string; ar: string }[];
}

const DONOR_TIERS: DonorTier[] = [
  {
    amount: '$25',
    title: { en: 'Friend of MENA', ar: 'صديق مِنا' },
    rewards: [
      { en: 'A thank-you email from the team', ar: 'رسالة شكر من الفريق' },
      { en: 'Your name on MENA’s website', ar: 'إدراج اسمك على موقع مِنا' },
    ],
  },
  {
    amount: '$50',
    title: { en: 'Mission Supporter', ar: 'داعم البعثة' },
    rewards: [
      { en: 'A digital mission certificate', ar: 'شهادة رقمية للبعثة' },
      { en: 'Your name on MENA’s website', ar: 'إدراج اسمك على موقع مِنا' },
    ],
  },
  {
    amount: '$75',
    title: { en: 'Habitat Supporter', ar: 'داعم الموئل' },
    rewards: [
      { en: 'Your name displayed inside the habitat during the mission', ar: 'عرض اسمك داخل الموئل أثناء البعثة' },
      { en: 'A supporter patch inspired by the MENA spacesuit', ar: 'شارة داعم مستوحاة من بدلة مِنا الفضائية' },
      { en: 'Your name on MENA’s website', ar: 'إدراج اسمك على موقع مِنا' },
    ],
  },
  {
    amount: '$100',
    title: { en: 'Analog Explorer', ar: 'مستكشف المحاكاة' },
    rewards: [
      { en: 'A physical postcard from Wadi Rum signed by the analog astronauts', ar: 'بطاقة بريدية من وادي رم موقّعة من رواد المحاكاة' },
      { en: 'A supporter patch inspired by the MENA spacesuit', ar: 'شارة داعم مستوحاة من بدلة مِنا الفضائية' },
      { en: 'Your name on the website and inside the habitat', ar: 'إدراج اسمك على الموقع وداخل الموئل' },
    ],
  },
  {
    amount: '$250',
    title: { en: 'Crew Ally', ar: 'حليف الطاقم' },
    rewards: [
      { en: 'An official mission T-shirt', ar: 'قميص رسمي للبعثة' },
      { en: 'A supporter patch inspired by the MENA spacesuit', ar: 'شارة داعم مستوحاة من بدلة مِنا الفضائية' },
      { en: 'Your name on the website and inside the habitat', ar: 'إدراج اسمك على الموقع وداخل الموئل' },
    ],
  },
  {
    amount: '$500',
    title: { en: 'Mission VIP', ar: 'ضيف البعثة المميّز' },
    rewards: [
      { en: 'A VIP online invitation with Mission Control on the mission’s final day', ar: 'دعوة رقمية مميّزة مع مركز التحكم في اليوم الأخير من البعثة' },
      { en: 'An official mission T-shirt and supporter patch', ar: 'قميص رسمي للبعثة وشارة داعم' },
      { en: 'Your name on the website and inside the habitat', ar: 'إدراج اسمك على الموقع وداخل الموئل' },
    ],
  },
  {
    amount: '$1,000+',
    title: { en: 'Flight Crew Partner', ar: 'شريك طاقم الرحلة' },
    rewards: [
      { en: 'An authentic flight suit', ar: 'بدلة طيران أصلية' },
      { en: 'A VIP online invitation with Mission Control on the mission’s final day', ar: 'دعوة رقمية مميّزة مع مركز التحكم في اليوم الأخير من البعثة' },
      { en: 'An official T-shirt, supporter patch, and pins', ar: 'قميص رسمي وشارة داعم ودبابيس' },
      { en: 'Major-supporter recognition on the website and inside the habitat', ar: 'تكريمك كداعم رئيسي على الموقع وداخل الموئل' },
    ],
  },
];

export default function DonatePage() {
  const { isArabic } = useSiteContext();
  useDocumentTitle(
    isArabic ? 'ادعم مِنا | بعثة محاكاة المريخ' : 'Support MENA | Mars Analog Mission',
    isArabic
      ? 'ساهم في دعم بعثات المحاكاة والتدريب العملي وفرص العلوم والتكنولوجيا والهندسة والرياضيات للشباب.'
      : 'Support MENA’s analog missions, practical training, and hands-on STEM opportunities for young people.',
  );

  return (
    <>
      <section className="donate-hero relative overflow-hidden border-b border-[var(--page-border)] pt-28 sm:pt-32">
        <div className="site-container grid min-h-[72svh] items-stretch lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative z-10 flex flex-col justify-center py-14 pe-0 lg:pe-12">
            <span className="section-index">{isArabic ? 'بعثة MENA-00-WR · وادي رم' : 'MENA-00-WR · Wadi Rum mission'}</span>
            <h1 className="donate-hero__title mt-6 max-w-[10ch] font-display font-semibold uppercase tracking-[-0.035em] text-[var(--page-ink)]">
              {isArabic ? 'ابنِ معنا طريقاً إلى النجوم' : 'Build the path to the stars'}
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-[var(--page-muted)] sm:text-lg">
              {isArabic
                ? 'بدأ فريقنا من الصفر ليبني في وادي رم تجارب لمحاكاة المريخ ومختبرات علمية وتدريباً عملياً يفتح المجال أمام الجيل القادم من المبتكرين.'
                : 'Starting from zero, our team is building Mars simulations, science labs, and practical training in Wadi Rum—creating room for the region’s next generation of innovators.'}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#donor-levels" className="mission-button">
                {isArabic ? 'استكشف مستويات الدعم' : 'Explore support levels'}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </a>
              <span className="inline-flex items-center gap-2 text-xs text-[var(--page-subtle)]">
                <MapPin className="h-4 w-4 text-brand-teal" aria-hidden="true" />
                {isArabic ? 'وادي رم، الأردن' : 'Wadi Rum, Jordan'}
              </span>
            </div>
          </div>

          <div className="donate-hero__photo relative min-h-[46svh] overflow-hidden sm:min-h-[56svh] lg:min-h-full">
            <img
              src="images/events/analog-mission-2025/analog-eva-flag.jpg"
              alt={isArabic ? 'رائد محاكاة فضائية يحمل العلم الأردني في وادي رم' : 'Analog astronaut with the Jordanian flag in Wadi Rum'}
              width="1080"
              height="1350"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white sm:p-9">
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.15em] text-brand-teal">{isArabic ? 'المهمة' : 'The mission'}</p>
              <p className="mt-2 max-w-md text-sm leading-7 text-neutral-200">
                {isArabic
                  ? 'كل مساهمة تقرّب بعثات المحاكاة والتعلّم العملي من واقع يمكن للشباب المشاركة فيه.'
                  : 'Every contribution moves analog exploration and practical learning closer to the young people ready to take part.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="donor-levels" className="section-block">
        <div className="site-container grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(290px,0.42fr)] lg:gap-14">
          <div>
            <div className="max-w-3xl">
              <span className="section-index">{isArabic ? 'مستويات الدعم' : 'Donor rewards'}</span>
              <h2 className="section-title mt-5">{isArabic ? 'اختر موقعك في سجل البعثة' : 'Choose your place in the mission log'}</h2>
              <p className="section-copy mt-6">
                {isArabic
                  ? 'تبدأ مستويات الدعم من 25 دولاراً، ولكل مستوى طريقة ملموسة نشكرك بها ونوثّق مساهمتك.'
                  : 'Support begins at $25. Each level offers a tangible way for the team to thank you and record your contribution.'}
              </p>
            </div>

            <ol className="donation-manifest mt-10">
              {DONOR_TIERS.map((tier, index) => (
                <li key={tier.amount} className="donation-tier">
                  <div className="donation-tier__amount" dir="ltr">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{tier.amount}</strong>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[var(--page-ink)] sm:text-3xl">
                      {isArabic ? tier.title.ar : tier.title.en}
                    </h3>
                    <ul className="mt-4 grid gap-2 text-sm leading-6 text-[var(--page-muted)] sm:grid-cols-2">
                      {tier.rewards.map((reward) => (
                        <li key={reward.en} className="flex items-start gap-2.5">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
                          <span>{isArabic ? reward.ar : reward.en}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="donation-checkout lg:sticky lg:top-28">
            <HeartHandshake className="h-9 w-9 text-brand-teal" aria-hidden="true" />
            <p className="mt-7 font-mono text-[0.64rem] uppercase tracking-[0.15em] text-brand-teal">{isArabic ? 'تبرّع الآن' : 'Donate now'}</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-none text-white">
              {isArabic ? 'حوّل الدعم إلى عمل' : 'Turn support into action'}
            </h2>
            <p className="mt-5 text-sm leading-7 text-neutral-300">
              {isArabic
                ? 'سينقلك الزر إلى PayPal، حيث يمكنك اختيار المبلغ وإتمام التبرع عبر PayPal أو بطاقة خصم أو ائتمان.'
                : 'The button opens PayPal, where you can choose an amount and complete the donation with PayPal or a debit or credit card.'}
            </p>

            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" className="mt-7">
              <input type="hidden" name="business" value="contact@menaorg.com" />
              <input type="hidden" name="cmd" value="_donations" />
              <input type="hidden" name="item_name" value="menaorg.com" />
              <input type="hidden" name="item_number" value="" />
              <input type="hidden" name="amount" value="0.00" />
              <input type="hidden" name="shipping" value="0.00" />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="rm" value="0" />
              <input type="hidden" name="return" value="https://menaorg.com/donate" />
              <input type="hidden" name="cancel_return" value="https://menaorg.com/donate" />
              <input type="hidden" name="cbt" value="Return to menaorg.com" />
              <button type="submit" className="mission-button w-full">
                {isArabic ? 'تبرّع بأمان عبر PayPal' : 'Donate securely with PayPal'}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </button>
            </form>

            <div className="mt-5 flex items-start gap-3 border-t border-white/10 pt-5 text-xs leading-6 text-neutral-400">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
              <p>
                {isArabic
                  ? 'يتم الدفع على PayPal. لا يرى موقع مِنا أرقام بطاقتك ولا يخزّنها.'
                  : 'Payment is completed on PayPal. MENA’s website never sees or stores your card number.'}
              </p>
            </div>

            <blockquote className="mt-8 border-s border-brand-teal ps-4 text-sm italic leading-7 text-neutral-300">
              {isArabic
                ? 'نحن لا ننتظر الفرصة؛ نحن نبنيها في الصحراء، في أوطاننا، ومن أجل أهلنا.'
                : 'We are not waiting for opportunity. We are building it—in the desert, in our homelands, and for our people.'}
              <footer className="mt-3 font-mono text-[0.62rem] not-italic uppercase tracking-[0.14em] text-brand-teal">MENA Team</footer>
            </blockquote>
          </aside>
        </div>
      </section>
    </>
  );
}
