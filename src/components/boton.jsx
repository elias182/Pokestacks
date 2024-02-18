import React from 'react';

const CalculatorButtons = ({ handleButtonClick }) => {
  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
  ];

  return (
    <div className="calculator-buttons">
      {buttons.map((button, index) => (
        <button key={index} onClick={() => handleButtonClick(button)}>
          {button}
        </button>
      ))}
    </div>
  );
};

export default CalculatorButtons;