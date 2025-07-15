const Table = ({ children, className = "" }) => {
  return (
    <div className={`w-full ${className}`}>
      <table className="w-full border-collapse table-fixed">{children}</table>
    </div>
  );
};

const TableHeader = ({ children, className = "" }) => {
  return <thead className={`bg-gray-100 ${className}`}>{children}</thead>;
};

const TableBody = ({ children, className = "" }) => {
  return (
    <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>
      {children}
    </tbody>
  );
};

const TableRow = ({ children, className = "", onClick }) => {
  return (
    <tr className={`hover:bg-gray-100 ${className}`} onClick={() => onClick()}>
      {children}
    </tr>
  );
};

const TableHead = ({ children, className = "" }) => {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider ${className}`}
    >
      {children}
    </th>
  );
};

const TableCell = ({ children, className = "", onClick }) => {
  return (
    <td
      onClick={() => onClick()}
      className={`px-6 text-sm text-gray-900 ${className}`}
    >
      {children}
    </td>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
