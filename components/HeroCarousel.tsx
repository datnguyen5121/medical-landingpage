import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper/types'
import 'swiper/css'

export interface CarouselSlide {
  /** Đường dẫn ảnh trong public/ (vd. /images/carousel/laptop/ten-anh.png) */
  src: string
  /** Mô tả nội dung poster (poster có chữ nên alt nên chép lại thông điệp chính) */
  alt: string
  /** Trang đích khi bấm vào slide */
  href: string
}

interface Props {
  /** Ảnh cho màn hình laptop trở lên (từ 1024px) */
  laptopSlides: CarouselSlide[]
  /** Ảnh cho điện thoại và máy tính bảng (dưới 1024px) */
  mobileSlides: CarouselSlide[]
  /** Thời gian giữa hai slide (ms) */
  interval?: number
}

const LAPTOP_QUERY = '(min-width: 1024px)'

/**
 * Kích thước gốc (px) của poster từng bộ ảnh. Tỉ lệ khung và độ rộng tối đa được suy ra từ đây:
 * khi đổi sang poster có tỉ lệ khác, chỉ cần sửa các hằng số này. Poster không bao giờ hiển thị
 * lớn hơn kích thước gốc (để không bị mờ); phần thừa hai bên được lấp bằng ảnh phản chiếu.
 */
const LAPTOP_POSTER = { width: 1916, height: 821 } // laptop-169: poster siêu rộng ~21:9
const MOBILE_POSTER = { width: 1670, height: 941 } // mobile: poster 16:9

// Bộ ảnh đang ẩn chỉ tải bản nhỏ nhất (1px => trình duyệt chọn kích thước bé nhất trong srcset)
const LAPTOP_SIZES = `(max-width: 1023px) 1px, min(100vw, ${LAPTOP_POSTER.width}px)`
const MOBILE_SIZES = '(min-width: 1024px) 1px, 100vw'

// Chiều cao dự phòng của header khi render phía server (đo lại chính xác sau khi tải)
const FALLBACK_HEADER_HEIGHT = 164

const arrowClass =
  'absolute top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:scale-110 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 md:flex h-12 w-12 opacity-0 group-hover/hero:opacity-100 group-focus-within/hero:opacity-100'

/**
 * Hiển thị bộ ảnh phù hợp với kích thước màn hình: laptop dùng ảnh trong
 * public/images/carousel/laptop, màn hình nhỏ dùng ảnh trong public/images/carousel/mobile.
 */
export default function HeroCarousel({ laptopSlides, mobileSlides, interval = 6000 }: Props) {
  const [isLaptop, setIsLaptop] = useState<boolean | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const laptop = window.matchMedia(LAPTOP_QUERY)
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsLaptop(laptop.matches)
    setReducedMotion(motion.matches)
    const onLaptop = (e: MediaQueryListEvent) => setIsLaptop(e.matches)
    const onMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    laptop.addEventListener('change', onLaptop)
    motion.addEventListener('change', onMotion)
    return () => {
      laptop.removeEventListener('change', onLaptop)
      motion.removeEventListener('change', onMotion)
    }
  }, [])

  const autoplay = (visible: boolean) => !reducedMotion && isLaptop !== null && isLaptop === visible

  return (
    <section aria-label="Sản phẩm nổi bật" className="bg-slate-100">
      {/* CSS quyết định bộ ảnh nào hiển thị ngay từ lúc render phía server, tránh nhấp nháy */}
      <div className="hidden lg:block">
        <Track slides={laptopSlides} poster={LAPTOP_POSTER} sizes={LAPTOP_SIZES} interval={interval} autoplay={autoplay(true)} reducedMotion={reducedMotion} />
      </div>
      <div className="lg:hidden">
        <Track slides={mobileSlides} poster={MOBILE_POSTER} sizes={MOBILE_SIZES} interval={interval} autoplay={autoplay(false)} reducedMotion={reducedMotion} />
      </div>
    </section>
  )
}

interface TrackProps {
  slides: CarouselSlide[]
  poster: { width: number; height: number }
  sizes: string
  interval: number
  autoplay: boolean
  reducedMotion: boolean
}

// Mép poster được lật ngang và làm mờ dần ra hai bên: màu liền mạch với poster tại đường nối.
// Vùng mở rộng lấn vào dưới mép poster FEATHER px, mép poster mờ dần FEATHER px để không còn đường nối cứng.
const FEATHER = 64
const MIRROR_MASK = 'linear-gradient(to left, #000 12%, transparent 90%)'
const POSTER_FEATHER_MASK = `linear-gradient(to right, transparent, #000 ${FEATHER}px, #000 calc(100% - ${FEATHER}px), transparent)`

