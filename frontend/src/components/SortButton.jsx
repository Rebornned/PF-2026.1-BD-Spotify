import { ArrowUp, ArrowDown } from 'lucide-react'

export default function SortButton({ direction, onToggle }) {
  const cor = (ativa) => ({ color: ativa ? 'var(--accent-light)' : 'var(--text-mid)' })

  return (
    <button
      type="button"
      className="sort-btn"
      onClick={onToggle}
      aria-label={direction === 'asc' ? 'Ordenar decrescente' : 'Ordenar crescente'}
    >
      <ArrowUp size={14} style={cor(direction === 'asc')} />
      <ArrowDown size={14} style={cor(direction === 'desc')} />
    </button>
  )
}