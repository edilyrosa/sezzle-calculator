//frontend/src/components/Display.tsx
interface DisplayProps {
  expression: string;
  result: string | null;
  isFinal: boolean;
  fontSize: string;
}

const Display: React.FC<DisplayProps> = ({ expression, result, isFinal, fontSize }) => (
  <div className="calculator-display">
    <div className="expression" style={{ fontSize }}>
      {expression}
    </div>
    <div
      className={`result ${isFinal ? 'result-final' : 'result-preview'} ${
        result !== null ? 'visible' : ''
      }`}
      data-testid="result"  
    >
      {result ?? '\u00A0'}
    </div>
  </div>
);

export default Display;