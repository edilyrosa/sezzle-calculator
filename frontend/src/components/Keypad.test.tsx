import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Keypad from './Keypad';

describe('Keypad', () => {
  const mockOnButtonClick = jest.fn();
  const mockOnOperation = jest.fn();
  const mockOnUnary = jest.fn();
  const mockOnCalculate = jest.fn();
  const mockOnClear = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('renders all buttons', () => {
    render(
      <Keypad
        onButtonClick={mockOnButtonClick}
        onOperation={mockOnOperation}
        onUnary={mockOnUnary}
        onCalculate={mockOnCalculate}
        onClear={mockOnClear}
      />
    );
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  test('calls onButtonClick for number', () => {
    render(
      <Keypad
        onButtonClick={mockOnButtonClick}
        onOperation={mockOnOperation}
        onUnary={mockOnUnary}
        onCalculate={mockOnCalculate}
        onClear={mockOnClear}
      />
    );
    fireEvent.click(screen.getByText('5'));
    expect(mockOnButtonClick).toHaveBeenCalledWith('5');
  });

  test('calls onOperation for binary operator', () => {
    render(
      <Keypad
        onButtonClick={mockOnButtonClick}
        onOperation={mockOnOperation}
        onUnary={mockOnUnary}
        onCalculate={mockOnCalculate}
        onClear={mockOnClear}
      />
    );
    fireEvent.click(screen.getByText('+'));
    expect(mockOnOperation).toHaveBeenCalledWith('+');
  });

  test('calls onUnary for unary operator', () => {
    render(
      <Keypad
        onButtonClick={mockOnButtonClick}
        onOperation={mockOnOperation}
        onUnary={mockOnUnary}
        onCalculate={mockOnCalculate}
        onClear={mockOnClear}
      />
    );
    fireEvent.click(screen.getByText('%'));
    expect(mockOnUnary).toHaveBeenCalledWith('%');
  });

  test('calls onCalculate for =', () => {
    render(
      <Keypad
        onButtonClick={mockOnButtonClick}
        onOperation={mockOnOperation}
        onUnary={mockOnUnary}
        onCalculate={mockOnCalculate}
        onClear={mockOnClear}
      />
    );
    fireEvent.click(screen.getByText('='));
    expect(mockOnCalculate).toHaveBeenCalled();
  });

  test('calls onClear for C', () => {
    render(
      <Keypad
        onButtonClick={mockOnButtonClick}
        onOperation={mockOnOperation}
        onUnary={mockOnUnary}
        onCalculate={mockOnCalculate}
        onClear={mockOnClear}
      />
    );
    fireEvent.click(screen.getByText('C'));
    expect(mockOnClear).toHaveBeenCalled();
  });
});