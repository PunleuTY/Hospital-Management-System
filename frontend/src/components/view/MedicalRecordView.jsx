export default function MedicalRecordView({ data }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Medical Record Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Record ID
            </label>
            <p className="text-lg text-gray-900">{data.recordId}</p>
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
              Appointment ID
            </label>
            <p className="text-lg text-gray-900">
              {data.appointmentId || "---"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Diagnosis
            </label>
            <p className="text-lg text-gray-900">{data.diagnosis}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Prescription
            </label>
            <p className="text-lg text-gray-900">{data.prescription}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Lab Result
            </label>
            <p className="text-lg text-gray-900">{data.labResult}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Treatment
            </label>
            <p className="text-lg text-gray-900">{data.treatment}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
