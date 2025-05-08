
import React{ useContext } from 'react';
import { formContext } from '../context/FormContext';


const ProgressBar = () => {
  const { page, title } = useContext(formContext);

  const interval = 100 / Object.keys(title).length;
  const progress = ((page + 1) * interval).toFixed(2);

  const steps = Object.keys(title).map((step, i) => (
    <div key={i} className="barmarker">
      Step {parseInt(step) + 1}
    </div>
  ));

  return (
    <section className="progress-container">
      <div className="barmarker-ccontainer">{steps}</div>
      <progress className="progress" max="100" value={progress}></progress>
    </section>
  );
};

export default ProgressBar;