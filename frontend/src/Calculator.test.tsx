/* eslint-disable testing-library/no-node-access, testing-library/no-container */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Calculator from './Calculator';
import * as api from './api/client';

jest.mock('./api/client');

const mockCalculate = api.calculate as jest.MockedFunction<typeof api.calculate>;
const mockHealthCheck = api.healthCheck as jest.MockedFunction<typeof api.healthCheck>;

describe('Calculator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHealthCheck.mockResolvedValue(true);
  });

  test('renders with initial display 0', async () => {
    render(<Calculator />);
    await waitFor(() => {
      expect(mockHealthCheck).toHaveBeenCalled();
    });
    expect(document.querySelector('.expression')).toHaveTextContent('0');
  });

  test('handles digit input', async () => {
    render(<Calculator />);
    await waitFor(() => {
      expect(mockHealthCheck).toHaveBeenCalled();
    });
    fireEvent.click(screen.getByText('7'));
    expect(document.querySelector('.expression')).toHaveTextContent('7');
  });

  test('performs addition', async () => {
    mockCalculate.mockResolvedValueOnce({ result: 7 });
    render(<Calculator />);
    await waitFor(() => {
      expect(mockHealthCheck).toHaveBeenCalled();
    });
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    await waitFor(() => {
      expect(document.querySelector('.result')).toHaveTextContent('7');
    });
    expect(mockCalculate).toHaveBeenCalledWith({
      operation: 'add',
      a: 4,
      b: 3,
    });
  });

  test('handles division by zero error', async () => {
    mockCalculate.mockRejectedValueOnce({
      response: { data: { error: 'division by zero' } },
    });
    render(<Calculator />);
    await waitFor(() => {
      expect(mockHealthCheck).toHaveBeenCalled();
    });
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('÷'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('='));
    await waitFor(() => {
      expect(screen.getByText('⚠️ Calculation failed')).toBeInTheDocument();
    });
  });

  test('clear button resets display', async () => {
    render(<Calculator />);
    await waitFor(() => {
      expect(mockHealthCheck).toHaveBeenCalled();
    });
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('C'));
    expect(document.querySelector('.expression')).toHaveTextContent('0');
  });

  test('handles sqrt unary operation', async () => {
    mockCalculate.mockResolvedValueOnce({ result: 4 });
    render(<Calculator />);
    await waitFor(() => {
      expect(mockHealthCheck).toHaveBeenCalled();
    });
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('6'));
    fireEvent.click(screen.getByText('√'));
    await waitFor(() => {
      expect(document.querySelector('.expression')).toHaveTextContent('√(16)');
    });
  });
});