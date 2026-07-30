import { render, screen } from '@testing-library/react';
import Display from './Display';

describe('Display', () => {
  test('renders expression and result', () => {
    render(
      <Display
        expression="4 + 3"
        result="7"
        isFinal={true}
        fontSize="24px"
      />
    );
    expect(screen.getByText('4 + 3')).toBeInTheDocument();
    const resultElement = screen.getByTestId('result');
    expect(resultElement).toHaveTextContent('7');
  });

  test('shows non-breaking space when result is null', () => {
    render(
      <Display
        expression="4 + "
        result={null}
        isFinal={false}
        fontSize="24px"
      />
    );
    const resultElement = screen.getByTestId('result');
    expect(resultElement).toBeInTheDocument();
    expect(resultElement.textContent).toBe('\u00A0');
  });
});