//frontend/src/components/Keypad.tsx

interface KeypadProps {
  onButtonClick: (value: string) => void;
  onOperation: (op: string) => void;
  onUnary: (op: string) => void;
  onCalculate: () => void;
  onClear: () => void;
}

const BINARY = ['+', '-', '×', '÷', 'xʸ'];
const UNARY = ['%', '√'];

const Keypad: React.FC<KeypadProps> = ({
  onButtonClick,
  onOperation,
  onUnary,
  onCalculate,
  onClear,
}) => {
  const buttons = [
    ['%', '√', 'xʸ', 'C'],
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  const handleClick = (value: string) => {
    if (value === '=') onCalculate();
    else if (value === 'C') onClear();
    else if (BINARY.includes(value)) onOperation(value);
    else if (UNARY.includes(value)) onUnary(value);
    else onButtonClick(value);
  };

  return (
    <div className="calculator-keypad">
      {buttons.map((row, i) => (
        <div key={i} className="keypad-row">
          {row.map((btn) => (
            <button
              key={btn}
              className={`key-btn
                ${BINARY.includes(btn) ? 'operator' : ''}
                ${UNARY.includes(btn) ? 'unary' : ''}
                ${btn === 'C' ? 'clear' : ''}`}
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keypad;