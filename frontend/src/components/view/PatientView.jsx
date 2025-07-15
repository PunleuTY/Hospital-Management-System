export default function PatientView({ data }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Patient ID
            </label>
            <p className="text-lg text-gray-900">{data.patientId}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Last Name
            </label>
            <p className="text-lg text-gray-900">{data.lastName}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              First Name
            </label>
            <p className="text-lg text-gray-900">{data.firstName}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Height
            </label>
            <p className="text-lg text-gray-900">{data.height}m</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Weight
            </label>
            <p className="text-lg text-gray-900">{data.weight}kg</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date of Birth
            </label>
            <p className="text-lg text-gray-900">{data.dateOfBirth}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Address
            </label>
            <p className="text-lg text-gray-900">{data.adress}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contact
            </label>
            <p className="text-lg text-gray-900">{data.contact}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <p className="text-lg text-gray-900">{data.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
