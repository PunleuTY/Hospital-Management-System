export default function BillingView({ data }) {
  // ===== UTILITY FUNCTION =====
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "unpaid":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Billing Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Billing ID
            </label>
            <p className="text-lg text-gray-900">{data.billId}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Receptionist
            </label>
            <p className="text-lg text-gray-900">
              {data.receptionist.firstName} {data.receptionist.lastName}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Patient
            </label>
            <p className="text-lg text-gray-900">
              {data.patient.firstName} {data.patient.lastName}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Patient
            </label>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                data.paymentStatus
              )}`}
            >
              {data.paymentStatus}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Treatment Fee
            </label>
            <p className="text-lg text-gray-900">${data.treatmentFee}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Medication Fee
            </label>
            <p className="text-lg text-gray-900">${data.medicationFee}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Lab Test Fee
            </label>
            <p className="text-lg text-gray-900">${data.labTestFee}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Consultation Fee
            </label>
            <p className="text-lg text-gray-900">${data.consultationFee}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Total
            </label>
            <p className="text-lg text-gray-900">${data.totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
