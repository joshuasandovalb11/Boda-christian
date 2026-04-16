import { useRef } from 'react'
import CountdownTimer from '../components/CountdownTimer'
import RSVPForm from '../components/RSVPForm'
import GoalsBar from '../components/GoalsBar'
import warmPortrait from '../assets/image3.jpeg'
import darkPortrait from '../assets/image2.jpeg'

function WallCascade({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 420" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M44 8 C48 92, 56 168, 64 240 C70 300, 74 360, 78 412" />
        <path d="M62 136 C86 122, 102 100, 114 80" />
        <path d="M66 210 C94 208, 122 194, 140 172" />
        <path d="M72 286 C98 300, 118 320, 132 344" />
      </g>
      <g fill="currentColor" opacity="0.28">
        <ellipse cx="88" cy="114" rx="14" ry="6" transform="rotate(-28 88 114)" />
        <ellipse cx="106" cy="94" rx="13" ry="5" transform="rotate(-42 106 94)" />
        <ellipse cx="104" cy="214" rx="14" ry="6" transform="rotate(-8 104 214)" />
        <ellipse cx="128" cy="194" rx="14" ry="6" transform="rotate(-30 128 194)" />
        <ellipse cx="108" cy="318" rx="14" ry="6" transform="rotate(22 108 318)" />
        <ellipse cx="128" cy="336" rx="14" ry="6" transform="rotate(36 128 336)" />
      </g>
      <g fill="currentColor" opacity="0.45">
        <circle cx="120" cy="76" r="3.5" />
        <circle cx="126" cy="84" r="3" />
        <circle cx="144" cy="168" r="3.5" />
        <circle cx="152" cy="178" r="3" />
        <circle cx="142" cy="348" r="3.2" />
      </g>
    </svg>
  )
}

function WallTopBranch({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 130" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M8 28 C76 34, 132 56, 206 82 C252 98, 300 108, 352 112" />
        <path d="M122 62 C138 54, 150 42, 162 26" />
        <path d="M198 84 C218 76, 238 64, 252 46" />
      </g>
      <g fill="currentColor" opacity="0.26">
        <ellipse cx="118" cy="64" rx="13" ry="5" transform="rotate(-18 118 64)" />
        <ellipse cx="144" cy="48" rx="13" ry="5" transform="rotate(-35 144 48)" />
        <ellipse cx="202" cy="84" rx="13" ry="5" transform="rotate(-8 202 84)" />
        <ellipse cx="226" cy="72" rx="13" ry="5" transform="rotate(-30 226 72)" />
      </g>
    </svg>
  )
}

function WallBouquet({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M26 200 C56 150, 90 112, 130 78" />
        <path d="M72 194 C90 156, 114 124, 152 96" />
      </g>
      <g fill="currentColor" opacity="0.3">
        <circle cx="136" cy="74" r="8" />
        <circle cx="154" cy="94" r="7" />
        <circle cx="114" cy="98" r="7" />
        <circle cx="170" cy="116" r="6" />
        <ellipse cx="104" cy="144" rx="14" ry="6" transform="rotate(20 104 144)" />
        <ellipse cx="134" cy="132" rx="14" ry="6" transform="rotate(-12 134 132)" />
      </g>
    </svg>
  )
}

function WallSprig({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 280" className={className} aria-hidden="true">
      <path d="M22 270 C30 212, 42 156, 64 104 C78 72, 96 42, 118 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <g fill="currentColor" opacity="0.33">
        <ellipse cx="66" cy="106" rx="12" ry="5" transform="rotate(-20 66 106)" />
        <ellipse cx="82" cy="86" rx="12" ry="5" transform="rotate(-34 82 86)" />
        <ellipse cx="90" cy="152" rx="12" ry="5" transform="rotate(16 90 152)" />
        <ellipse cx="102" cy="170" rx="12" ry="5" transform="rotate(28 102 170)" />
      </g>
    </svg>
  )
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 my-10">
      <div className="h-px w-16 sm:w-24 bg-lino/60" />
      <svg viewBox="0 0 20 20" className="w-4 h-4 text-dorado/70" fill="currentColor" aria-hidden="true">
        <path d="M10 2C10 2 8 5 5 5C5 5 7 8 7 10C7 12 5 15 5 15C5 15 8 13 10 13C12 13 15 15 15 15C15 15 13 12 13 10C13 8 15 5 15 5C15 5 12 5 10 2Z" />
      </svg>
      <div className="h-px w-16 sm:w-24 bg-lino/60" />
    </div>
  )
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center mb-12">
      <p className="font-serif text-dorado tracking-[0.34em] uppercase text-[10px] sm:text-xs mb-3">{label}</p>
      <h2 className="font-script text-5xl sm:text-6xl text-hoja leading-[0.95]">{title}</h2>
      <Divider />
    </div>
  )
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeWidth="1.2" />
      <path d="M12 7v5l3 3" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeWidth="1.2" />
      <circle cx="12" cy="9" r="2.5" strokeWidth="1.2" />
    </svg>
  )
}

function GiftIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

export default function Invitation() {
  const rsvpRef = useRef<HTMLDivElement | null>(null)
  const mesaRef = useRef<HTMLDivElement | null>(null)

  function scrollTo(ref: { current: HTMLDivElement | null }) {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="min-h-screen bg-carbon overflow-x-hidden text-rosa">
      <section className="relative isolate min-h-screen overflow-hidden flex items-center justify-center px-6 py-16">
        <img src={warmPortrait} alt="Nallely y Christian" className="absolute inset-0 w-full h-full object-cover object-top opacity-35 animate-soft-pan" />
        <div className="absolute inset-0 bg-linear-to-b from-marfil/92 via-marfil/84 to-carbon/95" />
        <WallCascade className="absolute -left-10 top-0 h-64 sm:h-80 text-salvia/80 pointer-events-none" />
        <WallCascade className="absolute -right-10 top-0 h-64 sm:h-80 scale-x-[-1] text-dorado/80 pointer-events-none" />
        <WallTopBranch className="absolute -top-5 left-0 w-44 sm:w-56 text-salvia/65 pointer-events-none" />
        <WallTopBranch className="absolute -top-5 right-0 w-44 sm:w-56 scale-x-[-1] text-dorado/65 pointer-events-none" />

        <div className="relative z-10 w-full max-w-4xl text-center animate-fade-rise">
          <p className="font-serif tracking-[0.38em] uppercase text-[10px] sm:text-xs text-dorado mb-5">Te invitamos a celebrar nuestra boda</p>
          <h1 className="font-script text-hoja leading-[0.88] drop-shadow-sm">
            <span className="block text-7xl sm:text-8xl md:text-9xl">Christian</span>
            <span className="block font-serif text-dorado text-xl sm:text-2xl tracking-[0.5em] uppercase my-3">y</span>
            <span className="block text-7xl sm:text-8xl md:text-9xl">Nallely</span>
          </h1>
          <p className="font-elegant italic text-hoja/80 text-lg sm:text-xl mt-3">Con gratitud, amor y fe</p>

          <div className="mt-8 mb-12 flex items-center justify-center gap-4">
            <div className="h-px w-14 sm:w-24 bg-dorado/60" />
            <p className="font-serif tracking-[0.35em] uppercase text-xs sm:text-sm text-hoja">23 · mayo · 2026</p>
            <div className="h-px w-14 sm:w-24 bg-dorado/60" />
          </div>

          <div className="mx-auto w-full max-w-md sm:max-w-none flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => scrollTo(rsvpRef)}
              className="px-8 py-3.5 bg-dorado text-marfil font-serif tracking-[0.2em] text-xs sm:text-sm uppercase border border-dorado hover:bg-doradoOscuro transition-colors"
            >
              Confirmar asistencia
            </button>
            <button
              onClick={() => scrollTo(mesaRef)}
              className="px-8 py-3.5 bg-marfil/60 text-hoja font-serif tracking-[0.2em] text-xs sm:text-sm uppercase border border-hoja/40 hover:bg-marfil transition-colors"
            >
              Mesa de regalos
            </button>
          </div>
        </div>
      </section>

      <section className="bg-crema/55 py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        <WallBouquet className="absolute -left-14 -top-12 w-40 sm:w-52 text-salvia/70 pointer-events-none" />
        <WallBouquet className="absolute -right-14 -bottom-12 w-40 sm:w-52 scale-x-[-1] scale-y-[-1] text-dorado/70 pointer-events-none" />
        <WallSprig className="absolute -right-4 top-10 h-36 sm:h-44 scale-x-[-1] text-salvia/65 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative aspect-3/4 overflow-hidden border border-lino/70 bg-marfil p-3">
            <img src={warmPortrait} alt="Nosotros" className="w-full h-full object-cover" />
            <div className="absolute inset-0 border border-dorado/35 m-6 pointer-events-none" />
          </div>

          <div className="relative aspect-3/4 overflow-hidden border border-lino/70 bg-marfil p-3 md:mt-16">
            <img src={darkPortrait} alt="Sesión de estudio" className="w-full h-full object-cover grayscale-18" />
            <div className="absolute inset-0 border border-dorado/35 m-6 pointer-events-none" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20 px-4 bg-marfil">
        <WallSprig className="absolute -left-3 top-1/2 -translate-y-1/2 h-36 sm:h-44 text-salvia/75 pointer-events-none" />
        <WallSprig className="absolute -right-3 top-1/2 -translate-y-1/2 h-36 sm:h-44 scale-x-[-1] text-dorado/75 pointer-events-none" />
        <div className="relative z-10">
          <p className="font-serif text-dorado tracking-[0.32em] uppercase text-xs text-center mb-10">Faltan</p>
          <CountdownTimer />
          <p className="font-serif text-hoja/70 tracking-[0.28em] uppercase text-xs text-center mt-10">para el gran día</p>
        </div>
      </section>

      <section className="bg-carbon py-16 sm:py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-carbon/85" />
        <WallTopBranch className="absolute -top-6 left-0 w-52 sm:w-64 text-salvia/55 pointer-events-none" />
        <WallTopBranch className="absolute -top-6 right-0 w-52 sm:w-64 scale-x-[-1] text-dorado/55 pointer-events-none" />
        <WallBouquet className="absolute -left-12 -bottom-12 w-36 sm:w-44 text-salvia/45 pointer-events-none" />
        <WallBouquet className="absolute -right-12 -bottom-12 w-36 sm:w-44 scale-x-[-1] text-dorado/45 pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <SectionHeading label="Nuestra promesa" title="Un solo camino" />
          <p className="font-elegant italic text-hoja text-2xl sm:text-3xl leading-relaxed mb-8">
            "Dos almas que se encontraron para florecer juntas para siempre."
          </p>
          <p className="font-elegant text-tierra text-lg leading-relaxed">
            Con inmensa alegría, queremos compartir contigo el comienzo de esta nueva etapa. Tu presencia será un regalo invaluable en el día más especial de nuestras vidas.
          </p>
        </div>
      </section>

      <section className="bg-crema py-16 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label="Detalles" title="Ceremonia y recepción" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            <div className="lg:col-span-2 border border-lino/80 bg-marfil/80 backdrop-blur-sm p-8 sm:p-10 flex flex-col justify-center gap-6">
              <div className="border-l-2 border-dorado pl-4">
                <h3 className="font-serif text-hoja text-xl tracking-[0.14em] uppercase">Boda civil y recepción</h3>
              </div>

              <div className="flex flex-col gap-6 mt-4 text-tierra">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-doradoOscuro"><ClockIcon /></div>
                  <div>
                    <p className="font-serif text-xs tracking-[0.2em] uppercase text-dorado/70 mb-1">Inicio</p>
                    <p className="font-elegant text-2xl text-hoja">4:00 PM</p>
                  </div>
                  <div>
                    <p className="font-serif text-xs tracking-[0.2em] uppercase text-dorado/70 mb-1">Ceremonia</p>
                    <p className="font-elegant text-2xl text-hoja">5:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 text-doradoOscuro"><LocationIcon /></div>
                  <div>
                    <p className="font-serif text-xs tracking-[0.2em] uppercase text-dorado/70 mb-1">Ubicación</p>
                    <p className="font-elegant text-2xl text-hoja">Ranchito 1</p>
                    <p className="font-elegant text-base text-tierra mt-1 leading-relaxed">
                      Calle Valle Mocorito #80050,<br />
                      Culiacán, Sinaloa.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-6 border-t border-lino/60">
                <p className="font-serif tracking-[0.2em] uppercase text-dorado text-[10px] mb-2">Código de vestimenta</p>
                <p className="font-elegant text-hoja text-2xl">Cóctel - jardín</p>
              </div>
              <div className="mt-4 pt-6 border-t border-lino/60">
                <p className="font-serif tracking-[0.2em] uppercase text-dorado text-[10px] mb-2">Notas a considerar</p>
                <p className="font-elegant text-hoja text-2xl">No se aceptan niños</p>
              </div>
            </div>

            <div className="lg:col-span-3 relative min-h-105 border border-lino bg-marfil overflow-hidden group">
              <WallBouquet className="absolute -left-10 -top-10 w-28 text-salvia/70 pointer-events-none z-10" />
              <WallSprig className="absolute -right-4 top-4 h-24 scale-x-[-1] text-dorado/75 pointer-events-none z-10" />
              <div className="absolute inset-0 border-14 border-marfil z-10 pointer-events-none" />
              <div className="absolute inset-0 border border-dorado/30 m-2 z-10 pointer-events-none" />

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3621.910063325292!2d-107.46794652463105!3d24.798532977969735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDQ3JzU0LjciTiAxMDfCsDI3JzU1LjMiVw!5e0!3m2!1ses-419!2smx!4v1776037316231!5m2!1ses-419!2smx"
                width="100%"
                height="100%"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <a
                href="https://maps.app.goo.gl/PU4vzgrzKYxEN8dr6"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-8 right-8 z-20 bg-hoja text-marfil px-6 py-2.5 font-serif text-[10px] tracking-[0.2em] uppercase border border-hoja hover:bg-dorado transition-colors shadow-xl"
              >
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <section ref={rsvpRef} className="relative bg-marfil py-16 sm:py-24 px-4 overflow-hidden">
        <WallCascade className="absolute -left-10 top-0 h-56 sm:h-72 text-salvia/75 pointer-events-none" />
        <WallBouquet className="absolute -right-12 -bottom-10 w-34 sm:w-44 scale-x-[-1] scale-y-[-1] text-dorado/75 pointer-events-none" />
        <div className="max-w-lg mx-auto relative z-10">
          <SectionHeading label="Confirmación" title="¿Nos acompañas?" />
          <p className="font-elegant text-tierra text-center text-lg leading-relaxed -mt-6 mb-10 px-4">
            Por favor confirma tu asistencia antes del <strong>1 de mayo de 2026</strong>.
          </p>
          <RSVPForm />
        </div>
      </section>

      <section ref={mesaRef} className="bg-crema py-16 sm:py-24 px-4 relative overflow-hidden">
        <WallBouquet className="absolute -left-12 -top-10 w-36 sm:w-46 text-dorado/75 pointer-events-none" />
        <WallCascade className="absolute -right-10 top-0 h-56 sm:h-72 scale-x-[-1] text-salvia/75 pointer-events-none" />
        <WallTopBranch className="absolute -bottom-5 right-0 w-48 sm:w-60 scale-x-[-1] scale-y-[-1] text-dorado/60 pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <SectionHeading label="Mesa de regalos" title="Nuestros deseos" />
          <p className="font-elegant text-tierra text-lg leading-relaxed max-w-xl mx-auto text-center">
            Hoy unimos nuestras vidas con amor e ilusión. Más que cualquier detalle material, agradecemos profundamente tu cariño, tus palabras y tu compañía.
          </p>
          <p className="font-elegant text-tierra text-lg leading-relaxed max-w-xl mx-auto text-center">
            Para quienes deseen acompañarnos también en este nuevo comienzo, hemos creado una mesa de regalos en Amazon, donde cada obsequio representa un gesto lleno de amor que llevaremos con nosotros en esta nueva etapa.  
          </p>

          <div className="flex flex-col items-center mb-12 mt-10">
            <a
              href="https://www.amazon.com.mx/wedding/guest-view/11N4UKN7Z4WXB"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 border border-dorado bg-marfil text-doradoOscuro font-serif tracking-[0.2em] text-xs sm:text-sm uppercase hover:bg-dorado hover:text-marfil transition-colors shadow-md"
            >
              <GiftIcon />
              <span>Ver mesa en Amazon</span>
            </a>

            <div className="flex items-center justify-center gap-4 mt-12 w-full max-w-md">
              <div className="h-px flex-1 bg-lino" />
              <span className="font-serif text-tierra tracking-[0.2em] text-xs uppercase whitespace-nowrap">o también</span>
              <div className="h-px flex-1 bg-lino" />
            </div>
          </div>

          <GoalsBar />
        </div>
      </section>

      <footer className="relative py-16 sm:py-20 px-6 overflow-hidden bg-hoja">
        <div className="absolute inset-0 bg-hoja/85" />
        <WallTopBranch className="absolute -top-4 left-0 w-52 sm:w-64 text-marfil/55 pointer-events-none" />
        <WallTopBranch className="absolute -top-4 right-0 w-52 sm:w-64 scale-x-[-1] text-dorado/55 pointer-events-none" />
        <WallBouquet className="absolute -left-10 -bottom-10 w-32 sm:w-40 text-marfil/45 pointer-events-none" />
        <WallBouquet className="absolute -right-10 -bottom-10 w-32 sm:w-40 scale-x-[-1] text-dorado/45 pointer-events-none" />
        <div className="relative z-10 text-center text-marfil">
          <p className="font-serif text-dorado tracking-[0.35em] uppercase text-xs mb-6">23 · Mayo · 2026</p>
          <h2 className="font-script text-6xl sm:text-7xl leading-none">
            Christian <span className="font-serif text-dorado text-3xl align-middle">&</span> Nallely
          </h2>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-10 bg-dorado/60" />
            <p className="font-serif text-marfil/80 text-xs tracking-[0.22em] uppercase">Con amor y gratitud</p>
            <div className="h-px w-10 bg-dorado/60" />
          </div>
        </div>
      </footer>
    </main>
  )
}