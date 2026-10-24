import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper/types'
import 'swiper/css'

export interface CarouselSlide {
  /** Đường dẫn ảnh trong public/ (vd. /images/carousel/ten-anh.png) */
  src: string
  /** Mô tả nội dung poster (poster có chữ nên alt nên chép lại thông điệp chính) */
  alt: string
  /** Trang đích khi bấm vào slide */
  href: string
}

interface Props {
  slides: CarouselSlide[]
  /** Thời gian giữa hai slide (ms) */
  interval?: number
}

const arrowClass =
  'absolute top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:scale-110 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 md:flex h-12 w-12 opacity-0 group-hover/hero:opacity-100 group-focus-within/hero:opacity-100'

/**
 * Carousel trang chủ dựa trên Swiper: kéo/vuốt bằng chuột và cảm ứng, bàn phím,
 * tự chạy (dừng khi rê chuột hoặc khi người dùng bật "giảm chuyển động").
 */
export default function HeroCarousel({ slides, interval = 6000 }: Props) {
  const swiperRef = useRef<SwiperInstance | null>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const count = slides.length

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(query.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  if (count === 0) return null
  const multiple = count > 1

  return (
    <section
      aria-label="Sản phẩm nổi bật"
      className="bg-gradient-to-b from-slate-100 to-white pt-3 pb-5 md:pt-6 md:pb-8"
    >
      <div className="mx-auto max-w-[1440px] px-3 sm:px-6">
        <div className="group/hero relative overflow-hidden rounded-xl bg-slate-200 shadow-xl ring-1 ring-slate-900/10 md:rounded-3xl md:shadow-2xl">
          <Swiper
            modules={[A11y, Autoplay, Keyboard]}
            onSwiper={(s) => (swiperRef.current = s)}
            onSlideChange={(s) => setActive(s.realIndex)}
            onAutoplayTimeLeft={(_, __, progress) => {
              dotsRef.current?.style.setProperty('--progress', String(1 - progress))
            }}
            onSlideChangeTransitionStart={() => dotsRef.current?.style.setProperty('--progress', '0')}
            loop={multiple}
            speed={800}
            grabCursor={multiple}
            allowTouchMove={multiple}
            keyboard={{ enabled: true }}
            autoplay={
              multiple && !reducedMotion
                ? { delay: interval, disableOnInteraction: false, pauseOnMouseEnter: true }
                : false
            }
            a11y={{
              prevSlideMessage: 'Slide trước',
              nextSlideMessage: 'Slide tiếp theo',
              slideLabelMessage: 'Slide {{index}} / {{slidesLength}}',
              containerMessage: 'Băng chuyền sản phẩm nổi bật',
            }}
            className="aspect-[16/9] w-full"
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={slide.src}>
                <Link href={slide.href} draggable={false} className="relative block h-full w-full">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={i === 0}
                    quality={85}
                    draggable={false}
                    sizes="(max-width: 1440px) 100vw, 1440px"
                    className="select-none object-cover"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {multiple && (
            <>
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Slide trước"
                className={`${arrowClass} left-4`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Slide tiếp theo"
                className={`${arrowClass} right-4`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {multiple && (
          <div
            ref={dotsRef}
            role="group"
            aria-label="Chọn slide"
            className="mt-4 flex items-center justify-center gap-2"
            style={{ ['--progress' as string]: 0 }}
          >
            {slides.map((slide, i) => {
              const isActive = i === active
              return (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  aria-label={`Chuyển tới slide ${i + 1}`}
                  aria-current={isActive}
                  className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                    isActive ? 'w-12 bg-slate-300' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 origin-left rounded-full bg-blue-700"
                      style={{ transform: reducedMotion ? 'none' : 'scaleX(var(--progress, 0))' }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
