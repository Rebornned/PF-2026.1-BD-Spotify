import { useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ current, total, onChange }) {
  const safeTotal = Math.max(0, Math.floor(Number(total) || 0))
  const safeCurrent = safeTotal === 0
    ? 1
    : Math.min(Math.max(1, Math.floor(Number(current) || 1)), safeTotal)

  const pages = useMemo(() => {
    const result = []
    if (safeTotal <= 7) {
      for (let i = 1; i <= safeTotal; i++) result.push(i)
      return result
    }
    result.push(1)
    if (safeCurrent > 3) result.push('...')
    const start = Math.max(2, safeCurrent - 1)
    const end = Math.min(safeTotal - 1, safeCurrent + 1)
    for (let i = start; i <= end; i++) result.push(i)
    if (safeCurrent < safeTotal - 2) result.push('...')
    result.push(safeTotal)
    return result
  }, [safeCurrent, safeTotal])

  if (safeTotal === 0) return null

  function irPara(p) {
    if (p < 1 || p > safeTotal || p === safeCurrent) return
    onChange(p)
  }

  return (
    <nav className="foot-btns" aria-label="Paginação">
      <button
        type="button"
        className="prev-btn"
        aria-label="Página anterior"
        onClick={() => irPara(safeCurrent - 1)}
        disabled={safeCurrent === 1}
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="text-light" aria-hidden="true">…</span>
        ) : (
          <button
            key={p}
            type="button"
            className={`number-btn ${p === safeCurrent ? 'active' : ''}`}
            aria-label={`Ir para página ${p}`}
            aria-current={p === safeCurrent ? 'page' : undefined}
            onClick={() => irPara(p)}
          >
            {p}
          </button>
        )
      )}
      <button
        type="button"
        className="next-btn"
        aria-label="Próxima página"
        onClick={() => irPara(safeCurrent + 1)}
        disabled={safeCurrent === safeTotal}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  )
}