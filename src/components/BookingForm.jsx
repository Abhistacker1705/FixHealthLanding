import axios from 'axios';
import {useState, useEffect} from 'react';
import Stepper from './Stepper';
import DoctorsView from './DoctorsView';

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
      setCity(urlCity.toLowerCase());
    } else setCity('');
  }, [urlCity]);

  useEffect(() => {
    // Fetch doctors data from the API
    fetchDoctorsData().then((data) => {
      setDoctors(data);
    });
  }, []);

  //steps
  const steps = [
    'Your Information',
    'Personal Details',
    'Chief Complaints',
    'Physiotherapy Experience',
    'Select a Doctor',
  ];

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
            <div className="testimonial flex gap-4 min-w-screen h-fit overflow-x-auto">
              {doctors
                .filter(
                  (doctor) => doctor.city.toLowerCase() == city.toLowerCase()
                )
                .map((doctor, index) => (
                  <DoctorsView
                    key={doctor.name}
                    selectedDoctor={selectedDoctor}
                    handleDoctorSelection={handleDoctorSelection}
                    idx={index}
                    doctor={doctor}
                  />
                ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col text-neutral-50 gap-4 justify-center items-center mb-4">
            <img
              className="animate-pulse"
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
      <div className="bg-gray-900 shadow-gray-00 shadow-2xl rounded-lg p-8">
        <div className="flex flex-col items-center mb-6">
          {step < 6 && <Stepper steps={steps} currentStep={step} />}
          <div className="w-4/5 text-slate-900">
            <h2 className="text-xl text-blue-500 font-semibold mb-4">
              {step === 6
                ? 'Consultation Booked'
                : `Help us understand you better`}
            </h2>
            {renderStepContent()}
            <div className="flex w-full justify-between mt-4">
              {step < 6 && step > 1 ? (
                <button
                  onClick={handlePreviousStep}
                  className="bg-blue-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full">
                  Previous
                </button>
              ) : null}
              {step < 5 && (
                <button
                  onClick={handleNextStep}
                  disabled={!isStepValid()}
                  className="bg-blue-500 ml-auto hover:bg-gray-600 text-white py-2 px-4 rounded-full disabled:bg-blue-100">
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
    </div>
  );
};

export default BookingForm;
