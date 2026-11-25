import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import type {
  GalleryCategory,
  LocalizedStudioCopy,
  PortfolioPhoto,
} from '../data/portfolio';
import { ImageWithFallback } from './ImageWithFallback';

interface MediaLightboxModalProps {
  item: PortfolioPhoto | null;
  items: PortfolioPhoto[];
  labels: LocalizedStudioCopy['gallery']['lightbox'];
  onClose: () => void;
  onSelectItem: (item: PortfolioPhoto) => void;
  onBookSimilar: (category: Exclude<GalleryCategory, 'all'>) => void;
}

export function MediaLightboxModal({
  item,
  items,
  labels,
  onClose,
  onSelectItem,
  onBookSimilar,
}: MediaLightboxModalProps) {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;

  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && items.length > 1) {
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        onSelectItem(items[prevIndex]);
      } else if (event.key === 'ArrowRight' && items.length > 1) {
        const nextIndex = (currentIndex + 1) % items.length;
        onSelectItem(items[nextIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items, currentIndex, onClose, onSelectItem]);

  if (!item) return null;

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onSelectItem(items[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    onSelectItem(items[nextIndex]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#060608]/95 p-4 sm:p-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-4xl max-h-[92vh] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e12] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#a49b8d]">
            <span className="font-semibold text-[#e3b25e]">{item.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{item.subtitle}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">
              {currentIndex + 1} / {items.length}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label={labels.previous}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#f6f1e8] transition-colors hover:border-[#e3b25e]/50 hover:bg-[#e3b25e]/15"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label={labels.next}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#f6f1e8] transition-colors hover:border-[#e3b25e]/50 hover:bg-[#e3b25e]/15"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label={labels.close}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#f6f1e8] transition-colors hover:border-[#e3b25e]/50 hover:bg-[#e3b25e]/15"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black p-2">
            <ImageWithFallback
              src={item.image}
              alt={item.imageAlt}
              fallbackLabel={item.title}
              className="max-h-[66vh] w-auto rounded-lg object-contain"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
            <div className="space-y-1">
              <h3 id="lightbox-title" className="text-xl font-semibold text-[#f6f1e8]">
                {item.title}
              </h3>
              <p className="text-xs text-[#a49b8d]">{item.subtitle}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onBookSimilar(item.category)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#e3b25e] px-5 py-2.5 text-sm font-semibold text-[#151006] transition-colors hover:bg-[#f0c67a] whitespace-nowrap shrink-0"
              >
                <span>{labels.bookCta}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-[#f6f1e8] transition-colors hover:bg-white/10 whitespace-nowrap shrink-0"
              >
                {labels.close}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
