const Card = ({ children, className = "" }) => {
  return <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>
}

const CardHeader = ({ children, className = "" }) => {
  return <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>{children}</div>
}

const CardContent = ({ children, className = "" }) => {
  return <div className={`px-6 py-6 ${className}`}>{children}</div>
}

export { Card, CardHeader, CardContent }