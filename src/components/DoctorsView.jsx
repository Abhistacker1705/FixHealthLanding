/* eslint-disable react/prop-types */
const DoctorsView = ({doctor, selectedDoctor, handleDoctorSelection, idx}) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <img
        loading="lazy"
        className="w-full h-60 mb-4 object-cover"
        src={`/doctor0${idx + 1}.jpg`}
        alt="Our Fixers"
      />

      <div className="flex flex-col gap-4 justify-between">
        <p className="text-lg text-blue-500">{doctor.name}</p>
        <p className="text-base">{doctor.description}</p>
        <p className="text-base">{`${doctor.experience} years of experience`}</p>
        <div className="flex justify-between items-center">
          <p className="text-base">{doctor.city}</p>
          <button
            onClick={() => handleDoctorSelection(doctor.name)}
            className={`border-none ml-auto hover:bg-gray-600  py-2 px-4 rounded-full ${
              selectedDoctor === doctor.name
                ? `bg-blue-200 text-black`
                : `bg-blue-500 text-white`
            }`}>
            {selectedDoctor === doctor.name ? `Selected` : `Select`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorsView;