function Track({ slides, poster, sizes, interval, autoplay, reducedMotion }: TrackProps) {
  const aspect = poster.width / poster.height
  const swiperRef = useRef<SwiperInstance | null>(null)
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  // Chiều cao header sticky: khung hero cao tối đa = chiều cao màn hình trừ header, để không bị cắt đáy
  const [headerHeight, setHeaderHeight] = useState(FALLBACK_HEADER_HEIGHT)
  // true khi poster (giữ nguyên độ nét) hẹp hơn khung => cần vùng mở rộng hai bên
  const [hasSides, setHasSides] = useState(false)
  const count = slides.length

  useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const header = document.querySelector('header')
    const measure = () => {
      if (header) setHeaderHeight(Math.round(header.getBoundingClientRect().height))
      const width = frame.clientWidth
      const posterWidth = Math.min(width, frame.clientHeight * aspect)
      setHasSides(width > 0 && posterWidth < width - 2)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    if (header) observer.observe(header)
    return () => observer.disconnect()
  }, [aspect])

  // Đổi tham số autoplay sau khi Swiper đã khởi tạo không làm nó chạy lại, nên điều khiển bằng start/stop:
  // chỉ bộ ảnh đang hiển thị (và người dùng không bật "giảm chuyển động") mới tự chuyển slide
  useEffect(() => {
    if (!swiper?.autoplay) return
    if (autoplay) swiper.autoplay.start()
    else swiper.autoplay.stop()
  }, [swiper, autoplay])

  if (count === 0) return null
  const multiple = count > 1

  const maxHeight = poster.height

  return (
    <div
      ref={frameRef}
      className="group/hero relative w-full overflow-hidden bg-slate-200"
      // Tràn viền; cao theo tỉ lệ poster, không vượt cỡ gốc của ảnh và không vượt phần màn hình còn lại dưới header
      style={{ height: `min(${(100 / aspect).toFixed(3)}vw, ${maxHeight}px, calc(100svh - ${headerHeight}px))` }}
    >
      <Swiper
        modules={[A11y, Autoplay, Keyboard]}
        onSwiper={(s) => {
          swiperRef.current = s
          setSwiper(s)
        }}
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
        autoplay={multiple ? { delay: interval, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
        a11y={{
          prevSlideMessage: 'Slide trước',
          nextSlideMessage: 'Slide tiếp theo',
          slideLabelMessage: 'Slide {{index}} / {{slidesLength}}',
          containerMessage: 'Băng chuyền sản phẩm nổi bật',
        }}
        className="h-full w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.src}>
            <Link href={slide.href} draggable={false} className="relative block h-full w-full overflow-hidden">
              {/* Poster giữ nguyên độ nét, căn giữa, không phóng quá kích thước gốc */}
              <div className="relative mx-auto h-full max-w-full" style={{ aspectRatio: String(aspect) }}>
                <div
                  className="absolute inset-0 z-10"
                  style={
                    hasSides
                      ? { maskImage: POSTER_FEATHER_MASK, WebkitMaskImage: POSTER_FEATHER_MASK }
                      : undefined
                  }
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={i === 0}
                    quality={90}
                    draggable={false}
                    sizes={sizes}
                    className="select-none object-cover"
                  />
                </div>

                {hasSides &&
                  (['right-full', 'left-full'] as const).map((side) => (
                    <div
                      key={side}
                      aria-hidden="true"
                      className="pointer-events-none absolute top-0 h-full w-full"
                      style={{
                        [side === 'right-full' ? 'right' : 'left']: `calc(100% - ${FEATHER}px)`,
                        // Bên trái: mờ dần về phía trái; bên phải: lật hướng mặt nạ
                        maskImage: side === 'right-full' ? MIRROR_MASK : MIRROR_MASK.replace('to left', 'to right'),
                        WebkitMaskImage: side === 'right-full' ? MIRROR_MASK : MIRROR_MASK.replace('to left', 'to right'),
                      }}
                    >
                      <Image
                        src={slide.src}
                        alt=""
                        fill
                        quality={90}
                        draggable={false}
                        sizes={sizes}
                        className="select-none object-cover blur-2xl brightness-95 [transform:scale(-1.08,1.08)]"
                      />
                    </div>
                  ))}
              </div>
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

          {/* Chấm điều hướng nằm trên ảnh (đáy, giữa) để không tốn thêm chiều cao dưới ảnh */}
          <div
            ref={dotsRef}
            role="group"
            aria-label="Chọn slide"
            className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900/35 px-3 py-2 backdrop-blur-sm"
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
                  className={`relative h-2 overflow-hidden rounded-full bg-white/45 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    isActive ? 'w-10' : 'w-2 hover:bg-white/70'
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 origin-left rounded-full bg-white"
                      style={{ transform: reducedMotion ? 'none' : 'scaleX(var(--progress, 0))' }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
