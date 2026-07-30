//frontend/src/Calculator.tsx
import React, { useState, useEffect, useCallback } from 'react';
import Display from './components/Display';
import Keypad from './components/Keypad';
import { calculate, healthCheck } from './api/client';
import './Calculator.css';

type Operation = 'add' | 'subtract' | 'multiply' | 'divide' | 'exponentiate' | 'percentOf' | null;

const opSymbol: Record<Exclude<Operation, null>, string> = {
  add: '+',
  subtract: '−',
  multiply: '×',
  divide: '÷',
  exponentiate: '^',
  percentOf: '%×',
};

const opMap: Record<string, Operation> = {
  '+': 'add',
  '-': 'subtract',
  '−': 'subtract',
  '×': 'multiply',
  '÷': 'divide',
  'xʸ': 'exponentiate',
};

const formatNumber = (n: number): string => {
  if (!isFinite(n)) return 'Error';
  const rounded = Math.round(n * 1e8) / 1e8;
  return rounded.toString();
};

const getFontSize = (text: string): string => {
  const len = text.length;
  if (len <= 8) return '28px';
  if (len <= 12) return '22px';
  if (len <= 16) return '17px';
  if (len <= 22) return '13px';
  return '11px';
};

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [operand, setOperand] = useState('');
  const [accumulator, setAccumulator] = useState<number | null>(null);
  const [pendingOp, setPendingOp] = useState<Operation>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isFinal, setIsFinal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    healthCheck().then((ok) => {
      setIsConnected(ok);
      setError(ok ? null : '⚠️ Backend not reachable');
    });
  }, []);

const updatePreview = useCallback(
  async (a: number, b: number, op: Exclude<Operation, null>) => {
    if (op === 'percentOf') {
      setPreview(formatNumber((a / 100) * b));
      return;
    }
    try {
      const res = await calculate({ operation: op, a, b });
      if (res.error) {
        setPreview(null);
        return;
      }
      setPreview(formatNumber(res.result as number));
    } catch {
      /* live preview: fail silently */
    }
  },
  []
);

  const handleDigit = (value: string) => {
    if (error) setError(null);

    if (isFinal) {
      const first = value === '.' ? '0.' : value;
      setExpression(first);
      setOperand(first);
      setAccumulator(null);
      setPendingOp(null);
      setPreview(null);
      setIsFinal(false);
      return;
    }

    if (value === '.' && operand.includes('.')) return;

    const nextOperand =
      operand === '' || operand === '0'
        ? value === '.'
          ? '0.'
          : value
        : operand + value;

    setOperand(nextOperand);
    setExpression((prev) => {
      const base = operand === '' ? prev : prev.slice(0, prev.length - operand.length);
      return base + nextOperand;
    });

    if (pendingOp && accumulator !== null) {
      const num = parseFloat(nextOperand);
      if (!isNaN(num)) updatePreview(accumulator, num, pendingOp);
    }
  };

const handleOperation = (symbol: string) => {
  const op = opMap[symbol];
  if (!op) return;
  if (error) setError(null);

  if (op === 'subtract' && operand === '' && (pendingOp || accumulator === null)) {
    setOperand('-');
    setExpression((prev) => prev + '-');
    return;
  }


  if (operand === '' && accumulator === null) return;

  if (pendingOp && operand === '' && accumulator !== null) {
    setPendingOp(op);
    setExpression((prev) => prev.slice(0, -1) + opSymbol[op]);
    return;
  }

  const num = operand === '' ? accumulator ?? 0 : parseFloat(operand);
  if (isNaN(num)) return;

  if (pendingOp && accumulator !== null && operand !== '') {
    const result = preview !== null ? parseFloat(preview) : num;
    setAccumulator(result);
  } else if (accumulator === null) {
    setAccumulator(num);
  }

  setExpression((prev) => prev + opSymbol[op]);
  setPendingOp(op);
  setOperand('');
  setPreview(null);
  setIsFinal(false);
};

