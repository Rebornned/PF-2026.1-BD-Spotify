export default function DataTable({ className, columns, rows, renderCell, onRowClick, rowClassName }) {
  const temWidth = columns.some(c => c.width)

  return (
    <table className={className}>
      {temWidth && (
        <colgroup>
          {columns.map(col => (
            <col key={col.key} style={{ width: col.width }} />
          ))}
        </colgroup>
      )}
      <thead className="text-light-bold">
        <tr>
          {columns.map(col => (
            <th key={col.key} data-type={col.type ?? 'string'}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-mid">
        {rows.map((row, i) => (
          <tr
            key={row.id ?? i}
            className={rowClassName ? rowClassName(row, i) : undefined}
            onClick={onRowClick ? () => onRowClick(row, i) : undefined}
            style={onRowClick ? { cursor: 'pointer' } : undefined}
          >
            {columns.map(col => (
              <td key={col.key}>
                {renderCell ? renderCell(row, col, i) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}