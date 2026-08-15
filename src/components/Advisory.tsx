interface AdvisoryProps {
  isArabic: boolean;
}

/**
 * Scientific Advisory Board section.
 *
 * De-mock pass: the previous advisor cards contained unverified/fabricated names,
 * organizations, biographies, and stock (Unsplash) portraits, so they were removed.
 * The section is kept structurally present (its #advisors anchor is referenced by the
 * Header and Footer) but shows only a restrained heading and an honest placeholder
 * message until confirmed advisor data is supplied. No names/photos are invented.
 */
export default function Advisory({ isArabic }: AdvisoryProps) {
  return (
    <section id="advisors" className="relative bg-transparent py-12 sm:py-16">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-red/[0.03] blur-3xl pointer-events-none" />

      <div className="w-[90%] mx-auto relative z-10">
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-mono text-xs text-brand-red font-bold tracking-widest uppercase block mb-3">
            {isArabic ? 'العقل الأكاديمي والتحالفات الاستراتيجية' : 'GLOBAL EXPERT SYNDICATE'}
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight uppercase">
            {isArabic ? (
              <>
                مجلس المستشارين <span className="text-brand-teal italic font-black">العالمي للأبحاث</span>
              </>
            ) : (
              <>
                Scientific <span className="text-brand-teal font-black">Advisory Board</span>
              </>
            )}
          </h2>
          <div className="h-0.5 w-16 bg-brand-teal mx-auto mt-6" />
        </div>

        {/* Honest placeholder until verified advisor data is supplied */}
        <div className="max-w-xl mx-auto rounded-2xl border border-neutral-900/80 bg-neutral-900/20 px-6 py-10 text-center">
          <p className="font-sans text-sm leading-relaxed text-neutral-400">
            {isArabic
              ? 'سيتم الإعلان عن أعضاء الهيئة الاستشارية العلمية بمجرد تأكيد المعلومات الرسمية.'
              : "Our Scientific Advisory Board members will be announced once their official information is confirmed."}
          </p>
        </div>
      </div>
    </section>
  );
}