const handleUnary = async (symbol: string) => {
  if (error) setError(null);
  if (operand === '' && accumulator === null) return;

  if (symbol === '%') {
    const num = operand !== '' ? parseFloat(operand) : accumulator ?? 0;
    if (isNaN(num)) return;
    setExpression((prev) => {
      const base = operand !== '' ? prev.slice(0, prev.length - operand.length) : prev;
      return `${base}${num}%×`;
    });
    setAccumulator(num);
    setPendingOp('percentOf');
    setOperand('');
    setPreview(formatNumber(num / 100));
    setIsFinal(false);
    return;
  }

  const num = operand !== '' ? parseFloat(operand) : accumulator ?? 0;
  if (isNaN(num)) return;

  try {
    const res = await calculate({ operation: 'sqrt', num });
    if (res.error) {
      setError(res.error);
      return;
    }
    const label = `√(${num})`;
    const formatted = formatNumber(res.result as number);
    setExpression((prev) =>
      operand !== '' ? prev.slice(0, prev.length - operand.length) + label : prev + label
    );
    setOperand(formatted);
    setPreview(formatted);
    setIsFinal(true);
  } catch {
    setError('⚠️ Calculation failed');
  }
};

 const handleEquals = async () => {
  if (!pendingOp || accumulator === null || operand === '') return;
  const num = parseFloat(operand);
  if (isNaN(num)) return;

  if (pendingOp === 'percentOf') {
    const result = (accumulator / 100) * num;
    const formatted = formatNumber(result);
    setPreview(formatted);
    setAccumulator(result);
    setPendingOp(null);
    setOperand(formatted);
    setIsFinal(true);
    return;
  }

  try {
    const res = await calculate({ operation: pendingOp, a: accumulator, b: num });
    if (res.error) {
      setError(res.error);
      return;
    }
    const formatted = formatNumber(res.result as number);
    setPreview(formatted);
    setAccumulator(res.result as number);
    setPendingOp(null);
    setOperand(formatted);
    setIsFinal(true);
  } catch {
    setError('⚠️ Calculation failed');
  }
};

  const handleClear = () => {
    setExpression('');
    setOperand('');
    setAccumulator(null);
    setPendingOp(null);
    setPreview(null);
    setIsFinal(false);
    setError(null);
  };

  return (
    <div className="calc-stage">
      <div className="calc-cards">
        <img src="https://rlndbgiqcmtxyrefwujo.supabase.co/storage/v1/object/public/sezzle/img1.png" className="calc-card card-1" alt="" />
        <img src="https://rlndbgiqcmtxyrefwujo.supabase.co/storage/v1/object/public/sezzle/img2.png" className="calc-card card-2" alt="" />
        <img src="https://rlndbgiqcmtxyrefwujo.supabase.co/storage/v1/object/public/sezzle/img3.png" className="calc-card card-3" alt="" />
        <img src="https://rlndbgiqcmtxyrefwujo.supabase.co/storage/v1/object/public/sezzle/img4.png" className="calc-card card-4" alt="" />
        <img src="https://rlndbgiqcmtxyrefwujo.supabase.co/storage/v1/object/public/sezzle/img5.png" className="calc-card card-5" alt="" />
        <img src="https://rlndbgiqcmtxyrefwujo.supabase.co/storage/v1/object/public/sezzle/img6.png" className="calc-card card-6" alt="" />
      </div>

      <div className="calculator-container">
        <h1>Sezzle Calculator</h1>
        {!isConnected && <div className="connection-status error">⚠️ Backend not reachable, start de server running: <b><i>"go run main.go"</i></b></div>}
        <div className="calculator">
          <Display
            expression={expression || '0'}
            result={preview}
            isFinal={isFinal}
            fontSize={getFontSize(expression || '0')}
          />
          {error && <div className="error-message">{error}</div>}
          <Keypad
            onButtonClick={handleDigit}
            onOperation={handleOperation}
            onUnary={handleUnary}
            onCalculate={handleEquals}
            onClear={handleClear}
          />
        </div>
        <div className="footer">
          <span>Status: {isConnected ? '✅ Connected' : '❌ Disconnected, start de server running: "go run main.go"'}</span>
        </div>
      </div>
    </div>
  );
};

export default Calculator;