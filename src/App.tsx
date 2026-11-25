import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  Film,
  HeartHandshake,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Palette,
  Phone,
  Plane,
  Plus,
  Scale,
  Sun,
  User,
  X,
} from 'lucide-react';
import { ImageWithFallback } from './components/ImageWithFallback';
import { MediaLightboxModal } from './components/MediaLightboxModal';
import {
  STUDIO_CONTACT,
  STUDIO_COPY,
  USER_PHOTOS,
  type GalleryCategory,
  type Language,
  type PortfolioPhoto,
  type ServiceItem,
} from './data/portfolio';

interface BookingErrors {
  name?: string;
  phone?: string;
  date?: string;
}

interface PreparedBooking {
  name: string;
  phone: string;
  service: string;
  date: string;
  note: string;
  whatsappUrl: string;
}

function renderServiceIcon(icon: ServiceItem['icon']) {
  const cls = 'h-6 w-6 text-[#e3b25e]';
  switch (icon) {
    case 'video':
      return <Film className={cls} strokeWidth={1.5} />;
    case 'indoor':
      return <Camera className={cls} strokeWidth={1.5} />;
    case 'outdoor':
      return <Sun className={cls} strokeWidth={1.5} />;
    case 'harusi':
      return <HeartHandshake className={cls} strokeWidth={1.5} />;
    case 'doc':
      return <Scale className={cls} strokeWidth={1.5} />;
    case 'drone':
      return <Plane className={cls} strokeWidth={1.5} />;
    case 'design':
      return <Palette className={cls} strokeWidth={1.5} />;
  }
}

