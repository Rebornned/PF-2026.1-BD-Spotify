import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Pesquisar...' }) {
  return (
    <div className="search-bar">
      <span className="search-icon">
        <Search size={16} />
      </span>
      <input
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}