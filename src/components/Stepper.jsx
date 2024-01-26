/* eslint-disable react/prop-types */
import {FaCheckCircle} from 'react-icons/fa';

// eslint-disable-next-line no-unused-vars
const Stepper = ({steps, currentStep}) => {
  return (
    <div className="flex mb-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center gap-2">
            <div className={`w-fit h-fit flex rounded-full bg-gray-300`}>
              <FaCheckCircle
                className="transition-all duration-700"
                size={'2rem'}
                color={index < currentStep ? 'rgb(59 130 246)' : ''}
              />
            </div>
            <div
              className={`max-lg:hidden transition-all duration-700 ${
                index < currentStep ? `text-blue-300` : `text-gray-300`
              } text-sm`}>
              {step}
            </div>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`flex-1 w-[6vh] h-0.5 transition-all duration-700 ${
                index < currentStep - 1 ? `bg-blue-500` : `bg-gray-300`
              }`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
