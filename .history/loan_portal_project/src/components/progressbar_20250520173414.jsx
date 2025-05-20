
//form rogress indicator 


// src/components/ProgressBar.jsx
// components/progressbar.jsx

const ProgressBar = ({ currentStep,  stepsLabels }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      {stepsLabels.map((label, index) => {
        const stepIndex = index + 1;
        const completed = currentStep > stepIndex;
        const active = currentStep === stepIndex;

        return (
          <div key={index} className="flex flex-col items-center w-full">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                completed ? 'bg-blue-600' : active ? 'bg-blue-400' : 'bg-gray-300'
              }`}
            >
              {stepIndex}
            </div>
            <div
              className={`mt-1 text-center text-xs ${
                active ? 'text-blue-600 font-semibold' : completed ? 'text-gray-600' : 'text-gray-400'
              }`}
            >
              {label}
            </div>
            {index < stepsLabels.length - 1 && (
              <div
                className={`flex-1 h-1 mt-3 mx-2 rounded ${
                  completed ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
