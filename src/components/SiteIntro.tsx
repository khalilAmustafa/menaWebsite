import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import MenaLogo from './MenaLogo';

export default function SiteIntro() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), reduceMotion ? 260 : 1450);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="site-intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.16 : 0.48, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="site-intro__mark"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0.16 : 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <MenaLogo className="site-intro__logo" />
            <span>MENA SPACE ORGANIZATION</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
