import axios from 'axios';
import {useState, useEffect} from 'react';

// Mock API data
const fetchDoctorsData = async () => {
  // Assuming the API returns an array of doctors
  const response = await axios.get(
    'https://api.jsonbin.io/v3/b/65ab2057dc7465401896db2f'
  );
  const data = response.data.record.doctors[0];
  return data;
};

const BookingForm = () => {
  //states
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [company, setCompany] = useState('');
  const [complaints, setComplaints] = useState('');
  const [experience, setExperience] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');

  //get city from url param
  const queryParameters = new URLSearchParams(window.location.search);
  const urlCity = queryParameters.get('city');

  //set city value if city url param is present

  useEffect(() => {
    if (urlCity) {
      setCity(urlCity);
    } else setCity('');
  }, []);

  useEffect(() => {
    // Fetch doctors data from the API
    fetchDoctorsData().then((data) => {
      setDoctors(data);
    });
  }, []);

  //step validation then only move to next step
  const isStepValid = () => {
    switch (step) {
      case 1:
        return name.trim() !== '' && /^[0-9]{10}$/.test(phone);

      case 2:
        return age >= 0 && age < 150 && city !== '' && company.trim() !== '';

      case 3:
        return complaints !== '';

      case 4:
        return experience.trim() !== '';

      case 5:
        return selectedDoctor !== '';

      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (age < 40 && step == 3) {
      setStep(step + 2);
    } else if (step < 5) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (age < 40 && step == 5) {
      setStep(step - 2);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    setStep(6);
    const submitingData = {
      name,
      phone,
      age,
      city,
      company,
      complaints,
      experience,
      selectedDoctor,
    };

    console.log(submitingData);
  };

  const handleDoctorSelection = (doctorName) => {
    setSelectedDoctor(doctorName);
  };

  const renderStepContent = () => {
    const isAgeValid = age >= 0 && age < 150;
    const isPhoneValid = /^[0-9]{10}$/.test(phone);

    switch (step) {
      case 1:
        return (
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                maxLength={10}
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              {!isPhoneValid && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid phone number.
                </p>
              )}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="mb-4">
              <input
                type="number"
                inputMode="numeric"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              {!isAgeValid && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid age.
                </p>
              )}
            </div>
            <div className="mb-4">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300">
                <option value="" disabled>
                  Select a City
                </option>
                {[...new Set(doctors.map((doctor) => doctor.city))].map(
                  (doctorcity) => (
                    <option key={doctorcity} value={doctorcity.toLowerCase()}>
                      {doctorcity}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </>
        );

      case 3:
        return (
          <div className="mb-4">
            <textarea
              placeholder="Chief Complaints"
              value={complaints}
              onChange={(e) => setComplaints(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"></textarea>
          </div>
        );

      case 4:
        return (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Previous Experience with Physiotherapy"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        );

      case 5:
        return (
          <div className="mb-4">
            <p className="font-semibold mb-2">Select a Doctor:</p>
            <select
              value={selectedDoctor}
              onChange={(e) => handleDoctorSelection(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300">
              <option value="" disabled>
                Select a Doctor
              </option>
              {doctors
                .filter((doctor) => doctor.city.toLowerCase() == city)
                .map((doctor) => (
                  <option key={doctor.name} value={doctor.name}>
                    {doctor.name} - {doctor.expertise} - {doctor.city}
                  </option>
                ))}
            </select>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col gap-4 justify-center items-center mb-4">
            <img
              width={'64px'}
              src="/CheckIcon.png"
              alt="Consultation with Fix Health"
            />
            <p>Someone will contact you shortly</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          {step < 6 && (
            <div className="flex gap-2 w-[20%]">
              {/* Progress Bar */}

              <div className="w-full h-4 bg-gray-300 rounded-full transition duration-500">
                <div
                  className={`h-full bg-blue-500 rounded-full transition-all duration-1000`}
                  style={{width: `${(step - 1) * 20}%`}}></div>
              </div>

              <span className="text-sm text-gray-500 ml-1 w-[6ch]">
                {step} of 5
              </span>
            </div>
          )}
          <div className="w-4/5 text-slate-900">
            <h2 className="text-xl text-blue-500 font-semibold mb-4">
              {step === 6
                ? 'Consultation Booked'
                : `Help us understand you better`}
            </h2>
            {renderStepContent()}
          </div>
          <div className="flex w-full justify-between mt-4">
            {step < 6 && (
              <button
                onClick={handlePreviousStep}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full">
                Previous
              </button>
            )}
            {step < 5 && (
              <button
                onClick={handleNextStep}
                disabled={!isStepValid()}
                className="bg-blue-500 ml-auto hover:bg-blue-600 text-white py-2 px-4 rounded-full disabled:bg-blue-100">
                Next
              </button>
            )}
            {step == 5 && (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="bg-blue-500 ml-auto hover:bg-blue-600 text-white py-2 px-4 rounded-full disabled:bg-blue-100">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
