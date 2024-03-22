// components/RangeSlider.jsx
import React from "react";
import Slider from "react-slider";

const RangeSlider = ({ min, max, step, values, onChange }) => {
  return (
    <div className="relative">
      <Slider
        min={min}
        max={max}
        step={step}
        values={values}
        onChange={onChange}
        renderThumb={(props, state) => (
          <div
            {...props}
            className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {state.valueNow}
          </div>
        )}
        renderTrack={(props, state) => (
          <div
            {...props}
            className={`h-2 w-full rounded-full bg-secondary`}
          />
        )}
        renderTrackHighlight={(props, state) => (
          <div
            {...props}
            className={`h-2 w-full rounded-full bg-primary`}
          />
        )}
      />
    </div>
  );
};

export default RangeSlider;

