import { useGoals }    from '../hooks/useGoals'
import { useSettings } from '../hooks/useSettings'

export default function GoalsBar() {
  const { goals,    loading: gl } = useGoals()
  const { settings, loading: sl } = useSettings()

  const active = goals.filter(g => g.active)

  if (gl || sl) {
    return (
      <div className="flex justify-center py-10">
        <p className="font-elegant text-tierra tracking-widest text-sm animate-pulse">
          Cargando metas...
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">

      {/* Goals list */}
      <div className="flex flex-col gap-8 mb-12">
        {active.length === 0 ? (
          <p className="font-elegant text-tierra text-center text-lg">
            Próximamente agregaremos nuestra lista de deseos.
          </p>
        ) : (
          active.map(goal => {
            const pct     = goal.target > 0
              ? Math.min(Math.round((goal.current / goal.target) * 100), 100)
              : 0
            const reached = pct >= 100

            return (
              <div key={goal.id} className="group">
                {/* Header */}
                <div className="flex items-start justify-between mb-1.5 gap-2">
                  <div>
                    <h4 className="font-serif text-rosa text-lg leading-tight">
                      {goal.title}
                    </h4>
                    {goal.description && (
                      <p className="font-elegant text-tierra text-sm mt-0.5">
                        {goal.description}
                      </p>
                    )}
                  </div>
                  <span className={`shrink-0 font-elegant text-xs tracking-widest uppercase
                                    border px-2 py-0.5 mt-0.5
                                    ${reached
                                      ? 'border-olivo/50 text-olivo'
                                      : 'border-dorado/40 text-doradoOscuro'}`}>
                    {reached ? '✓ Logrado' : `${pct}%`}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-lino/40 rounded-none overflow-hidden">
                  <div
                    className="h-full bg-dorado transition-all duration-700 ease-out"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Amounts */}
                {/* <div className="flex justify-between mt-1.5">
                  <span className="font-elegant text-xs text-tierra">
                    ${goal.current.toLocaleString('es-MX')} recibidos
                  </span>
                  <span className="font-elegant text-xs text-tierra">
                    Meta: ${goal.target.toLocaleString('es-MX')}
                  </span>
                </div> */}
              </div>
            )
          })
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 h-px bg-lino/50" />
        <span className="font-serif text-dorado text-lg">SPEI</span>
        <div className="flex-1 h-px bg-lino/50" />
      </div>

      {/* SPEI Info */}
      {settings ? (
        <div className="border border-lino bg-marfil/60 p-6 sm:p-8">
          <p className="font-elegant text-tierra text-sm tracking-widest uppercase text-center mb-6">
            Datos para transferencia bancaria
          </p>

          <div className="flex flex-col gap-4">
            {[
              { label: 'Banco',    value: settings.bank },
              { label: 'Titular',  value: settings.holder },
              { label: 'CLABE',    value: settings.clabe,   mono: true },
              { label: 'Alias',    value: settings.alias },
              { label: 'Concepto', value: settings.concept },
              { label: 'Monto',    value: settings.amount },
            ].map(({ label, value, mono }) => (
              value ? (
                <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4
                                            pb-3 border-b border-lino/60 last:border-b-0 last:pb-0">
                  <span className="font-elegant text-xs tracking-widest uppercase text-tierra/80 sm:w-24 shrink-0">
                    {label}
                  </span>
                  <span className={`text-rosa ${mono
                    ? 'font-mono text-base tracking-wider select-all'
                    : 'font-elegant text-base'}`}>
                    {value}
                  </span>
                  {mono && (
                    <button
                      onClick={() => navigator.clipboard.writeText(value)}
                      className="self-start sm:self-auto text-[10px] font-elegant tracking-widest
                                 uppercase text-doradoOscuro border border-dorado/30 px-2 py-0.5
                                 hover:bg-dorado/10 transition-colors"
                    >
                      Copiar
                    </button>
                  )}
                </div>
              ) : null
            ))}
          </div>
        </div>
      ) : (
        <p className="font-elegant text-tierra text-center text-sm">
          Pronto compartiremos los datos bancarios.
        </p>
      )}
    </div>
  )
}