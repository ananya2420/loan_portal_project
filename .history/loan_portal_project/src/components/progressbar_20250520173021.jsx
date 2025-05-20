
//form rogress indicator 


// src/components/ProgressBar.jsx
import ProgressBar from '../components/progressbar';

// ...

const PersonalInfo = () => {
  // ...

  const totalFields = 5; // total steps for personal info
  const stepsLabels = ['First Name', 'Last Name', 'City', 'State', 'Phone'];

  // validFieldsCount is your current step in progress bar
  const validFieldsCount = Object.keys(allFields).filter(
    (field) => allFields[field] && !errors[field]
  ).length;

  // ...

  return (
    // ...
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className={`p-8 rounded-lg shadow-md w-full max-w-md transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Progress Bar */}
        <ProgressBar currentStep={validFieldsCount} totalSteps={totalFields} stepsLabels={stepsLabels} />

        {/* rest of your form */}
      </form>
    // ...
  );
};
