export type Language = 'sw' | 'en';

export type GalleryCategory =
  | 'all'
  | 'harusi'
  | 'mahafali'
  | 'asili'
  | 'studio'
  | 'watoto'
  | 'kisheria';

export interface PortfolioPhoto {
  id: string;
  category: Exclude<GalleryCategory, 'all'>;
  categoryLabel: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}

export interface ServiceItem {
  id: string;
  icon: 'video' | 'indoor' | 'outdoor' | 'harusi' | 'doc' | 'drone' | 'design';
  title: string;
  description: string;
  waText: string;
}

export const USER_PHOTOS = {
  profileAvatar: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_8.22.18_AM_cbf9fe9a.jpeg',
  redJumpsuit: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_8.56.18_AM_78799997.jpeg',
  kidsBirthday: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_8.56.34_AM_a603b552.jpeg',
  streetBack: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_8.56.36_AM_262eaae2.jpeg',
  streetSmoke: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_8.56.37_AM_a633c376.jpeg',
  studioPhone: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_8.56.38_AM_15fd90ed.jpeg',
  moonlightVelvet: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_8.57.33_AM_e5f76e78.jpeg',
  kangaCalabash: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_8.57.34_AM_9fbbef60.jpeg',
  kangaSeated: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_8.57.35_AM_8cc18b5b.jpeg',
  gradBlueGold: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_7.56.16_AMi_167543ad.jpeg',
  gradSign: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_7.56.17_AMe_090b3223.jpeg',
  gradWoman: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_7.57.23_AM_71b49c13.jpeg',
  weddingVows: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_8.11.01_AM__1__ba62b7aa.jpeg',
  weddingCert: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_8.11.21_AM__2__71695aa8.jpeg',
  pressOne: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_8.22.14_AM_9f88a5e2.jpeg',
  pressTwo: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_8.22.15_AM_50dff53d.jpeg',
};

export const STUDIO_CONTACT = {
  brandShort: 'EVELASTING',
  brandFull: 'EVELASTING LEGAL VIDEO PRODUCTION',
  owner: 'Rahmani',
  location: 'Kigogo A2 Hall, Dar es Salaam',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Kigogo%20A2%20Hall%2C%20Dar%20es%20Salaam',
  phoneDisplay: '+255 741 644 256',
  phoneHref: 'tel:+255741644256',
  whatsappBase: 'https://wa.me/255741644256',
};

export interface LocalizedStudioCopy {
  nav: {
    gallery: string;
    services: string;
    pricing: string;
    about: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    meta: { label: string; value: string }[];
  };
  gallery: {
    kicker: string;
    heading: string;
    subheading: string;
    filters: { id: GalleryCategory; label: string }[];
    items: PortfolioPhoto[];
    lightbox: {
      previous: string;
      next: string;
      close: string;
      bookCta: string;
    };
  };
  services: {
    kicker: string;
    heading: string;
    subheading: string;
    askPrice: string;
    items: ServiceItem[];
  };
  pricing: {
    kicker: string;
    heading: string;
    subheading: string;
    indoorTitle: string;
    indoorPrice: string;
    indoorUnit: string;
    indoorNote: string;
    outdoorTitle: string;
    outdoorPrice: string;
    outdoorUnit: string;
    outdoorNote: string;
    customTitle: string;
    customPrice: string;
    customNote: string;
    customCta: string;
    calcTitle: string;
    calcTypeLabel: string;
    calcCountLabel: string;
    calcTotalLabel: string;
    calcWaCta: string;
  };
  about: {
    kicker: string;
    heading: string;
    p1: string;
    p2: string;
    bullets: string[];
    infoRows: {
      locationLabel: string;
      mapCta: string;
      phoneLabel: string;
      waLabel: string;
      waCta: string;
      hoursLabel: string;
      hoursValue: string;
      ownerLabel: string;
    };
  };
  booking: {
    kicker: string;
    heading: string;
    subheading: string;
    quickWa: string;
    quickCall: string;
    quickMap: string;
    fields: {
      nameLabel: string;
      namePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      serviceLabel: string;
      dateLabel: string;
      noteLabel: string;
      notePlaceholder: string;
      submitBtn: string;
      formNote: string;
    };
    serviceOptions: string[];
    errors: {
      nameRequired: string;
      phoneRequired: string;
      dateRequired: string;
    };
    confirmation: {
      title: string;
      message: string;
      waOpenBtn: string;
      resetBtn: string;
    };
  };
  footer: {
    menuHeading: string;
    contactHeading: string;
    rights: string;
    locationLine: string;
    ownerCredit: string;
  };
}

