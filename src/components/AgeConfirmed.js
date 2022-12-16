import React, { useState } from 'react';
import ReactJoyride from 'react-joyride';

const OnboardingSteps = () => {
  const [joyride, setJoyride] = useState({
    run: false,
    steps: [
      {
        title: "Welcome to react-joyride!",
        target: "body",
        placement: "center",
        content: <div><h4>The simplest way to onboard users.</h4><p>This appears in the center of the page because the target element in the Joyride step definition is 'body' and the placement is 'center'.</p></div>,
        disableBeacon: true,
      },
      {
        title: "Welcome to react-joyride!",
        target: "body",
        placement: "center",
        content: <div><h4>The simplest way to onboard users.</h4><p>This appears in the center of the page because the target element in the Joyride step definition is 'body' and the placement is 'center'.</p></div>,
        disableBeacon: true,
      },
      {
        title: "Welcome to react-joyride!",
        target: "body",
        placement: "center",
        content: <div><h4>The simplest way to onboard users.</h4><p>This appears in the center of the page because the target element in the Joyride step definition is 'body' and the placement is 'center'.</p></div>,
        disableBeacon: true,
      },
    ]
  });

  return (<React.Fragment>
    <div className='mt-96' style={{ marginLeft: "10%", marginRight: "auto" }}>
      <button
        onClick={() => { setJoyride({ ...joyride, run: !joyride.run }); }}
        style={{ backgroundColor: "#ff0044", color: "white", border: "none", fontSize: "24px", padding: "15px 32px", cursor: "pointer", borderRadius: "10px" }}>Take The Tour</button>
    </div>
    <ReactJoyride 
      steps={joyride.steps}
      run={joyride.run}
      continuous
      showProgress
      showSkipButton
      styles={{
            options: {
              arrowColor: '#e3ffeb',
              backgroundColor: '#e3ffeb',
              overlayColor: 'rgba(79, 26, 0, 0.4)',
              primaryColor: '#000',
              textColor: '#004a14',
              width: "100vw",
              zIndex: 1000,
              height: '100%',
            }
          }}
       />
  </React.Fragment>);
};

export default OnboardingSteps
