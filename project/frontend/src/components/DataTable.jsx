export default function DataTable({ className, columns, rows, renderCell, onRowClick, rowClassName, loading = false, skeletonRows = 10, }) {
  const temWidth = columns.some(c => c.width)

  const renderTableHead = () => (
    <thead className="text-light-bold">
      <tr>
        {columns.map(col => (
          <th key={col.key} data-type={col.type ?? 'string'}>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  )

  const renderColGroup = () => temWidth && (
    <colgroup>
      {columns.map(col => (
        <col key={col.key} style={{ width: col.width }} />
      ))}
    </colgroup>
  )

  if (loading) {
    return (
      <div className="data-table-scroll">
        <table className={className}>
          {renderColGroup()}
          {renderTableHead()}
          <tbody className="text-mid">
            {Array.from({ length: skeletonRows }).map((_, i) => (
              <tr key={`skel-${i}`} className="skeleton-row">
                {columns.map(col => (
                  <td key={col.key}>
                    <div className="skeleton-cell" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="data-table-scroll">
      <table className={className}>
        {renderColGroup()}
        {renderTableHead()}
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
    </div>
  )
}