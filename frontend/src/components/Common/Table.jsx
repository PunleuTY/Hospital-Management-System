const Table = ({ children, className = "" }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">{children}</table>
    </div>
  )
}

const TableHeader = ({ children, className = "" }) => {
  return <thead className={`bg-gray-50 ${className}`}>{children}</thead>
}

const TableBody = ({ children, className = "" }) => {
  return <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>{children}</tbody>
}

const TableRow = ({ children, className = "" }) => {
  return <tr className={`hover:bg-gray-100 ${className}`}>{children}</tr>
}

const TableHead = ({ children, className = "" }) => {
  return (
    <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider ${className}`}>
      {children}
    </th>
  )
}

const TableCell = ({ children, className = "" }) => {
  return <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className}`}>{children}</td>
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }