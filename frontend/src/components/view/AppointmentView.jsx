export default function AppointmentView({ data }) {
  // ===== UTILITY FUNCTION =====
  const extractDateTime = (dateTimeStr) => {
    const dateObj = new Date(dateTimeStr);

    const date = dateObj.toISOString().split("T")[0]; // "2025-07-16"
    const time = dateObj.toISOString().split("T")[1].split("Z")[0]; // "14:15:00"

    return { date, time };
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Appointment Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Appointment ID
            </label>
            <p className="text-lg text-gray-900">{data.appointmentId}</p>
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
              Doctor
            </label>
            <p className="text-lg text-gray-900">
              {data.doctor.firstName} {data.doctor.lastName}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date
            </label>
            <p className="text-lg text-gray-900">
              {extractDateTime(data.dateTime).date}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Time
            </label>
            <p className="text-lg text-gray-900">
              {extractDateTime(data.dateTime).time}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Purpose
            </label>
            <p className="text-lg text-gray-900">{data.purpose}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                data.status
              )}`}
            >
              {data.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