export default function App() {
  const [lang, setLang] = useState<Language>('sw');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('all');
  const [lightboxItem, setLightboxItem] = useState<PortfolioPhoto | null>(null);

  // Interactive photo cost estimator
  const [calcType, setCalcType] = useState<'indoor' | 'outdoor'>('indoor');
  const [photoCount, setPhotoCount] = useState<number>(10);

  // Booking form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(
    STUDIO_COPY.sw.booking.serviceOptions[0]
  );
  const [eventDate, setEventDate] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<BookingErrors>({});
  const [prepared, setPrepared] = useState<PreparedBooking | null>(null);

  const t = STUDIO_COPY[lang];

  const filteredPhotos =
    activeFilter === 'all'
      ? t.gallery.items
      : t.gallery.items.filter((item) => item.category === activeFilter);

  const unitPrice = calcType === 'indoor' ? 3000 : 5000;
  const totalCost = unitPrice * photoCount;
  const formattedTotal = `Tsh ${totalCost.toLocaleString('en-US')}/=`;

  const calcWhatsappUrl = `${STUDIO_CONTACT.whatsappBase}?text=${encodeURIComponent(
    lang === 'sw'
      ? `Habari ${STUDIO_CONTACT.brandFull}! Nahitaji ${
          calcType === 'indoor' ? 'Indoor Photoshoot' : 'Outdoor Photoshoot'
        } ya picha ${photoCount} (${formattedTotal}).`
      : `Hello ${STUDIO_CONTACT.brandFull}! I would like to book an ${
          calcType === 'indoor' ? 'Indoor Photoshoot' : 'Outdoor Photoshoot'
        } for ${photoCount} photos (${formattedTotal}).`
  )}`;

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLanguageChange = (nextLang: Language) => {
    setLang(nextLang);
    setSelectedService(STUDIO_COPY[nextLang].booking.serviceOptions[0]);
  };

  const handleBookSimilar = (category: Exclude<GalleryCategory, 'all'>) => {
    setLightboxItem(null);
    if (category === 'harusi') {
      setSelectedService(t.booking.serviceOptions[2]);
    } else if (category === 'kisheria') {
      setSelectedService(t.booking.serviceOptions[4]);
    } else {
      setSelectedService(t.booking.serviceOptions[0]);
    }
    setPrepared(null);
    scrollToSection('wasiliana');
  };

  const validateForm = (): BookingErrors => {
    const nextErrors: BookingErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = t.booking.errors.nameRequired;
    }
    const digits = phone.replace(/\D/g, '').length;
    if (digits < 9) {
      nextErrors.phone = t.booking.errors.phoneRequired;
    }
    if (!eventDate) {
      nextErrors.date = t.booking.errors.dateRequired;
    }
    return nextErrors;
  };

  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanNote = note.trim();

    const messageLines = [
      `Habari ${STUDIO_CONTACT.brandFull}!`,
      '',
      `Jina: ${cleanName}`,
      `Simu: ${cleanPhone}`,
      `Aina ya kipindi: ${selectedService}`,
      `Tarehe: ${eventDate}`,
      cleanNote ? `Maelezo: ${cleanNote}` : '',
      '',
      'Ningependa kujua upatikanaji. Asante!',
    ]
      .filter(Boolean)
      .join('\n');

    setErrors({});
    setPrepared({
      name: cleanName,
      phone: cleanPhone,
      service: selectedService,
      date: eventDate,
      note: cleanNote,
      whatsappUrl: `${STUDIO_CONTACT.whatsappBase}?text=${encodeURIComponent(messageLines)}`,
    });
  };

  const handleReset = () => {
    setPrepared(null);
    setName('');
    setPhone('');
    setEventDate('');
    setNote('');
    setErrors({});
  };

  return (
    <div className="min-h-screen text-[#f6f1e8]">
      {/* Strict 3-Zone Top Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0c]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Zone 1: Clean single-line Brand Wordmark */}
          <a
            href="#top"
            className="font-display text-xl font-bold tracking-[0.18em] text-[#f6f1e8] whitespace-nowrap shrink-0"
          >
            {STUDIO_CONTACT.brandShort}
          </a>

          {/* Zone 2: 5 concise single-line nav links */}
          <nav
            aria-label="Menyu kuu"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#d3cabc]"
          >
            <a
              href="#kazi"
              className="hover:text-white hover:underline decoration-[#e3b25e] underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.gallery}
            </a>
            <a
              href="#huduma"
              className="hover:text-white hover:underline decoration-[#e3b25e] underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.services}
            </a>
            <a
              href="#bei"
              className="hover:text-white hover:underline decoration-[#e3b25e] underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.pricing}
            </a>
            <a
              href="#kuhusu"
              className="hover:text-white hover:underline decoration-[#e3b25e] underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.about}
            </a>
            <a
              href="#wasiliana"
              className="hover:text-white hover:underline decoration-[#e3b25e] underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={STUDIO_CONTACT.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg border border-[#e3b25e]/45 px-4 py-2 text-xs font-semibold text-[#e3b25e] transition-colors hover:bg-[#e3b25e] hover:text-[#151006] whitespace-nowrap shrink-0"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="font-mono tabular-nums">{STUDIO_CONTACT.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[#f6f1e8] md:hidden"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-white/10 bg-[#0e0e12] px-4 py-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              <a
                href="#kazi"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#d3cabc] hover:bg-white/5 hover:text-white"
              >
                {t.nav.gallery}
              </a>
              <a
                href="#huduma"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#d3cabc] hover:bg-white/5 hover:text-white"
              >
                {t.nav.services}
              </a>
              <a
                href="#bei"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#d3cabc] hover:bg-white/5 hover:text-white"
              >
                {t.nav.pricing}
              </a>
              <a
                href="#kuhusu"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#d3cabc] hover:bg-white/5 hover:text-white"
              >
                {t.nav.about}
              </a>
              <a
                href="#wasiliana"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#d3cabc] hover:bg-white/5 hover:text-white"
              >
                {t.nav.contact}
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero Split + 3-Frame Editorial Collage */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-20">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#e3b25e]/45 bg-[#14141a]">
                <ImageWithFallback
                  src={USER_PHOTOS.profileAvatar}
                  alt="EVELASTING — Canon EOS R5 Studio Profile"
                  fallbackLabel={STUDIO_CONTACT.brandShort}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-xs font-semibold tracking-wide text-[#e3b25e]">
                {t.hero.kicker}
              </p>
            </div>

            <div
              role="group"
              aria-label="Language switcher"
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1"
            >
              <button
                type="button"
                onClick={() => handleLanguageChange('sw')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  lang === 'sw'
                    ? 'bg-[#e3b25e] text-[#151006] font-semibold'
                    : 'text-[#a49b8d] hover:text-[#f6f1e8]'
                }`}
              >
                Kiswahili
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  lang === 'en'
                    ? 'bg-[#e3b25e] text-[#151006] font-semibold'
                    : 'text-[#a49b8d] hover:text-[#f6f1e8]'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Text Column */}
            <div className="flex flex-col justify-between space-y-8 lg:col-span-6">
              <div>
                <h1
                  style={{ fontSize: 'clamp(2.5rem, 4.8vw, 4.25rem)' }}
                  className="font-semibold leading-[1] tracking-[0.04em] text-[#f6f1e8] text-balance"
                >
                  {t.hero.title}
                </h1>
                <p className="mt-3 text-xs font-semibold tracking-[0.38em] text-[#a49b8d]">
                  {t.hero.subtitle}
                </p>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-[#d3cabc]">
                  {t.hero.lead}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href={`${STUDIO_CONTACT.whatsappBase}?text=${encodeURIComponent(
                    `Habari ${STUDIO_CONTACT.brandFull}! Ningependa kupanga kipindi.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#f0c67a] to-[#dca646] px-6 py-3.5 text-sm font-semibold text-[#1a1205] shadow-lg shadow-[#e3b25e]/15 transition-transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{t.hero.ctaPrimary}</span>
                </a>
                <a
                  href="#kazi"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-[#f6f1e8] transition-colors hover:border-[#e3b25e]/50 hover:bg-white/[0.06] whitespace-nowrap shrink-0"
                >
                  <span>{t.hero.ctaSecondary}</span>
                </a>
              </div>
            </div>

            {/* Right 3-Frame Art Collage (exact signature hero structure) */}
            <div className="lg:col-span-6">
              <div className="grid h-[420px] grid-cols-[1.06fr_0.94fr] grid-rows-2 gap-3.5 sm:h-[520px]">
                <button
                  type="button"
                  onClick={() => setLightboxItem(t.gallery.items[0])}
                  className="group row-span-2 overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl text-left"
                >
                  <ImageWithFallback
                    src={USER_PHOTOS.weddingCert}
                    alt={t.gallery.items[0].imageAlt}
                    fallbackLabel="Harusi"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxItem(t.gallery.items[13])}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl text-left"
                >
                  <ImageWithFallback
                    src={USER_PHOTOS.pressOne}
                    alt={t.gallery.items[13].imageAlt}
                    fallbackLabel="Kisheria & Makala"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxItem(t.gallery.items[2])}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl text-left"
                >
                  <ImageWithFallback
                    src={USER_PHOTOS.kangaCalabash}
                    alt={t.gallery.items[2].imageAlt}
                    fallbackLabel="Asili & Studio"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 4-column hero meta strip below split */}
          <div className="mt-12 grid grid-cols-2 gap-6 border-y border-white/10 py-6 lg:grid-cols-4 lg:gap-8">
            {t.hero.meta.map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="text-xs font-semibold text-[#8c857a]">{item.label}</p>
                <p className="font-mono text-sm font-medium text-[#e3b25e] tabular-nums sm:text-base">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3-Column Masonry Gallery (All 15 User Photos) */}
        <section id="kazi" className="border-t border-white/5 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-xl space-y-2">
                <p className="text-xs font-semibold tracking-[0.22em] text-[#e3b25e]">
                  {t.gallery.kicker}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-[#f6f1e8] sm:text-4xl">
                  {t.gallery.heading}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#a49b8d]">
                {t.gallery.subheading}
              </p>
            </div>

            {/* Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter portfolio"
              className="mb-8 flex flex-wrap items-center gap-2"
            >
              {t.gallery.filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-lg border px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    activeFilter === filter.id
                      ? 'border-[#e3b25e] bg-[#e3b25e] text-[#151006]'
                      : 'border-white/10 bg-transparent text-[#c9c0b3] hover:border-[#e3b25e]/45 hover:text-[#f6f1e8]'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Masonry Columns */}
            <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
              {filteredPhotos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setLightboxItem(photo)}
                  className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-[#14141a] text-left shadow-xl transition-colors hover:border-[#e3b25e]/45"
                >
                  <ImageWithFallback
                    src={photo.image}
                    alt={photo.imageAlt}
                    fallbackLabel={photo.title}
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/90 via-[#060608]/15 to-transparent opacity-90 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100" />

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:translate-y-2 sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                    <p className="text-xs font-semibold text-[#e3b25e]">{photo.categoryLabel}</p>
                    <h3 className="mt-1 text-lg font-semibold leading-snug text-[#f6f1e8]">
                      {photo.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* All 7 Services Section */}
        <section
          id="huduma"
          className="border-t border-white/5 bg-white/[0.015] py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-xl space-y-2">
                <p className="text-xs font-semibold tracking-[0.22em] text-[#e3b25e]">
                  {t.services.kicker}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-[#f6f1e8] sm:text-4xl">
                  {t.services.heading}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#a49b8d]">
                {t.services.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.services.items.map((service, idx) => (
                <article
                  key={service.id}
                  className={`flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-6 transition-colors hover:border-[#e3b25e]/40 ${
                    idx === 6 ? 'sm:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <div className="space-y-3">
                    {renderServiceIcon(service.icon)}
                    <h3 className="text-xl font-semibold text-[#f6f1e8]">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-[#a49b8d]">
                      {service.description}
                    </p>
                  </div>

                  <a
                    href={`${STUDIO_CONTACT.whatsappBase}?text=${encodeURIComponent(service.waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 self-start border-b border-[#e3b25e]/40 pb-0.5 text-xs font-semibold text-[#e3b25e] transition-colors hover:border-white hover:text-white whitespace-nowrap shrink-0"
                  >
                    <span>{t.services.askPrice}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Transparent Pricing & Interactive Estimator */}
        <section id="bei" className="border-t border-white/5 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-xl space-y-2">
                <p className="text-xs font-semibold tracking-[0.22em] text-[#e3b25e]">
                  {t.pricing.kicker}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-[#f6f1e8] sm:text-4xl">
                  {t.pricing.heading}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#a49b8d]">
                {t.pricing.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#14141a] p-6 sm:p-7">
                <div>
                  <h3 className="text-xl font-semibold text-[#f6f1e8]">
                    {t.pricing.indoorTitle}
                  </h3>
                  <p className="mt-3 font-mono text-2xl font-medium text-[#e3b25e] tabular-nums sm:text-3xl">
                    {t.pricing.indoorPrice}
                  </p>
                  <p className="mt-1 text-xs text-[#a49b8d]">{t.pricing.indoorUnit}</p>
                  <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-[#d3cabc]">
                    {t.pricing.indoorNote}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCalcType('indoor');
                    setSelectedService(t.booking.serviceOptions[0]);
                    scrollToSection('wasiliana');
                  }}
                  className="mt-6 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-[#f6f1e8] transition-colors hover:border-[#e3b25e]/50 whitespace-nowrap shrink-0"
                >
                  {t.hero.ctaPrimary}
                </button>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-[#e3b25e]/55 bg-[#14141a] p-6 sm:p-7">
                <div>
                  <h3 className="text-xl font-semibold text-[#f6f1e8]">
                    {t.pricing.outdoorTitle}
                  </h3>
                  <p className="mt-3 font-mono text-2xl font-medium text-[#e3b25e] tabular-nums sm:text-3xl">
                    {t.pricing.outdoorPrice}
                  </p>
                  <p className="mt-1 text-xs text-[#a49b8d]">{t.pricing.outdoorUnit}</p>
                  <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-[#d3cabc]">
                    {t.pricing.outdoorNote}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCalcType('outdoor');
                    setSelectedService(t.booking.serviceOptions[1]);
                    scrollToSection('wasiliana');
                  }}
                  className="mt-6 w-full rounded-xl bg-gradient-to-b from-[#f0c67a] to-[#dca646] px-4 py-2.5 text-sm font-semibold text-[#1a1205] transition-opacity hover:opacity-95 whitespace-nowrap shrink-0"
                >
                  {t.hero.ctaPrimary}
                </button>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#14141a] p-6 sm:p-7">
                <div>
                  <h3 className="text-xl font-semibold text-[#f6f1e8]">
                    {t.pricing.customTitle}
                  </h3>
                  <p className="mt-3 font-display text-2xl font-semibold text-[#f6f1e8] sm:text-3xl">
                    {t.pricing.customPrice}
                  </p>
                  <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-[#d3cabc]">
                    {t.pricing.customNote}
                  </p>
                </div>
                <a
                  href={STUDIO_CONTACT.whatsappBase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-[#e3b25e] transition-colors hover:border-[#e3b25e]/50 whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{t.pricing.customCta}</span>
                </a>
              </div>
            </div>

            {/* Interactive Estimator */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-[#14141a] p-6 sm:p-8">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-7">
                  <h3 className="text-xl font-semibold text-[#f6f1e8]">{t.pricing.calcTitle}</h3>
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="space-y-2">
                      <p className="text-xs text-[#a49b8d]">{t.pricing.calcTypeLabel}</p>
                      <div className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-[#0a0a0c] p-1">
                        <button
                          type="button"
                          onClick={() => setCalcType('indoor')}
                          className={`rounded-md px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                            calcType === 'indoor'
                              ? 'bg-[#e3b25e] text-[#151006] font-semibold'
                              : 'text-[#a49b8d] hover:text-white'
                          }`}
                        >
                          Indoor (Tsh 3,000)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCalcType('outdoor')}
                          className={`rounded-md px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                            calcType === 'outdoor'
                              ? 'bg-[#e3b25e] text-[#151006] font-semibold'
                              : 'text-[#a49b8d] hover:text-white'
                          }`}
                        >
                          Outdoor (Tsh 5,000)
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-[#a49b8d]">{t.pricing.calcCountLabel}</p>
                      <div className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-[#0a0a0c] px-2 py-1">
                        <button
                          type="button"
                          onClick={() => setPhotoCount((prev) => Math.max(1, prev - 1))}
                          aria-label="Decrease photos"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#d3cabc] hover:bg-white/10"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[2.5rem] text-center font-mono text-sm font-semibold text-[#f6f1e8] tabular-nums">
                          {photoCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setPhotoCount((prev) => Math.min(200, prev + 1))}
                          aria-label="Increase photos"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#d3cabc] hover:bg-white/10"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                  <div>
                    <p className="text-xs text-[#a49b8d]">{t.pricing.calcTotalLabel}</p>
                    <p className="mt-1 font-mono text-2xl font-semibold text-[#e3b25e] tabular-nums sm:text-3xl">
                      {formattedTotal}
                    </p>
                  </div>
                  <a
                    href={calcWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#e3b25e] px-5 py-3 text-sm font-semibold text-[#151006] transition-colors hover:bg-[#f0c67a] whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{t.pricing.calcWaCta}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About & Studio Info Card */}
        <section
          id="kuhusu"
          className="border-t border-white/5 bg-white/[0.015] py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="space-y-5 lg:col-span-6">
                <p className="text-xs font-semibold tracking-[0.22em] text-[#e3b25e]">
                  {t.about.kicker}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-[#f6f1e8] sm:text-4xl">
                  {t.about.heading}
                </h2>
                <p className="text-sm leading-relaxed text-[#c3bab0] sm:text-base">
                  {t.about.p1}
                </p>
                <p className="text-sm leading-relaxed text-[#c3bab0] sm:text-base">
                  {t.about.p2}
                </p>

                <ul className="space-y-3 pt-2">
                  {t.about.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm text-[#d7cec2]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#e3b25e]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] px-6 py-3 shadow-2xl lg:col-span-6">
                <div className="flex items-center gap-4 border-b border-white/10 py-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#e3b25e]/45 bg-[#14141a]">
                    <ImageWithFallback
                      src={USER_PHOTOS.profileAvatar}
                      alt="EVELASTING Studio Profile"
                      fallbackLabel={STUDIO_CONTACT.brandShort}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display text-xl font-semibold tracking-wide text-[#f6f1e8]">
                      {STUDIO_CONTACT.brandShort}
                    </p>
                    <p className="text-xs text-[#e3b25e]">Legal Video Production</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b border-white/10 py-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#e3b25e]" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs font-semibold text-[#8c857a]">
                      {t.about.infoRows.locationLabel}
                    </p>
                    <p className="mt-0.5 text-sm text-[#f6f1e8]">{STUDIO_CONTACT.location}</p>
                    <a
                      href={STUDIO_CONTACT.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#e3b25e] hover:underline underline-offset-4"
                    >
                      <span>{t.about.infoRows.mapCta}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b border-white/10 py-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#e3b25e]" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs font-semibold text-[#8c857a]">
                      {t.about.infoRows.phoneLabel}
                    </p>
                    <a
                      href={STUDIO_CONTACT.phoneHref}
                      className="mt-0.5 block font-mono text-sm text-[#f6f1e8] tabular-nums hover:text-[#e3b25e]"
                    >
                      {STUDIO_CONTACT.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b border-white/10 py-4">
                  <MessageCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#e3b25e]"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#8c857a]">
                      {t.about.infoRows.waLabel}
                    </p>
                    <a
                      href={STUDIO_CONTACT.whatsappBase}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-block border-b border-[#e3b25e]/45 text-sm text-[#f6f1e8] hover:text-[#e3b25e]"
                    >
                      {t.about.infoRows.waCta}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#e3b25e]" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs font-semibold text-[#8c857a]">
                      {t.about.infoRows.hoursLabel}
                    </p>
                    <p className="mt-0.5 text-sm text-[#f6f1e8]">
                      {t.about.infoRows.hoursValue}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="wasiliana" className="border-t border-white/5 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
              <div className="space-y-5 lg:col-span-5">
                <p className="text-xs font-semibold tracking-[0.22em] text-[#e3b25e]">
                  {t.booking.kicker}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-[#f6f1e8] sm:text-4xl">
                  {t.booking.heading}
                </h2>
                <p className="text-sm leading-relaxed text-[#c3bab0] sm:text-base">
                  {t.booking.subheading}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={`${STUDIO_CONTACT.whatsappBase}?text=${encodeURIComponent(
                      `Habari ${STUDIO_CONTACT.brandFull}! Ningependa kupanga kipindi.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#25d366]/45 px-4 py-2.5 text-xs font-semibold text-[#7ee2a5] transition-colors hover:bg-[#25d366]/10 whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{t.booking.quickWa}</span>
                  </a>
                  <a
                    href={STUDIO_CONTACT.phoneHref}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-semibold text-[#d9d0c4] transition-colors hover:border-[#e3b25e]/45 hover:text-white whitespace-nowrap shrink-0"
                  >
                    <Phone className="h-4 w-4 text-[#e3b25e]" />
                    <span>{t.booking.quickCall}</span>
                  </a>
                  <a
                    href={STUDIO_CONTACT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-semibold text-[#d9d0c4] transition-colors hover:border-[#e3b25e]/45 hover:text-white whitespace-nowrap shrink-0"
                  >
                    <MapPin className="h-4 w-4 text-[#e3b25e]" />
                    <span>{t.booking.quickMap}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7">
                {prepared ? (
                  <div className="rounded-2xl border border-white/10 bg-[#14141a] p-6 sm:p-8 space-y-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#e3b25e]" />
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold text-[#f6f1e8]">
                          {t.booking.confirmation.title}
                        </h3>
                        <p className="text-sm text-[#a49b8d]">{t.booking.confirmation.message}</p>
                      </div>
                    </div>

                    <dl className="grid grid-cols-1 gap-3 border-t border-white/10 pt-5 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="text-xs text-[#8c857a]">{t.booking.fields.nameLabel}</dt>
                        <dd className="font-medium text-[#f6f1e8]">{prepared.name}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-[#8c857a]">{t.booking.fields.phoneLabel}</dt>
                        <dd className="font-mono font-medium text-[#f6f1e8] tabular-nums">
                          {prepared.phone}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-[#8c857a]">{t.booking.fields.serviceLabel}</dt>
                        <dd className="font-medium text-[#e3b25e]">{prepared.service}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-[#8c857a]">{t.booking.fields.dateLabel}</dt>
                        <dd className="font-mono font-medium text-[#f6f1e8] tabular-nums">
                          {prepared.date}
                        </dd>
                      </div>
                    </dl>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={prepared.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#f0c67a] to-[#dca646] px-6 py-3 text-sm font-semibold text-[#1a1205] whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>{t.booking.confirmation.waOpenBtn}</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-[#f6f1e8] hover:bg-white/10 whitespace-nowrap shrink-0"
                      >
                        {t.booking.confirmation.resetBtn}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleBookingSubmit}
                    noValidate
                    className="grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-6 sm:grid-cols-2"
                  >
                    <div>
                      <label
                        htmlFor="f-name"
                        className="mb-1.5 block text-xs font-semibold text-[#a49b8d]"
                      >
                        {t.booking.fields.nameLabel}
                      </label>
                      <input
                        id="f-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder={t.booking.fields.namePlaceholder}
                        aria-invalid={Boolean(errors.name)}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm text-[#f6f1e8] placeholder:text-[#7d766c] focus:border-[#e3b25e]/60 focus:outline-none"
                      />
                      {errors.name && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="f-phone"
                        className="mb-1.5 block text-xs font-semibold text-[#a49b8d]"
                      >
                        {t.booking.fields.phoneLabel}
                      </label>
                      <input
                        id="f-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder={t.booking.fields.phonePlaceholder}
                        aria-invalid={Boolean(errors.phone)}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm text-[#f6f1e8] placeholder:text-[#7d766c] focus:border-[#e3b25e]/60 focus:outline-none"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="f-service"
                        className="mb-1.5 block text-xs font-semibold text-[#a49b8d]"
                      >
                        {t.booking.fields.serviceLabel}
                      </label>
                      <select
                        id="f-service"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#14141a] px-3.5 py-3 text-sm text-[#f6f1e8] focus:border-[#e3b25e]/60 focus:outline-none"
                      >
                        {t.booking.serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="f-date"
                        className="mb-1.5 block text-xs font-semibold text-[#a49b8d]"
                      >
                        {t.booking.fields.dateLabel}
                      </label>
                      <input
                        id="f-date"
                        type="date"
                        value={eventDate}
                        onChange={(e) => {
                          setEventDate(e.target.value);
                          if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
                        }}
                        aria-invalid={Boolean(errors.date)}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm text-[#f6f1e8] focus:border-[#e3b25e]/60 focus:outline-none [color-scheme:dark]"
                      />
                      {errors.date && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.date}</span>
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="f-note"
                        className="mb-1.5 block text-xs font-semibold text-[#a49b8d]"
                      >
                        {t.booking.fields.noteLabel}
                      </label>
                      <textarea
                        id="f-note"
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder={t.booking.fields.notePlaceholder}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm text-[#f6f1e8] placeholder:text-[#7d766c] focus:border-[#e3b25e]/60 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="sm:col-span-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#f0c67a] to-[#dca646] px-6 py-3.5 text-sm font-semibold text-[#1a1205] shadow-lg shadow-[#e3b25e]/15 transition-opacity hover:opacity-95 whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>{t.booking.fields.submitBtn}</span>
                    </button>

                    <p className="sm:col-span-2 text-xs text-[#7d766c]">
                      {t.booking.fields.formNote}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with Owner / Created by Rahmani */}
      <footer className="border-t border-white/10 bg-[#08080a] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div className="flex items-center gap-3.5">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#e3b25e]/40 bg-[#14141a]">
                <ImageWithFallback
                  src={USER_PHOTOS.profileAvatar}
                  alt={STUDIO_CONTACT.brandFull}
                  fallbackLabel={STUDIO_CONTACT.brandShort}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-display text-xl font-semibold tracking-[0.16em] text-[#f6f1e8]">
                  {STUDIO_CONTACT.brandShort}
                </p>
                <p className="text-xs tracking-[0.26em] text-[#a49b8d]">
                  LEGAL VIDEO PRODUCTION
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm text-[#b9b0a3]">
              <p className="text-xs font-semibold text-[#7d766c]">{t.footer.menuHeading}</p>
              <a href="#kazi" className="hover:text-[#e3b25e]">
                {t.nav.gallery}
              </a>
              <a href="#huduma" className="hover:text-[#e3b25e]">
                {t.nav.services}
              </a>
              <a href="#bei" className="hover:text-[#e3b25e]">
                {t.nav.pricing}
              </a>
              <a href="#kuhusu" className="hover:text-[#e3b25e]">
                {t.nav.about}
              </a>
            </div>

            <div className="flex flex-col gap-2 text-sm text-[#b9b0a3]">
              <p className="text-xs font-semibold text-[#7d766c]">{t.footer.contactHeading}</p>
              <a
                href={STUDIO_CONTACT.phoneHref}
                className="font-mono tabular-nums hover:text-[#e3b25e]"
              >
                {STUDIO_CONTACT.phoneDisplay}
              </a>
              <a
                href={STUDIO_CONTACT.whatsappBase}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e3b25e]"
              >
                WhatsApp
              </a>
              <span>{STUDIO_CONTACT.location}</span>
              <span className="inline-flex items-center gap-1.5 text-[#e3b25e]">
                <User className="h-3.5 w-3.5" />
                <span>
                  {t.about.infoRows.ownerLabel}: {STUDIO_CONTACT.owner}
                </span>
              </span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs text-[#7d766c]">
            <span>© 2026 {t.footer.rights}</span>
            <span>{t.footer.locationLine}</span>
            <span>
              {t.footer.ownerCredit}{' '}
              <strong className="font-semibold text-[#e3b25e]">
                {STUDIO_CONTACT.owner}
              </strong>
            </span>
          </div>
        </div>
      </footer>

      <MediaLightboxModal
        item={lightboxItem}
        items={filteredPhotos}
        labels={t.gallery.lightbox}
        onClose={() => setLightboxItem(null)}
        onSelectItem={(item) => setLightboxItem(item)}
        onBookSimilar={handleBookSimilar}
      />
    </div>
  );
}
