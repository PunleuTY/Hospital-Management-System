export default function StaffView({ data }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Staff Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Staff ID
            </label>
            <p className="text-lg text-gray-900">{data.staff_id}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Last Name
            </label>
            <p className="text-lg text-gray-900">{data.last_name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              First Name
            </label>
            <p className="text-lg text-gray-900">{data.first_name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Gender
            </label>
            <p className="text-lg text-gray-900">{data.gender}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Role
            </label>
            <p className="text-lg text-gray-900">{data.role}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contact
            </label>
            <p className="text-lg text-gray-900">{data.contact}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Specialization
            </label>
            <p className="text-lg text-gray-900">
              {data.specialization ?? "----"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Department ID
            </label>
            <p className="text-lg text-gray-900">{data.department_id}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Doctor
            </label>
            <p className="text-lg text-gray-900">{data.doctor_id ?? "----"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
