/* eslint-disable react/prop-types */
const DoctorsView = ({doctor, selectedDoctor, handleDoctorSelection, idx}) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <img
        loading="lazy"
        className="w-full h-96 mb-4"
        src={`/doctor0${idx + 1}.jpg`}
        alt="Our Fixers"
      />

      <div className="flex flex-col gap-4 justify-between">
        <p className="text-lg">{doctor.description}</p>
        <p>{`${doctor.experience} of experience`}</p>
        <div className="flex justify-between items-center">
          <p>{`From ${doctor.city}`}</p>
          <button
            onClick={() => handleDoctorSelection(doctor.name)}
            disabled={
              selectedDoctor !== '' &&
              selectedDoctor !== null &&
              selectedDoctor !== undefined
            }
            className="bg-blue-500 ml-auto hover:bg-gray-600 text-white py-2 px-4 rounded-full disabled:bg-blue-300">
            {selectedDoctor === doctor.name ? `Selected` : `Select`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorsView;
