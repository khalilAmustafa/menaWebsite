import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  isArabic: boolean;
}

/** Single source of truth for the address shown in the panel and used by the mailto: hand-off. */
const CONTACT_EMAIL = 'INFO@MENASPACE.ORG';

export default function Contact({ isArabic }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleType: 'volunteer', // volunteer or partner
    interestDept: 'engineering',
    comments: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  /**
   * Phase 8 — TRUTHFULNESS FIX. This form previously sent nothing at all: handleSubmit only
   * flipped a boolean, then displayed a success panel claiming the message had been "synced
   * to Amman Center core" with a promised response time. Nothing was ever transmitted, so
   * every submission silently vanished while telling the visitor it had arrived.
   *
   * There is no backend in this project and Phase 8 must not add one, so the form now hands
   * off to the visitor's own mail client via a mailto: link built from the fields they filled
   * in. That is a real, working delivery path, and the confirmation copy below describes only
   * what actually happened — the message is NOT sent until the visitor sends it themselves.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const subject = `Website inquiry — ${formData.roleType} — ${formData.name}`;
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Inquiry type: ${formData.roleType}`,
      `Area of interest: ${formData.interestDept}`,
      '',
      formData.comments,
    ].join('\n');

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative bg-transparent py-12 sm:py-16">
      
      {/* Bottom transition overlays to land seamlessly into the black footer */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-8 bg-black pointer-events-none z-10" />
      
      {/* Background radial lights */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-brand-teal/[0.02] blur-3xl pointer-events-none" />

      <div className="w-[90%] mx-auto relative z-10">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-xs text-brand-teal block mb-3 font-bold tracking-widest uppercase">
            {isArabic ? "طلب تسجيل وتنسيق التعاون" : "JOIN THE TELEMETRY"}
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight uppercase">
            {isArabic ? (
              <>
                قدّم الآن <span className="text-brand-teal italic font-black">للمشاركة والتدريب</span>
              </>
            ) : (
              <>
                Let’s Collaborate & <span className="text-brand-teal font-black">Train Together</span>
              </>
            )}
          </h2>
          <div className="h-0.5 w-16 bg-brand-teal mx-auto mt-6" />
        </div>

        {/* Form and info split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
          
          {/* Left panel: Info + WhatsApp shortcut */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider mb-3">
                {isArabic ? "معلومات التواصل والربط" : "MISSION COORDINATES"}
              </h3>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                {/*
                  Arabic copy review: the AR text invited universities to take part in
                  "تحدي روفر بترا" (the "Petra Rover Challenge") — a fabricated programme, kin to
                  the "Petra-1" rover and "Jordan Mars Rover Challenge" already deleted as
                  invented. It survived because it existed ONLY in Arabic. The EN text separately
                  offered to "book analog trials in Wadi Rum", implying a bookable service that
                  is not established anywhere. Both replaced with a neutral, accurate invitation.
                */}
                {isArabic ? (
                  'يسعدنا تلقّي استفسارات الجامعات والفرق البحثية والطلبة المهتمين ببعثات مِنا وبرامجها.'
                ) : (
                  'We welcome inquiries from universities, research teams, and students interested in MENA’s missions and programs.'
                )}
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs text-neutral-300">
              <div className="flex items-center space-x-3.5 p-3.5 bg-neutral-900/30 rounded-lg border border-neutral-900/80">
                <MapPin className="w-4 h-4 text-brand-teal flex-shrink-0" />
                <span>
                  {isArabic ? "ميدان الأبحاث: وادي رم، العقبة، الأردن" : "FIELD: Wadi Rum Reserve, Aqaba, Jordan"}
                </span>
              </div>

              <div className="flex items-center space-x-3.5 p-3.5 bg-neutral-900/30 rounded-lg border border-neutral-900/80">
                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-teal transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>

          {/* Right panel: Form Registry */}
          <div className="lg:col-span-7 bg-neutral-900/10 border border-neutral-900/80 p-6 sm:p-10 rounded-2xl relative">
            <h3 className="font-display font-medium text-lg text-white uppercase tracking-wider mb-6">
              {isArabic ? "نموذج الطلب والترشح" : "COLLABORATION & SQUAD INQUIRY"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              
              {/* Toggle Role Select */}
              <div className="grid grid-cols-2 gap-3 mb-6 bg-neutral-950 p-1.5 rounded-lg border border-neutral-900/80">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, roleType: 'volunteer' })}
                  className={`py-2 px-4 rounded-lg font-mono text-[10px] tracking-widest uppercase cursor-pointer transition-all ${
                    formData.roleType === 'volunteer' 
                    ? 'bg-neutral-900 border border-neutral-800 text-white font-bold' 
                    : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {isArabic ? "كـ متطوع علمي" : "APPLY AS VOLUNTEER"}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, roleType: 'partner' })}
                  className={`py-2 px-4 rounded-lg font-mono text-[10px] tracking-widest uppercase cursor-pointer transition-all ${
                    formData.roleType === 'partner' 
                    ? 'bg-neutral-900 border border-neutral-800 text-white font-bold' 
                    : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {isArabic ? "كـ شريك وجامعة" : "PARTNERSHIP INQUIRY"}
                </button>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="font-mono text-brand-red text-[10px] uppercase block tracking-wider font-semibold">
                  {isArabic ? "الاسم الكامل للمرشح أو المؤسسة" : "FULL NAME / CORPORATE NAME"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={isArabic ? "مثال: م. سارة العبادي" : "e.g. Eng. Sarah Abbadi / Hashemite University"}
                  className="w-full bg-black text-neutral-200 border border-neutral-900/80 hover:border-neutral-850 rounded-lg px-3.5 py-3 font-mono text-[11px] focus:outline-none focus:border-brand-red transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="font-mono text-brand-teal text-[10px] uppercase block tracking-wider font-semibold">
                  {isArabic ? "البريد الإلكتروني المعتمد" : "EMAIL ADDRESS"}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@aerospace.org"
                  className="w-full bg-black text-neutral-200 border border-neutral-900/80 hover:border-neutral-850 rounded-lg px-3.5 py-3 font-mono text-[11px] focus:outline-none focus:border-brand-teal transition-all"
                />
              </div>

              {/* Interest department */}
              <div className="space-y-1.5">
                <label className="font-mono text-neutral-500 text-[10px] uppercase block tracking-wider">
                  {isArabic ? "القسم ذو الاهتمام المتطابق" : "PREFFERED FUNCTIONAL DIVISION"}
                </label>
                <select
                  value={formData.interestDept}
                  onChange={(e) => setFormData({ ...formData, interestDept: e.target.value })}
                  className="w-full bg-black text-neutral-400 border border-neutral-900/80 rounded-lg px-3.5 py-3 font-mono text-[11px] focus:outline-none focus:border-neutral-800"
                >
                  <option value="engineering">{isArabic ? "تطوير البدلات واللوجستيات الهندسية" : "Spacesuit Fabrications"}</option>
                  {/*
                    Phase 8.2: was "AMMAN Mission Controls" / "أنظمة الاتصال في غرفة عمليات عمان",
                    which implied MENA operates a mission-control/operations room in Amman — an
                    unverified facility claim. Replaced with a neutral description of the KIND of
                    inquiry, naming no facility.
                  */}
                  <option value="mission-operations">
                    {isArabic ? 'استفسارات تقنية وعمليات البعثات' : 'Technical & Mission Operations Inquiry'}
                  </option>
                  <option value="astrobiology">{isArabic ? "أبحاث الأحيائية والتربة البركانية" : "Astrobiology R&D labs"}</option>
                  <option value="donation">{isArabic ? "بوابة الرعاية والشراكة التمويلية" : "Donation & Sponsorship Channels"}</option>
                </select>
              </div>

              {/* Message Comments */}
              <div className="space-y-1.5">
                <label className="font-mono text-neutral-500 text-[10px] uppercase block tracking-wider">
                  {/* Arabic copy review: was "…في عقيدتكم" — "in your creed/doctrine", a
                      machine-translation artefact that made no sense in context. */}
                  {isArabic ? 'تفاصيل التعاون المقترح' : 'PROPOSED ENGAGEMENT SCOPE'}
                </label>
                <textarea
                  rows={4}
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  placeholder={isArabic ? "اخبرنا عن مهاراتك الهندسية أو رغبتك في توجيه عينات الأبحاث..." : "Briefly articulate details of your skills, student body count, or target material sponsorship scope."}
                  className="w-full bg-black text-neutral-200 border border-neutral-900/80 hover:border-neutral-850 rounded-lg px-3.5 py-3 font-mono text-[11px] focus:outline-none focus:border-neutral-800"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-brand-teal hover:bg-brand-teal-hover text-white py-3.5 rounded-lg font-display font-semibold text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-brand-teal/10 active:scale-[0.99] transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isArabic ? "طرح وإرسال تفاصيل التوثيق" : "SUBMIT TELEMETRY REGISTRY"}
                </button>
              </div>

            </form>

            {/* Success Submission Dialog view */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-space-dark flex flex-col items-center justify-center text-center p-8 rounded-2xl relative z-10"
                >
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="p-3 bg-emerald-950 text-emerald-400 border border-emerald-500/20 rounded-full mb-5"
                  >
                    <CheckCircle2 className="w-8 h-8 animate-pulse" />
                  </motion.div>
                  
                  {/*
                    Phase 8: this panel used to announce a successful transmission that never
                    happened, name a coordinator ("م. العبادي") who exists nowhere in any
                    source material, and promise a response time. All three were removed. The
                    copy now states only the verifiable fact: the visitor's mail client was
                    opened, and the message is not sent until they send it.
                  */}
                  <h4 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-widest mb-2">
                    {isArabic ? 'تم فتح بريدك الإلكتروني' : 'YOUR EMAIL APP IS OPEN'}
                  </h4>
                  <p className="font-mono text-xs text-neutral-400 max-w-sm mb-6 leading-relaxed">
                    {isArabic
                      ? `فتحنا رسالة جاهزة في تطبيق البريد لديك. لن تصلنا رسالتك حتى ترسلها من هناك. إذا لم يفتح أي تطبيق، راسلنا مباشرة على ${CONTACT_EMAIL}`
                      : `We've opened a pre-filled message in your email app. Your message isn't sent until you send it from there. If nothing opened, write to us directly at ${CONTACT_EMAIL}`}
                  </p>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2 bg-neutral-900 border border-neutral-800 rounded-lg font-mono text-[10px] text-brand-teal tracking-widest uppercase transition-colors cursor-pointer hover:bg-neutral-850"
                  >
                    {isArabic ? "تحرير وثيقة جديدة" : "NEW TRANSMISSION"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
