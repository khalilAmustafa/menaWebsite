import { Link } from 'react-router-dom';
import MenaLogo from './MenaLogo';

interface FooterProps {
  isArabic: boolean;
}

export default function Footer({ isArabic }: FooterProps) {
  // Route-based throughout: the old /#mission, /#gallery and /#contact anchors no longer
  // exist on the restructured homepage. Events and the Wadi Rum analog mission live here
  // now that the primary navigation is organization-level.
  const groups = [
    {
      title: isArabic ? 'المنظمة' : 'Organization',
      links: [
        { to: '/about', label: isArabic ? 'من نحن' : 'About' },
        { to: '/team', label: isArabic ? 'الفريق' : 'Team' },
        { to: '/contact', label: isArabic ? 'تواصل' : 'Contact' },
      ],
    },
    {
      title: isArabic ? 'العمل' : 'The work',
      links: [
        { to: '/activities', label: isArabic ? 'البرامج' : 'Programs' },
        { to: '/achievements', label: isArabic ? 'الإنجازات' : 'Achievements' },
        { to: '/achievements/research', label: isArabic ? 'الأوراق البحثية' : 'Research papers' },
      ],
    },
    {
      title: isArabic ? 'البعثات والفعاليات' : 'Missions & events',
      links: [
        { to: '/events', label: isArabic ? 'الفعاليات' : 'Events' },
        { to: '/events/analog-mission-2025', label: isArabic ? 'محاكاة وادي رم' : 'Wadi Rum analog' },
        { to: '/donate', label: isArabic ? 'ادعم مِنا' : 'Support MENA' },
      ],
    },
  ];

  return (
    <footer className="relative z-10 border-t border-[var(--page-border)] bg-[#0b0807] py-14 text-neutral-300">
      <div className="site-container">
        <div className="grid gap-10 sm:grid-cols-[minmax(150px,.7fr)_minmax(0,1.3fr)]">
          <Link to="/" className="inline-flex w-fit flex-col gap-3" aria-label={isArabic ? 'مِنا — الصفحة الرئيسية' : 'MENA — home'}>
            <span className="block h-24 w-20"><MenaLogo color="var(--color-brand-teal)" /></span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500">{isArabic ? 'وادي رم · الأردن' : 'Wadi Rum · Jordan'}</span>
          </Link>

          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3" aria-label={isArabic ? 'روابط التذييل' : 'Footer navigation'}>
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-brand-teal">{group.title}</h2>
                <ul className="mt-4 space-y-3 text-sm text-neutral-400">
                  {group.links.map((link) => <li key={link.to}><Link to={link.to} className="hover:text-white">{link.label}</Link></li>)}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{isArabic ? `© ${new Date().getFullYear()} مؤسسة مِنا للفضاء.` : `© ${new Date().getFullYear()} MENA Space Organization.`}</p>
          <a dir="ltr" href="mailto:contact@menaorg.com" className="hover:text-brand-teal">contact@menaorg.com</a>
        </div>
      </div>
    </footer>
  );
}
