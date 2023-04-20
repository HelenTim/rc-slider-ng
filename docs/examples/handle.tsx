import React from 'react';
import Slider from '../../index';
import '../../assets/index.less';
import TooltipSlider, { handleRender } from '../../index';

const wrapperStyle = { width: 400, margin: 50 };

export default () => (
  <div>
    <div style={wrapperStyle}>
      <p>Slider with custom handle</p>
      <Slider min={0} max={20} defaultValue={3} handleRender={handleRender} />
    </div>
    <div style={wrapperStyle}>
      <p>Reversed Slider with custom handle</p>
      <Slider min={0} max={20} reverse defaultValue={3} handleRender={handleRender} />
    </div>
    <div style={wrapperStyle}>
      <p>Slider with fixed values</p>
      <Slider min={20} defaultValue={20} marks={{ 20: 20, 40: 40, 100: 100 }} step={null} />
    </div>
    <div style={wrapperStyle}>
      <p>Range with custom tooltip</p>
      <TooltipSlider
        disableds={[false, false]}
        range
        min={0}
        max={20}
        defaultValue={[3, 10]}
        tipFormatter={(value) => `${value}!`}
        allowCross={false}
        onChange={(value, index) => {
          //   console.log({ value });
          //     console.log({ index });
        }}
        onAfterChange={(value, index) => {
          //   console.log({ value });
          //   console.log({ index });
        }}
        onBeforeChange={(value, ref) => {
          console.log({ value });
          console.log({ index: ref });
        }}
      />
    </div>
    <div style={wrapperStyle}>
      <p>Keyboard events disabled</p>
      <Slider defaultValue={3} keyboard={false} />
    </div>
  </div>
);
