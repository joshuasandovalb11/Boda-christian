/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef }          from 'react'
// import coupleImg           from '../assets/image1.png'
// import coupleImg           from '../assets/image.png'
// import coupleImg2          from '../assets/image2.jpeg'
// import coupleImg3          from '../assets/image3.jpeg'
import CountdownTimer      from '../components/CountdownTimer'
import RSVPForm            from '../components/RSVPForm'
import GoalsBar            from '../components/GoalsBar'

/* ── Inline SVG floral decoration ── */
function FloralTop({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 180" className={className} aria-hidden="true">
      <g opacity="0.3" fill="none">
        <path d="M30 10 Q40 60 35 180" stroke="var(--color-dorado)" strokeWidth="1.5" strokeLinecap="round"/>
        <ellipse cx="52" cy="55"  rx="18" ry="9"  fill="var(--color-tierra)" transform="rotate(-30 52 55)"/>
        <ellipse cx="18" cy="80"  rx="16" ry="8"  fill="var(--color-lino)" transform="rotate(20 18 80)"/>
        <ellipse cx="55" cy="110" rx="20" ry="9"  fill="var(--color-tierra)" transform="rotate(-25 55 110)"/>
        <ellipse cx="14" cy="135" rx="15" ry="7"  fill="var(--color-lino)" transform="rotate(15 14 135)"/>
        {[[50, 35], [65, 75], [48, 130], [70, 160]].map(([cx, cy], i) => (
          <g key={i}>
            {[0,60,120,180,240,300].map(deg => (
              <ellipse key={deg} cx={cx} cy={cy} rx="7" ry="4" fill="var(--color-marfil)" transform={`rotate(${deg} ${cx} ${cy})`}/>
            ))}
            <circle cx={cx} cy={cy} r="4" fill="var(--color-dorado)" opacity="0.9"/>
          </g>
        ))}
        <path d="M30 10 Q110 5 200 15" stroke="var(--color-dorado)" strokeWidth="1.2" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

function FloralCenter({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 70" className={className} aria-hidden="true">
      <g opacity="0.3" fill="none">
        <path d="M5 35 Q80 10 155 35" stroke="var(--color-dorado)" strokeWidth="1.2" strokeLinecap="round"/>
        {[[30,25],[80,18],[130,25]].map(([cx, cy], i) => (
          <g key={i}>
            {[0,60,120,180,240,300].map(deg => (
              <ellipse key={deg} cx={cx} cy={cy} rx="8" ry="4.5" fill="var(--color-marfil)" transform={`rotate(${deg} ${cx} ${cy})`}/>
            ))}
            <circle cx={cx} cy={cy} r="4.5" fill="var(--color-dorado)" opacity="0.9"/>
          </g>
        ))}
      </g>
    </svg>
  )
}

/* ── Section divider ── */
function Divider({ light = false }: { light?: boolean }) {
  const lineClass = `h-px w-16 sm:w-24 bg-lino/50`
  const svgClass  = `w-4 h-4 text-dorado/50`
  const d = 'M10 2C10 2 8 5 5 5C5 5 7 8 7 10C7 12 5 15 5 15C5 15 8 13 10 13C12 13 15 15 15 15C15 15 13 12 13 10C13 8 15 5 15 5C15 5 12 5 10 2Z'
  return (
    <div className="flex items-center justify-center gap-3 my-10">
      <div className={lineClass} />
      <svg viewBox="0 0 20 20" className={svgClass} fill="currentColor">
        <path d={d} />
      </svg>
      <div className={lineClass} />
    </div>
  )
}

/* ── Icon components ── */
function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeWidth="1.2"/>
      <path d="M12 7v5l3 3" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}
function LocationIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeWidth="1.2"/>
      <circle cx="12" cy="9" r="2.5" strokeWidth="1.2"/>
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
/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function Invitation() {
  const rsvpRef  = useRef<HTMLDivElement | null>(null)
  const mesaRef  = useRef<HTMLDivElement | null>(null)

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>) {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="min-h-screen bg-marfil overflow-x-hidden text-rosa">

      {/* ───────────────────────────────────────
          HERO — foto dramática + nombres
      ─────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* <img src={coupleImg} alt="Nallely y Christian" className="absolute inset-0 w-full h-full object-cover object-top" /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-tierra/40 via-lino/30 to-crema/40" />
        <FloralTop className="absolute top-0 left-0 w-36 sm:w-48 md:w-64 opacity-60" />

        <div className="absolute top-8 right-8 sm:top-12 sm:right-12 opacity-60">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-dorado rounded-full mb-2 ml-auto" style={{ marginLeft: `${i % 2 === 0 ? 8 : 0}px` }} />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6 py-20">
          <p className="font-elegant text-dorado tracking-[0.35em] uppercase text-xs sm:text-sm mb-8">
            Te invitamos a nuestra boda
          </p>
          <h1 className="font-serif text-rosa font-light leading-none tracking-wide">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">CHRISTIAN</span>
            <span className="block font-serif text-dorado text-3xl sm:text-4xl md:text-5xl my-3 sm:my-4">&</span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">NALLELY</span>
          </h1>

          <div className="flex items-center gap-4 mt-8 mb-10">
            <div className="h-px w-12 sm:w-20 bg-dorado/50" />
            <p className="font-elegant text-rosa/90 tracking-[0.3em] text-sm sm:text-base uppercase">
              23 · Mayo · 2026
            </p>
            <div className="h-px w-12 sm:w-20 bg-dorado/50" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
            <button onClick={() => scrollTo(rsvpRef)} className="px-8 py-3.5 bg-dorado text-marfil font-elegant tracking-[0.2em] text-sm uppercase hover:bg-doradoOscuro transition-colors duration-300">
              Confirmar asistencia
            </button>
            <button onClick={() => scrollTo(mesaRef)} className="px-8 py-3.5 border border-rosa/50 text-rosa font-elegant tracking-[0.2em] text-sm uppercase hover:bg-rosa/10 transition-colors duration-300">
              Mesa de regalos
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="font-elegant text-rosa text-[10px] tracking-[0.25em] uppercase">Desliza</span>
          <div className="w-px h-10 bg-rosa/50 animate-pulse" />
        </div>
      </section>

      {/* ───────────────────────────────────────
          GALERÍA EDITORIAL — Dos fotos
      ─────────────────────────────────────── */}
      {/* <section className="bg-crema py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative aspect-[3/4] overflow-hidden group">
            <img src={coupleImg2} alt="Nosotros" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 border border-dorado/30 m-4 sm:m-6 pointer-events-none" />
          </div>

          <div className="relative aspect-[3/4] overflow-hidden group md:mt-24">
            <img src={coupleImg3} alt="Nosotros" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 border border-dorado/30 m-4 sm:m-6 pointer-events-none" />
          </div>
        </div>
      </section> */}

      {/* ───────────────────────────────────────
          CUENTA REGRESIVA
      ─────────────────────────────────────── */}
      <section className="bg-carbon py-16 sm:py-20 px-4">
        <p className="font-elegant text-dorado/70 tracking-[0.3em] uppercase text-xs text-center mb-10">
          Faltan
        </p>
        <CountdownTimer />
        <p className="font-elegant text-rosa/40 tracking-[0.25em] uppercase text-xs text-center mt-10">
          para el gran día
        </p>
      </section>

      {/* ───────────────────────────────────────
          BIENVENIDA
      ─────────────────────────────────────── */}
      <section className="bg-marfil py-16 sm:py-24 px-6 relative overflow-hidden">
        <div className="max-w-xl mx-auto text-center">
          <FloralCenter className="w-40 sm:w-56 mx-auto mb-8 opacity-70" />
          <p className="font-elegant italic text-rosa text-lg sm:text-xl md:text-2xl leading-relaxed mb-6">
            "Dos almas que se encontraron para caminar juntas el resto de sus vidas."
          </p>
          <Divider />
          <p className="font-elegant text-tierra text-base sm:text-lg leading-relaxed">
            Con el corazón lleno de alegría, tenemos el honor de invitarte a ser parte del día más especial de nuestras vidas. Tu presencia hará este momento aún más memorable.
          </p>
        </div>
      </section>

      {/* ───────────────────────────────────────
          DETALLES — Evento Civil y Ubicación
      ─────────────────────────────────────── */}
      <section className="bg-crema py-16 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="font-elegant tracking-[0.35em] uppercase text-doradoOscuro text-xs text-center mb-12">
            Detalles del evento
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            <div className="lg:col-span-2 border border-lino bg-marfil p-8 sm:p-12 flex flex-col justify-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-px h-12 bg-dorado" />
                <div className='flex gap-2'>
                  <h3 className="font-serif text-rosa text-xl tracking-wide uppercase">Boda Civil</h3>
                  <p className="font-serif text-rosa text-xl">&</p>
                  <h3 className="font-serif text-rosa text-xl tracking-wide uppercase">Recepción</h3>
                </div>
              </div>

              <div className="flex flex-col gap-6 mt-4">
                <div className="flex items-start gap-4 text-tierra">
                  <div className="mt-1"><ClockIcon /></div>
                  <div>
                    <p className="font-elegant text-xs tracking-widest uppercase text-dorado/60 mb-1">Inicio</p>
                    <p className="font-elegant text-lg text-rosa italic">4:00 PM</p>
                  </div>
                  <div>
                    <p className="font-elegant text-xs tracking-widest uppercase text-dorado/60 mb-1">Ceremonia</p>
                    <p className="font-elegant text-lg text-rosa italic">5:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-tierra">
                  <div className="mt-1"><LocationIcon /></div>
                  <div>
                    <p className="font-elegant text-xs tracking-widest uppercase text-dorado/60 mb-1">Ubicación</p>
                    <p className="font-elegant text-lg text-rosa">"Ranchito 1"</p>
                    <p className="font-elegant text-sm text-tierra mt-1 leading-relaxed">
                      Calle Valle Mocorito #80050,<br />
                      Culiacan, Sinaloa.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-6 border-t border-lino/30">
                <p className="font-elegant tracking-[0.2em] uppercase text-dorado text-[10px] mb-2">Código de Vestimenta</p>
                <p className="font-serif text-rosa text-xl">Coctel — Jardin</p>
              </div>
            </div>

            {/* Espacio para Google Maps - Ocupa 3 columnas de 5 */}
            <div className="lg:col-span-3 relative min-h-100 border border-lino bg-marfil overflow-hidden group">
              {/* Overlay decorativo interno */}
              <div className="absolute inset-0 border-12 border-marfil z-10 pointer-events-none" />
              <div className="absolute inset-0 border border-dorado/20 m-2 z-10 pointer-events-none" />
              
              {/* Iframe de Google Maps */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3621.910063325292!2d-107.46794652463105!3d24.798532977969735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDQ3JzU0LjciTiAxMDfCsDI3JzU1LjMiVw!5e0!3m2!1ses-419!2smx!4v1776037316231!5m2!1ses-419!2smx"  
                width="100%"
                height="100%"
                // style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                // className="grayscale opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              ></iframe>
              
              {/* Botón flotante para abrir directamente en la App de Maps */}
              <a 
                href="https://maps.app.goo.gl/PU4vzgrzKYxEN8dr6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute bottom-8 right-8 z-20 bg-dorado text-marfil px-6 py-2.5 font-elegant text-[10px] tracking-[0.2em] uppercase hover:bg-rosa transition-colors shadow-2xl"
              >
                Abrir en Google Maps
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────
          RSVP — confirmación de asistencia
      ─────────────────────────────────────── */}
      <section ref={rsvpRef} className="bg-marfil py-16 sm:py-24 px-4 relative overflow-hidden">
        <FloralTop className="absolute -top-4 -right-8 w-48 sm:w-64 opacity-20 scale-x-[-1] pointer-events-none" />
        <div className="max-w-lg mx-auto relative z-10">
          <div className="text-center mb-12">
            <p className="font-elegant tracking-[0.35em] uppercase text-doradoOscuro text-xs mb-3">Confirmación</p>
            <h2 className="font-serif text-rosa text-3xl sm:text-4xl font-light mb-4">¿Nos acompañas?</h2>
            <p className="font-elegant text-tierra text-base leading-relaxed">
              Por favor confirma tu asistencia antes del <strong>1 de mayo de 2026</strong>.
            </p>
            <Divider />
          </div>
          <RSVPForm />
        </div>
      </section>

      {/* ───────────────────────────────────────
          MESA DE REGALOS / METAS
      ─────────────────────────────────────── */}
      <section ref={mesaRef} className="bg-crema py-16 sm:py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-elegant tracking-[0.35em] uppercase text-doradoOscuro text-xs mb-3">Mesa de regalos</p>
            <h2 className="font-serif text-rosa text-3xl sm:text-4xl font-light mb-4">Nuestros deseos</h2>
            <p className="font-elegant text-tierra text-base leading-relaxed max-w-md mx-auto">
              Hoy unimos nuestras vidas con amor, ilusión y la certeza de que este es solo el comienzo de un camino que soñamos recorrer juntos… Christian y Nallely.  
            </p>
            <p className="font-elegant text-tierra text-base leading-relaxed max-w-md mx-auto">
              Cada persona que ha sido parte de nuestra historia ocupa un lugar muy especial en este momento tan significativo. Por eso, más allá de cualquier detalle, lo que más valoramos es el cariño, los buenos deseos y el acompañamiento que nos han brindado.  
            </p>
            <Divider />
          </div>
          <div className="flex flex-col items-center mb-12">
            <a 
              href="https://www.amazon.com.mx/wedding/guest-view/11N4UKN7Z4WXB" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 border border-dorado bg-marfil text-doradoOscuro font-elegant tracking-[0.2em] text-sm uppercase hover:bg-dorado hover:text-marfil transition-colors duration-500 shadow-md"
            >
              <GiftIcon />
              <span>Ver mesa en Amazon</span>
            </a>
            
            <div className="flex items-center justify-center gap-4 mt-12 w-full max-w-md">
              <div className="h-px flex-1 bg-lino" />
              <span className="font-elegant text-tierra tracking-[0.2em] text-xs uppercase whitespace-nowrap">O también</span>
              <div className="h-px flex-1 bg-lino" />
            </div>
          </div>

          <GoalsBar />
        </div>
      </section>

      {/* ───────────────────────────────────────
          FOOTER — cierre dramático
      ─────────────────────────────────────── */}
      <footer className="bg-carbon py-16 sm:py-20 px-6 relative overflow-hidden">
        <FloralCenter className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 opacity-10 pointer-events-none" />
        <div className="relative z-10 text-center">
          <p className="font-elegant text-dorado/60 tracking-[0.35em] uppercase text-xs mb-6">23 · Mayo · 2026</p>
          <h2 className="font-serif text-rosa text-4xl sm:text-5xl font-light">
            Christian<span className="font-serif text-dorado"> &</span> Nallely
          </h2>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-10 bg-dorado/30" />
            <p className="font-elegant text-rosa/40 text-xs tracking-[0.2em]">CON AMOR Y GRATITUD</p>
            <div className="h-px w-10 bg-dorado/30" />
          </div>
        </div>
      </footer>
    </main>
  )
}