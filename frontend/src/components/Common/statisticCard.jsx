const statisticCard = ({ title, value, subtitle, valueColor = "text-gray-900", className = "" }) => {
  return (
    <div className={`bg-white p-6 rounded-lg border border-gray-200 shadow-sm ${className}`}>
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className={`text-2xl font-bold ${valueColor} mb-1`}>{value}</div>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  )
}
export default statisticCard;