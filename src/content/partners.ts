import type { Partner } from './types';

/**
 * Partner marks reproduced from the approved menaorg.com homepage. The legacy site does not
 * publish partner URLs or classifications beyond the "Our Partners" heading, so those fields
 * stay absent. Two marks contain no accessible brand name on the source site; their alternative
 * text describes them without guessing an identity.
 */
export const PARTNERS: Partner[] = [
  {
    id: 'king-hussein-business-park',
    name: 'King Hussein Business Park',
    type: 'partner',
    order: 1,
    logo: {
      id: 'partner-khbp-logo',
      type: 'image',
      src: 'images/partners/king-hussein-business-park.jpg',
      alt: { en: 'King Hussein Business Park logo', ar: 'شعار مجمع الملك الحسين للأعمال' },
      width: 810,
      height: 300,
    },
  },
  {
    id: 'al-mamlaka',
    name: 'Al Mamlaka',
    type: 'partner',
    order: 2,
    logo: {
      id: 'partner-al-mamlaka-logo',
      type: 'image',
      src: 'images/partners/al-mamlaka.png',
      alt: { en: 'Al Mamlaka logo', ar: 'شعار المملكة' },
      width: 358,
      height: 296,
    },
  },
  {
    id: 'orjwan-group',
    name: 'Orjwan Group',
    type: 'partner',
    order: 3,
    logo: {
      id: 'partner-orjwan-logo',
      type: 'image',
      src: 'images/partners/orjwan-group.png',
      alt: { en: 'Orjwan Group logo', ar: 'شعار مجموعة أرجوان' },
      width: 573,
      height: 300,
    },
  },
  {
    id: 'burgerizz',
    name: 'Burgerizz',
    type: 'partner',
    order: 4,
    logo: {
      id: 'partner-burgerizz-logo',
      type: 'image',
      src: 'images/partners/burgerizz.png',
      alt: { en: 'Burgerizz logo', ar: 'شعار بيرغرايز' },
      width: 489,
      height: 300,
    },
  },
  {
    id: 'approved-partner-mark',
    name: 'Partner organization',
    type: 'partner',
    order: 5,
    logo: {
      id: 'partner-mark-05-logo',
      type: 'image',
      src: 'images/partners/partner-mark-05.png',
      alt: {
        en: 'Partner logo listed on the approved MENA website',
        ar: 'شعار شريك مُدرج على موقع مِنا المعتمد',
      },
      width: 300,
      height: 300,
    },
  },
  {
    id: 'marouf-coffee',
    name: 'Marouf Coffee',
    type: 'partner',
    order: 6,
    logo: {
      id: 'partner-marouf-logo',
      type: 'image',
      src: 'images/partners/marouf-coffee.png',
      alt: { en: 'Marouf Coffee logo', ar: 'شعار معروف كوفي' },
      width: 413,
      height: 300,
    },
  },
  {
    id: 'arab-bank',
    name: 'Arab Bank',
    type: 'partner',
    order: 7,
    logo: {
      id: 'partner-arab-bank-logo',
      type: 'image',
      src: 'images/partners/arab-bank.png',
      alt: { en: 'Arab Bank logo', ar: 'شعار البنك العربي' },
      width: 953,
      height: 300,
    },
  },
  {
    id: 'zain',
    name: 'Zain',
    type: 'partner',
    order: 8,
    logo: {
      id: 'partner-zain-logo',
      type: 'image',
      src: 'images/partners/zain.png',
      alt: { en: 'Zain logo', ar: 'شعار زين' },
      width: 534,
      height: 300,
    },
  },
  {
    id: 'ministry-digital-economy-entrepreneurship',
    name: 'Ministry of Digital Economy and Entrepreneurship',
    type: 'partner',
    order: 9,
    logo: {
      id: 'partner-modee-logo',
      type: 'image',
      src: 'images/partners/ministry-digital-economy.png',
      alt: {
        en: 'Ministry of Digital Economy and Entrepreneurship logo',
        ar: 'شعار وزارة الاقتصاد الرقمي والريادة',
      },
      width: 345,
      height: 300,
    },
  },
];