export const STUDIO_COPY: Record<Language, LocalizedStudioCopy> = {
  sw: {
    nav: {
      gallery: 'Kazi',
      services: 'Huduma',
      pricing: 'Bei',
      about: 'Kuhusu',
      contact: 'Wasiliana',
      openMenu: 'Fungua menyu',
      closeMenu: 'Funga menyu',
    },
    hero: {
      kicker: 'Kigogo A2 Hall · Dar es Salaam',
      title: 'EVELASTING',
      subtitle: 'Legal Video Production',
      lead: 'Tunatoa huduma bora za upigaji picha (Photoshoot) na utengenezaji wa video (Video Production) kwa viwango vya juu na ubunifu mkubwa. Tunahakikisha kila tukio lako linakumbukwa milele kwa ubora wa hali ya juu.',
      ctaPrimary: 'Panga Kipindi WhatsApp',
      ctaSecondary: 'Tazama Kazi Zetu',
      meta: [
        { label: 'Indoor Photoshoot', value: 'Tsh 3,000/= picha' },
        { label: 'Outdoor Photoshoot', value: 'Tsh 5,000/= picha' },
        { label: 'Mahali', value: 'Kigogo A2 Hall, DSM' },
        { label: 'Simu & WhatsApp', value: '+255 741 644 256' },
      ],
    },
    gallery: {
      kicker: 'Portfolio',
      heading: 'Kazi Zetu',
      subheading:
        'Picha zilizopangwa kwa makundi: mahafali, harusi, asili, studio, watoto na kisheria. Bonyeza picha yoyote kuitazama kwa ukubwa.',
      filters: [
        { id: 'all', label: 'Zote' },
        { id: 'harusi', label: 'Harusi' },
        { id: 'mahafali', label: 'Mahafali' },
        { id: 'asili', label: 'Asili' },
        { id: 'studio', label: 'Studio' },
        { id: 'watoto', label: 'Watoto' },
        { id: 'kisheria', label: 'Kisheria & Makala' },
      ],
      items: [
        {
          id: 'harusi-01',
          category: 'harusi',
          categoryLabel: 'Harusi',
          title: 'Sherehe ya Ndoa — Cheti cha Pamoja',
          subtitle: 'Wedding Coverage · Kanisani',
          image: USER_PHOTOS.weddingCert,
          imageAlt: 'Wanandoa wakionyesha vyeti vyao vya ndoa madhabahuni',
        },
        {
          id: 'harusi-02',
          category: 'harusi',
          categoryLabel: 'Harusi',
          title: 'Viapo vya Ndoa Madhabahuni',
          subtitle: 'Wedding Coverage · Matukio Halisi',
          image: USER_PHOTOS.weddingVows,
          imageAlt: 'Bwana harusi akisoma viapo vya ndoa mbele ya mapadre',
        },
        {
          id: 'asili-01',
          category: 'asili',
          categoryLabel: 'Asili',
          title: 'Urithi wa Kanga & Kibuyu',
          subtitle: 'Indoor Photoshoot · Tsh 3,000/=',
          image: USER_PHOTOS.kangaCalabash,
          imageAlt: 'Mwanamke katika vazi la kanga akiwa ameshika kibuyu studio',
        },
        {
          id: 'asili-02',
          category: 'asili',
          categoryLabel: 'Asili',
          title: 'Muonekano wa Kitamaduni Studio',
          subtitle: 'Indoor Photoshoot · Tsh 3,000/=',
          image: USER_PHOTOS.kangaSeated,
          imageAlt: 'Picha ya studio katika vazi la asili la kanga na ushanga',
        },
        {
          id: 'studio-01',
          category: 'studio',
          categoryLabel: 'Studio',
          title: 'Editorial Portrait — Vazi Jekundu',
          subtitle: 'Indoor Photoshoot · Tsh 3,000/=',
          image: USER_PHOTOS.redJumpsuit,
          imageAlt: 'Mwanamke katika vazi jekundu studio',
        },
        {
          id: 'studio-02',
          category: 'studio',
          categoryLabel: 'Studio',
          title: 'Evening Glamour — Mwezi na Ua',
          subtitle: 'Indoor Photoshoot · Tsh 3,000/=',
          image: USER_PHOTOS.moonlightVelvet,
          imageAlt: 'Mwanamke katika gauni jeusi akiwa na ua jekundu studio',
        },
        {
          id: 'studio-03',
          category: 'studio',
          categoryLabel: 'Studio',
          title: 'Streetwear Outdoor Light',
          subtitle: 'Outdoor Photoshoot · Tsh 5,000/=',
          image: USER_PHOTOS.streetBack,
          imageAlt: 'Kijana katika mavazi ya streetwear mbele ya mwanga wa jua',
        },
        {
          id: 'studio-04',
          category: 'studio',
          categoryLabel: 'Studio',
          title: 'Blue Smoke Creative Session',
          subtitle: 'Indoor Photoshoot · Tsh 3,000/=',
          image: USER_PHOTOS.streetSmoke,
          imageAlt: 'Picha ya studio yenye mwanga wa bluu na moshi',
        },
        {
          id: 'studio-05',
          category: 'studio',
          categoryLabel: 'Studio',
          title: 'Spotlight Portrait — Calling Concept',
          subtitle: 'Indoor Photoshoot · Tsh 3,000/=',
          image: USER_PHOTOS.studioPhone,
          imageAlt: 'Kijana akiwa na simu mkononi mbele ya spotlight studio',
        },
        {
          id: 'watoto-01',
          category: 'watoto',
          categoryLabel: 'Watoto',
          title: 'Birthday & Kids Studio Session',
          subtitle: 'Indoor Photoshoot · Tsh 3,000/=',
          image: USER_PHOTOS.kidsBirthday,
          imageAlt: 'Mtoto akitabasamu kwenye studio ya birthday na maua mekundu',
        },
        {
          id: 'mahafali-01',
          category: 'mahafali',
          categoryLabel: 'Mahafali',
          title: 'Mahafali — Kofia na Vivuli vya Jua',
          subtitle: 'Graduation Studio · Tsh 3,000/=',
          image: USER_PHOTOS.gradWoman,
          imageAlt: 'Mhitimu wa kike akiwa na joho na kofia ya mahafali',
        },
        {
          id: 'mahafali-02',
          category: 'mahafali',
          categoryLabel: 'Mahafali',
          title: 'Mahafali — Ukuta wa GRAD',
          subtitle: 'Graduation Studio · Tsh 3,000/=',
          image: USER_PHOTOS.gradSign,
          imageAlt: 'Mhitimu wa kiume pembeni ya herufi za GRAD studio',
        },
        {
          id: 'mahafali-03',
          category: 'mahafali',
          categoryLabel: 'Mahafali',
          title: 'Mahafali — Joho Kamili',
          subtitle: 'Graduation Studio · Tsh 3,000/=',
          image: USER_PHOTOS.gradBlueGold,
          imageAlt: 'Mhitimu katika joho kamili la mahafali studio',
        },
        {
          id: 'kisheria-01',
          category: 'kisheria',
          categoryLabel: 'Kisheria & Makala',
          title: 'Mkutano wa Waandishi wa Habari',
          subtitle: 'Documentary & Video Production',
          image: USER_PHOTOS.pressOne,
          imageAlt: 'Mzungumzaji akiongea mbele ya maikrofoni za vyombo vya habari',
        },
        {
          id: 'kisheria-02',
          category: 'kisheria',
          categoryLabel: 'Kisheria & Makala',
          title: 'Taarifa Rasmi & Mahojiano',
          subtitle: 'Documentary & Video Production',
          image: USER_PHOTOS.pressTwo,
          imageAlt: 'Msemaji akitoa maelezo mbele ya kamera za habari',
        },
      ],
      lightbox: {
        previous: 'Picha iliyopita',
        next: 'Picha inayofuata',
        close: 'Funga',
        bookCta: 'Panga kipindi kama hiki',
      },
    },
    services: {
      kicker: 'Huduma Zetu',
      heading: 'Tunafanya Nini',
      subheading:
        'Kila huduma inaweza kupangwa kwa mahitaji yako — piga simu au tuma ujumbe kwa WhatsApp.',
      askPrice: 'Uliza bei',
      items: [
        {
          id: 'video',
          icon: 'video',
          title: 'Video Production',
          description:
            'Kupiga na kuhariri video za sherehe (harusi, sendoff, kitchen party), matangazo na kumbukumbu za kibinafsi.',
          waText: 'Habari EVELASTING! Ningependa kujua kuhusu huduma ya Video Production.',
        },
        {
          id: 'indoor',
          icon: 'indoor',
          title: 'Indoor Photoshoot',
          description:
            'Picha za studio kwa profile, mahafali, birthday, watoto na mavazi — Tsh 3,000/= tu kwa picha moja.',
          waText: 'Habari EVELASTING! Ningependa kupanga Indoor Photoshoot (Tsh 3,000/= kwa picha).',
        },
        {
          id: 'outdoor',
          icon: 'outdoor',
          title: 'Outdoor Photoshoot',
          description:
            'Upigaji picha za nje katika bustani, fukwe au mitaani kwa mwanga wa asili — Tsh 5,000/= tu kwa picha moja.',
          waText: 'Habari EVELASTING! Ningependa kupanga Outdoor Photoshoot (Tsh 5,000/= kwa picha).',
        },
        {
          id: 'harusi',
          icon: 'harusi',
          title: 'Wedding Coverage (Harusi)',
          description:
            'Picha na video za harusi, sendoff na kitchen party — kutoka maandalizi hadi sherehe ya ukumbini.',
          waText: 'Habari EVELASTING! Ningependa kujua bei ya Wedding Coverage (Harusi/Sendoff).',
        },
        {
          id: 'doc',
          icon: 'doc',
          title: 'Documentary (Makala)',
          description:
            'Matukio ya kisheria, makala za taasisi, press conference, mikutano na sherehe rasmi.',
          waText: 'Habari EVELASTING! Ningependa kujua kuhusu huduma ya Documentary (Makala).',
        },
        {
          id: 'drone',
          icon: 'drone',
          title: 'Drone Shooting',
          description:
            'Picha na video za angani zenye ubora wa juu kwa harusi, majengo, hoteli na matukio makubwa.',
          waText: 'Habari EVELASTING! Ningependa kujua bei ya huduma ya Drone Shooting.',
        },
        {
          id: 'design',
          icon: 'design',
          title: 'Graphics Design',
          description:
            'Ubunifu wa mabango, kadi za mialiko, logo na matangazo ya kidijitali kwa biashara au sherehe.',
          waText: 'Habari EVELASTING! Ningependa kujua kuhusu huduma ya Graphics Design.',
        },
      ],
    },
    pricing: {
      kicker: 'Bei Zetu',
      heading: 'Bei Zilizo Wazi',
      subheading:
        'Picha moja ya Indoor ni Tsh 3,000/= na Outdoor ni Tsh 5,000/= tu. Kwa video na matukio mengine wasiliana nasi kwa bei maalum.',
      indoorTitle: 'Indoor Photoshoot',
      indoorPrice: 'Tsh 3,000/=',
      indoorUnit: 'Picha moja ya Indoor',
      indoorNote: 'Studio lighting, mandhari ya kisasa na uhariri makini wa rangi.',
      outdoorTitle: 'Outdoor Photoshoot',
      outdoorPrice: 'Tsh 5,000/=',
      outdoorUnit: 'Picha moja ya Outdoor tu',
      outdoorNote: 'Upigaji picha za nje kwenye eneo unalopenda pamoja na uhariri safi.',
      customTitle: 'Video, Harusi, Makala & Drone',
      customPrice: 'Bei Maalum',
      customNote:
        'Kwa huduma nyingine kama Video Production, Harusi, Documentary, Drone Shooting na Graphics Design, wasiliana nasi.',
      customCta: 'Uliza Bei WhatsApp',
      calcTitle: 'Kadiria Gharama ya Picha Zako',
      calcTypeLabel: 'Aina ya Photoshoot',
      calcCountLabel: 'Idadi ya Picha',
      calcTotalLabel: 'Jumla ya Gharama',
      calcWaCta: 'Weka Miadi WhatsApp',
    },
    about: {
      kicker: 'Kuhusu',
      heading: 'Kumbukumbu zinazopangwa kwa makini',
      p1: 'EVELASTING LEGAL VIDEO PRODUCTION ni studio ya picha na video iliyopo Kigogo A2 Hall, Dar es Salaam. Tunapiga na kupanga picha za harusi, mahafali, studio, watoto na matukio ya kisheria kwa mtiririko unaoeleweka.',
      p2: 'Tunaamini kumbukumbu nzuri haihitaji maneno mengi: inahitaji mpangilio, mwanga na wakati sahihi. Ndiyo kazi yetu.',
      bullets: [
        'Mpangilio wa picha kwa mtiririko unaoeleweka',
        'Rangi na mwanga wa kisanaa kwa Indoor & Outdoor',
        'Matukio ya kisheria, makala (Documentary) na press conference',
        'Huduma za Drone Shooting na Graphics Design',
        'Kigogo A2 Hall, Dar es Salaam',
      ],
      infoRows: {
        locationLabel: 'Mahali',
        mapCta: 'Fungua kwenye ramani',
        phoneLabel: 'Simu',
        waLabel: 'WhatsApp',
        waCta: 'Tuma ujumbe',
        hoursLabel: 'Muda',
        hoursValue: 'Kwa miadi — piga simu kwanza',
        ownerLabel: 'Owner',
      },
    },
    booking: {
      kicker: 'Wasiliana',
      heading: 'Panga Kipindi Chako',
      subheading:
        'Tupigie simu au tutumie ujumbe kupanga kikao chako leo. Hakuna malipo kwenye tovuti hii — maelezo yako yanatumwa moja kwa moja WhatsApp.',
      quickWa: 'WhatsApp',
      quickCall: 'Piga Simu',
      quickMap: 'Ramani',
      fields: {
        nameLabel: 'Jina lako *',
        namePlaceholder: 'Jina kamili',
        phoneLabel: 'Namba ya simu *',
        phonePlaceholder: '0741 644 256',
        serviceLabel: 'Aina ya kipindi *',
        dateLabel: 'Tarehe ya tukio *',
        noteLabel: 'Maelezo',
        notePlaceholder: 'Mfano: harusi ya jioni, idadi ya picha za indoor/outdoor, mahali...',
        submitBtn: 'Tuma kwa WhatsApp',
        formNote: 'Utaandaliwa ujumbe wenye maelezo yako ili utume moja kwa moja WhatsApp.',
      },
      serviceOptions: [
        'Indoor Photoshoot (Tsh 3,000/= picha)',
        'Outdoor Photoshoot (Tsh 5,000/= picha)',
        'Wedding Coverage (Harusi / Sendoff / Kitchen Party)',
        'Video Production',
        'Documentary (Makala)',
        'Drone Shooting',
        'Graphics Design',
      ],
      errors: {
        nameRequired: 'Tafadhali weka jina lako kamili.',
        phoneRequired: 'Tafadhali weka namba sahihi ya simu.',
        dateRequired: 'Tafadhali chagua tarehe ya tukio.',
      },
      confirmation: {
        title: 'Ujumbe wako wa WhatsApp uko tayari!',
        message: 'Bofya kitufe hapa chini kufungua WhatsApp na kutuma maombi yako.',
        waOpenBtn: 'Fungua WhatsApp Kutuma',
        resetBtn: 'Panga Kipindi Kingine',
      },
    },
    footer: {
      menuHeading: 'Menyu',
      contactHeading: 'Mawasiliano',
      rights: 'EVELASTING LEGAL VIDEO PRODUCTION. Haki zote zimehifadhiwa.',
      locationLine: 'Picha na video · Kigogo A2 Hall, Dar es Salaam',
      ownerCredit: 'Owner & Created by',
    },
  },
  en: {
    nav: {
      gallery: 'Work',
      services: 'Services',
      pricing: 'Pricing',
      about: 'About',
      contact: 'Contact',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      kicker: 'Kigogo A2 Hall · Dar es Salaam',
      title: 'EVELASTING',
      subtitle: 'Legal Video Production',
      lead: 'We deliver top-tier photography (Photoshoot) and creative Video Production with artistic precision — ensuring every milestone is remembered forever in vivid quality.',
      ctaPrimary: 'Book via WhatsApp',
      ctaSecondary: 'Explore Our Work',
      meta: [
        { label: 'Indoor Photoshoot', value: 'Tsh 3,000/= per photo' },
        { label: 'Outdoor Photoshoot', value: 'Tsh 5,000/= per photo' },
        { label: 'Location', value: 'Kigogo A2 Hall, DSM' },
        { label: 'Phone & WhatsApp', value: '+255 741 644 256' },
      ],
    },
    gallery: {
      kicker: 'Portfolio',
      heading: 'Our Work',
      subheading:
        'Curated galleries across graduations, weddings, cultural portraits, studio, kids, and legal/media events. Click any frame to inspect full size.',
      filters: [
        { id: 'all', label: 'All' },
        { id: 'harusi', label: 'Weddings' },
        { id: 'mahafali', label: 'Graduation' },
        { id: 'asili', label: 'Cultural' },
        { id: 'studio', label: 'Studio' },
        { id: 'watoto', label: 'Kids' },
        { id: 'kisheria', label: 'Legal & Media' },
      ],
      items: [
        {
          id: 'harusi-01',
          category: 'harusi',
          categoryLabel: 'Wedding Coverage',
          title: 'Church Ceremony — Marriage Certificates',
          subtitle: 'Wedding Coverage · Altar',
          image: USER_PHOTOS.weddingCert,
          imageAlt: 'Bride and groom holding marriage certificates at the altar',
        },
        {
          id: 'harusi-02',
          category: 'harusi',
          categoryLabel: 'Wedding Coverage',
          title: 'Sacred Vows at the Altar',
          subtitle: 'Wedding Coverage · Documentary',
          image: USER_PHOTOS.weddingVows,
          imageAlt: 'Groom reading wedding vows during ceremony',
        },
        {
          id: 'asili-01',
          category: 'asili',
          categoryLabel: 'Cultural',
          title: 'Kanga & Calabash Heritage Portrait',
          subtitle: 'Indoor Photoshoot · Tsh 3,000/=',
          image: USER_PHOTOS.kangaCalabash,
          imageAlt: 'Woman in traditional kanga attire holding a calabash in studio',
        },
        {
          id: 'asili-02',
          category: 'asili',
          categoryLabel: 'Cultural',
          title: 'Minimalist Traditional Studio Session',
          subtitle: 'Indoor Photoshoot · Tsh 3,000/=',
          image: USER_PHOTOS.kangaSeated,
          imageAlt: 'Seated traditional kanga portrait in bright studio',
        },
        {
          id: 'studio-01',
          category: 'studio',
          categoryLabel: 'Studio',
          title: 'Editorial Portrait — Red Jumpsuit',
          subtitle: 'Indoor Photoshoot · Tsh 3,000/=',
          image: USER_PHOTOS.redJumpsuit,
          imageAlt: 'Woman in red jumpsuit posing against sage backdrop',
        },
        {
          id: 'studio-02',
          category: 'studio',
          categoryLabel: 'Studio',
          title: 'Moonlit Velvet Glamour Portrait',
          subtitle: 'Indoor Photoshoot · Tsh 3,000/=',
          image: USER_PHOTOS.moonlightVelvet,
          imageAlt: 'Woman in black velvet dress holding a red rose on dark studio backdrop',
        },
        {
          id: 'studio-03',
          category: 'studio',
          categoryLabel: 'Outdoor',
          title: 'Sunlit Architecture — Streetwear',
          subtitle: 'Outdoor Photoshoot · Tsh 5,000/=',
          image: USER_PHOTOS.streetBack,
          imageAlt: 'Young man in black streetwear tee in sunlit architectural space',
        },
        {
          id: 'studio-04',
          category: 'studio',
          categoryLabel: 'Studio',
          title: 'Blue Smoke Creative Session',
          subtitle: 'Indoor Photoshoot · Tsh 3,000/=',
          image: USER_PHOTOS.streetSmoke,
          imageAlt: 'Creative studio portrait with blue atmospheric lighting and smoke',
        },
        {
          id: 'studio-05',
          category: 'studio',
          categoryLabel: 'Studio',
          title: 'Spotlight Portrait — Calling Concept',
          subtitle: 'Indoor Photoshoot · Tsh 3,000/=',
          image: USER_PHOTOS.studioPhone,
          imageAlt: 'Man holding smartphone under dramatic studio spotlight',
        },
        {
          id: 'watoto-01',
          category: 'watoto',
          categoryLabel: 'Kids',
          title: 'Birthday & Kids Studio Session',
          subtitle: 'Indoor Photoshoot · Tsh 3,000/=',
          image: USER_PHOTOS.kidsBirthday,
          imageAlt: 'Young girl smiling on studio floor with red bouquet',
        },
        {
          id: 'mahafali-01',
          category: 'mahafali',
          categoryLabel: 'Graduation',
          title: 'Graduation — Palm Shadows Portrait',
          subtitle: 'Graduation Studio · Tsh 3,000/=',
          image: USER_PHOTOS.gradWoman,
          imageAlt: 'Female graduate holding cap against sunlit studio wall',
        },
        {
          id: 'mahafali-02',
          category: 'mahafali',
          categoryLabel: 'Graduation',
          title: 'Graduation — Illuminated GRAD Wall',
          subtitle: 'Graduation Studio · Tsh 3,000/=',
          image: USER_PHOTOS.gradSign,
          imageAlt: 'Male graduate standing beside backlit GRAD letters',
        },
        {
          id: 'mahafali-03',
          category: 'mahafali',
          categoryLabel: 'Graduation',
          title: 'Graduation — Classic Academic Gown',
          subtitle: 'Graduation Studio · Tsh 3,000/=',
          image: USER_PHOTOS.gradBlueGold,
          imageAlt: 'Graduate in academic gown and cap on blue-gold studio backdrop',
        },
        {
          id: 'kisheria-01',
          category: 'kisheria',
          categoryLabel: 'Legal & Documentary',
          title: 'Press Conference & Media Coverage',
          subtitle: 'Documentary & Video Production',
          image: USER_PHOTOS.pressOne,
          imageAlt: 'Speaker addressing broadcast microphones at press briefing',
        },
        {
          id: 'kisheria-02',
          category: 'kisheria',
          categoryLabel: 'Legal & Documentary',
          title: 'Official Briefing & Interview',
          subtitle: 'Documentary & Video Production',
          image: USER_PHOTOS.pressTwo,
          imageAlt: 'Speaker gesturing behind media microphones',
        },
      ],
      lightbox: {
        previous: 'Previous photo',
        next: 'Next photo',
        close: 'Close',
        bookCta: 'Book a shoot like this',
      },
    },
    services: {
      kicker: 'Our Services',
      heading: 'What We Do',
      subheading:
        'Every service can be tailored to your occasion — call us directly or message on WhatsApp.',
      askPrice: 'Ask for price',
      items: [
        {
          id: 'video',
          icon: 'video',
          title: 'Video Production',
          description:
            'Filming and editing for weddings, sendoffs, kitchen parties, commercials, and personal keepsake films.',
          waText: 'Hello EVELASTING! I would like to inquire about Video Production.',
        },
        {
          id: 'indoor',
          icon: 'indoor',
          title: 'Indoor Photoshoot',
          description:
            'Studio portraits, graduations, birthdays, kids, and fashion looks — Tsh 3,000/= per photo.',
          waText: 'Hello EVELASTING! I would like to book an Indoor Photoshoot (Tsh 3,000/= per photo).',
        },
        {
          id: 'outdoor',
          icon: 'outdoor',
          title: 'Outdoor Photoshoot',
          description:
            'On-location outdoor photography in parks, beaches, or urban settings — Tsh 5,000/= per photo.',
          waText: 'Hello EVELASTING! I would like to book an Outdoor Photoshoot (Tsh 5,000/= per photo).',
        },
        {
          id: 'harusi',
          icon: 'harusi',
          title: 'Wedding Coverage (Harusi)',
          description:
            'Complete wedding, sendoff, and kitchen party photo & video coverage from morning prep to the final dance.',
          waText: 'Hello EVELASTING! I would like a quote for Wedding Coverage.',
        },
        {
          id: 'doc',
          icon: 'doc',
          title: 'Documentary (Makala)',
          description:
            'Legal events, institutional documentaries, press conferences, and structured event storytelling.',
          waText: 'Hello EVELASTING! I would like to inquire about Documentary coverage.',
        },
        {
          id: 'drone',
          icon: 'drone',
          title: 'Drone Shooting',
          description:
            'Crisp aerial photography and 4K drone video for weddings, properties, venues, and major events.',
          waText: 'Hello EVELASTING! I would like to inquire about Drone Shooting.',
        },
        {
          id: 'design',
          icon: 'design',
          title: 'Graphics Design',
          description:
            'Custom event posters, invitation cards, brand identity, and promotional visual assets.',
          waText: 'Hello EVELASTING! I would like to inquire about Graphics Design.',
        },
      ],
    },
    pricing: {
      kicker: 'Pricing',
      heading: 'Clear Rates',
      subheading:
        'Indoor photos are Tsh 3,000/= each and Outdoor photos are Tsh 5,000/= each. Contact us for custom video and event quotes.',
      indoorTitle: 'Indoor Photoshoot',
      indoorPrice: 'Tsh 3,000/=',
      indoorUnit: 'Per Indoor photo',
      indoorNote: 'Full studio lighting, curated backdrops, and crisp color retouching.',
      outdoorTitle: 'Outdoor Photoshoot',
      outdoorPrice: 'Tsh 5,000/=',
      outdoorUnit: 'Per Outdoor photo',
      outdoorNote: 'Outdoor shoot at your preferred location with natural light & editing.',
      customTitle: 'Video, Weddings, Docs & Drone',
      customPrice: 'Custom Quote',
      customNote:
        'For Video Production, Weddings, Documentary, Drone Shooting, and Graphics Design, contact us directly.',
      customCta: 'Ask on WhatsApp',
      calcTitle: 'Estimate Your Photoshoot Cost',
      calcTypeLabel: 'Photoshoot Type',
      calcCountLabel: 'Number of Photos',
      calcTotalLabel: 'Estimated Total',
      calcWaCta: 'Book via WhatsApp',
    },
    about: {
      kicker: 'About',
      heading: 'Memories arranged with intention',
      p1: 'EVELASTING LEGAL VIDEO PRODUCTION is a photography and film studio located at Kigogo A2 Hall, Dar es Salaam. We capture and sequence weddings, graduations, studio portraits, and legal/media events so every frame holds its place.',
      p2: 'Great memories do not need many words: they need composition, lighting, and timing. That is our craft.',
      bullets: [
        'Cohesive visual storytelling across every frame',
        'Editorial lighting & color for Indoor & Outdoor shoots',
        'Legal events, Documentary films & press conferences',
        '4K Drone Shooting & Graphics Design services',
        'Kigogo A2 Hall, Dar es Salaam',
      ],
      infoRows: {
        locationLabel: 'Location',
        mapCta: 'Open on map',
        phoneLabel: 'Phone',
        waLabel: 'WhatsApp',
        waCta: 'Send message',
        hoursLabel: 'Hours',
        hoursValue: 'By appointment — call first',
        ownerLabel: 'Owner',
      },
    },
    booking: {
      kicker: 'Contact',
      heading: 'Schedule Your Session',
      subheading:
        'Call us or send your details to WhatsApp — we will reply promptly with availability and pricing.',
      quickWa: 'WhatsApp',
      quickCall: 'Call Now',
      quickMap: 'Map',
      fields: {
        nameLabel: 'Your Name *',
        namePlaceholder: 'Full name',
        phoneLabel: 'Phone Number *',
        phonePlaceholder: '0741 644 256',
        serviceLabel: 'Service Type *',
        dateLabel: 'Event Date *',
        noteLabel: 'Notes',
        notePlaceholder: 'e.g. evening wedding, number of photos, venue...',
        submitBtn: 'Send via WhatsApp',
        formNote: 'A pre-filled WhatsApp message will be prepared for you to send directly.',
      },
      serviceOptions: [
        'Indoor Photoshoot (Tsh 3,000/= per photo)',
        'Outdoor Photoshoot (Tsh 5,000/= per photo)',
        'Wedding Coverage (Harusi / Sendoff / Kitchen Party)',
        'Video Production',
        'Documentary (Makala)',
        'Drone Shooting',
        'Graphics Design',
      ],
      errors: {
        nameRequired: 'Please enter your full name.',
        phoneRequired: 'Please enter a valid phone number.',
        dateRequired: 'Please choose an event date.',
      },
      confirmation: {
        title: 'Your WhatsApp message is ready!',
        message: 'Click the button below to open WhatsApp and send your booking.',
        waOpenBtn: 'Open WhatsApp to Send',
        resetBtn: 'Create Another Request',
      },
    },
    footer: {
      menuHeading: 'Menu',
      contactHeading: 'Contact',
      rights: 'EVELASTING LEGAL VIDEO PRODUCTION. All rights reserved.',
      locationLine: 'Photography & Video · Kigogo A2 Hall, Dar es Salaam',
      ownerCredit: 'Owner & Created by',
    },
  },
};
