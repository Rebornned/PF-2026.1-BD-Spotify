export default function Dropdown({ value, onChange, options, ariaLabel }) {
  return (
    <select
      className="dropdown-btn"
      value={value}
      onChange={e => onChange(e.target.value)}
      aria-label={ariaLabel}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}