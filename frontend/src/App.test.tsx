/* eslint-disable testing-library/no-node-access, testing-library/no-container */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders default expression 0', () => {
  render(<App />);
  const displayExpression = document.querySelector('.expression');
  expect(displayExpression).toHaveTextContent('0');
});

test('clicking digit updates expression', () => {
  render(<App />);
  // Busca el botón que contiene '7' (podría ser el 4to botón de la fila)
  const buttons = document.querySelectorAll('button');
  const sevenButton = Array.from(buttons).find(btn => btn.textContent === '7');
  if (sevenButton) fireEvent.click(sevenButton);
  const displayExpression = document.querySelector('.expression');
  expect(displayExpression).toHaveTextContent('7');
});