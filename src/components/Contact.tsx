import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Linkedin, Globe2 } from 'lucide-react';

interface ContactProps {
  isArabic: boolean;
}

export default function Contact({ isArabic }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleType: 'volunteer', // volunteer or partner
    interestDept: 'engineering',
    comments: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', roleType: 'volunteer', interestDept: 'engineering', comments: '' });
    }, 4500);
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
                {isArabic ? (
                  "يسعدنا الإجابة على استفسارات الجامعات والمعاهد التكنولوجية الراغبة بالمشاركة في تحدي روفر بترا والفرق البحثية."
                ) : (
                  "Have research requests, space payload inquiries, or university student squads wanting to book analog trials in Wadi Rum?"
                )}
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs text-neutral-300">
              <div className="flex items-center space-x-3.5 p-3.5 bg-neutral-900/30 rounded border border-neutral-900/80">
                <MapPin className="w-4 h-4 text-brand-teal flex-shrink-0" />
                <span>
                  {isArabic ? "ميدان الأبحاث: وادي رم، العقبة، الأردن" : "FIELD: Wadi Rum Reserve, Aqaba, Jordan"}
                </span>
              </div>

              <div className="flex items-center space-x-3.5 p-3.5 bg-neutral-900/30 rounded border border-neutral-900/80">
                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>INFO@MENASPACE.ORG / SECURE LINK</span>
              </div>
            </div>

            {/* WhatsApp Integration Shortcut with brand green balance or teal */}
            <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/30 animate-pulse">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-display font-bold text-xs text-white uppercase tracking-widest leading-none">
                    {isArabic ? "تكامل الواتساب المباشر" : "INSTANT WHATSAPP CHANNELS"}
                  </h5>
                  <span className="font-mono text-[9px] text-neutral-400 block mt-1.5 uppercase">RESPONSE RATIO: UNDER 4 HOURS</span>
                </div>
              </div>
              
              <p className="font-sans text-[11px] text-neutral-300 leading-relaxed mb-4">
                {isArabic ? (
                  "تواصل مباشرة مع منسق علاقات الطاقم لتبادل الأفكار والاستفسارات السريعة بضغطة واحدة."
                ) : (
                  "Skip long forms and tap to connect directly with our Amman headquarters communications team."
                )}
              </p>

              <a
                href="https://wa.me/962770000000"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 font-display font-black text-[10px] sm:text-xs text-neutral-950 tracking-widest uppercase px-5 py-2.5 rounded transition-all shadow-lg"
              >
                {isArabic ? "افتح محادثة واتساب" : "LAUNCH WHATSAPP COMM"}
              </a>
            </div>

            {/* Social Medias */}
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest mr-2">SECURE NETWORKS:</span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" className="p-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-450 hover:text-brand-teal rounded border border-neutral-850 transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" className="p-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-450 hover:text-brand-red rounded border border-neutral-850 transition-colors"><Globe2 className="w-4 h-4" /></a>
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
                  className={`py-2 px-4 rounded font-mono text-[10px] tracking-widest uppercase cursor-pointer transition-all ${
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
                  className={`py-2 px-4 rounded font-mono text-[10px] tracking-widest uppercase cursor-pointer transition-all ${
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
                  className="w-full bg-black text-neutral-200 border border-neutral-900/80 hover:border-neutral-850 rounded px-3.5 py-3 font-mono text-[11px] focus:outline-none focus:border-brand-red transition-all"
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
                  className="w-full bg-black text-neutral-200 border border-neutral-900/80 hover:border-neutral-850 rounded px-3.5 py-3 font-mono text-[11px] focus:outline-none focus:border-brand-teal transition-all"
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
                  className="w-full bg-black text-neutral-400 border border-neutral-900/80 rounded px-3.5 py-3 font-mono text-[11px] focus:outline-none focus:border-neutral-800"
                >
                  <option value="engineering">{isArabic ? "تطوير البدلات واللوجستيات الهندسية" : "Spacesuit Fabrications"}</option>
                  <option value="mission-control">{isArabic ? "أنظمة الاتصال في غرفة عمليات عمان" : "AMMAN Mission Controls"}</option>
                  <option value="astrobiology">{isArabic ? "أبحاث الأحيائية والتربة البركانية" : "Astrobiology R&D labs"}</option>
                  <option value="donation">{isArabic ? "بوابة الرعاية والشراكة التمويلية" : "Donation & Sponsorship Channels"}</option>
                </select>
              </div>

              {/* Message Comments */}
              <div className="space-y-1.5">
                <label className="font-mono text-neutral-500 text-[10px] uppercase block tracking-wider">
                  {isArabic ? "التفاصيل وأوجه التعاون في عقيدتكم" : "PROPOSED ENGAGEMENT SCOPE"}
                </label>
                <textarea
                  rows={4}
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  placeholder={isArabic ? "اخبرنا عن مهاراتك الهندسية أو رغبتك في توجيه عينات الأبحاث..." : "Briefly articulate details of your skills, student body count, or target material sponsorship scope."}
                  className="w-full bg-black text-neutral-200 border border-neutral-900/80 hover:border-neutral-850 rounded px-3.5 py-3 font-mono text-[11px] focus:outline-none focus:border-neutral-800"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-brand-teal hover:bg-[#009390] text-white py-3.5 rounded font-display font-semibold text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-brand-teal/10 active:scale-[0.99] transition-all"
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
                  className="absolute inset-0 bg-[#111111] flex flex-col items-center justify-center text-center p-8 rounded-2xl relative z-10"
                >
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="p-3 bg-emerald-950 text-emerald-400 border border-emerald-500/20 rounded-full mb-5"
                  >
                    <CheckCircle2 className="w-8 h-8 animate-pulse" />
                  </motion.div>
                  
                  <h4 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-widest mb-2">
                    {isArabic ? "تم توثيق الإرسالية بنجاح!" : "TELEMETRY LINK SECURED!"}
                  </h4>
                  <p className="font-mono text-xs text-neutral-400 max-w-sm mb-6 leading-relaxed">
                    {isArabic 
                      ? "رابط التسجيل مؤمن كلياً. تم إشعار وحدة عمليات الاتصالات في عمان. ستجيب منسقتنا م. العبادي قريبًا بمفردات رائد الفضاء."
                      : "Your registry transmission parameters has been locked and synced to Amman Center core. One of our specialists will reach back inside a 4.2-second delay threshold."
                    }
                  </p>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2 bg-neutral-900 border border-neutral-800 rounded font-mono text-[10px] text-brand-teal tracking-widest uppercase transition-colors cursor-pointer hover:bg-neutral-850"
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
