import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import axios from 'axios';

jest.mock('axios');

beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

// Test 1: App Heading Exists
test('React_BuildUIComponents_ReactAppHeadingRender', () => {
  render(<App />);
  const heading = screen.getByText(/Debt Repayment Planner/i);
  expect(heading).toBeInTheDocument();
});

// Test 2: Loan Form LoanName Field Exists
test('React_BuildUIComponents_LoanFormLoanNameFieldExists', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Loan Name/i);
  expect(input).toBeInTheDocument();
});

// Test 3: Update LoanName State
test('React_BuildUIComponents_UpdateLoanNameState', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Loan Name/i);
  fireEvent.change(input, { target: { value: 'Car Loan' } });
  expect(input.value).toBe('Car Loan');
});

// Test 4: Update Principal Field
test('React_BuildUIComponents_UpdatePrincipalState', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Principal/i);
  fireEvent.change(input, { target: { value: '50000' } });
  expect(input.value).toBe('50000');
});

// Test 5: Update Interest Rate Field
test('React_BuildUIComponents_UpdateInterestRateState', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Interest Rate/i);
  fireEvent.change(input, { target: { value: '7.5' } });
  expect(input.value).toBe('7.5');
});

// Test 6: Update Term Field
test('React_BuildUIComponents_UpdateTermField', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Term \(Months\)/i);
  fireEvent.change(input, { target: { value: '24' } });
  expect(input.value).toBe('24');
});

// Test 7: Loan Submit Button Works
test('React_BuildUIComponents_LoanSubmitButtonExists', () => {
  render(<App />);
  const button = screen.getByText(/Add Loan/i);
  expect(button).toBeInTheDocument();
});

// Test 8: Repayment Method Dropdown Exists
test('React_BuildUIComponents_RepaymentMethodDropdownExists', () => {
  render(<App />);
  const dropdown = screen.getByDisplayValue(/snowball/i);
  expect(dropdown).toBeInTheDocument();
});

// Test 9: Switch Repayment Method
test('React_BuildUIComponents_SwitchRepaymentMethodToAvalanche', () => {
  render(<App />);
  const select = screen.getByDisplayValue(/snowball/i);
  fireEvent.change(select, { target: { value: 'avalanche' } });
  expect(select.value).toBe('avalanche');
});

// Test 10: Table Headers Exist
test('React_BuildUIComponents_RepaymentTableHeadersExist', () => {
  render(<App />);
  expect(screen.getByText(/Lender/i)).toBeInTheDocument();
  expect(screen.getByText(/Principal/i)).toBeInTheDocument();
  expect(screen.getByText(/Interest Rate/i)).toBeInTheDocument();
  expect(screen.getByText(/Term \(Months\)/i)).toBeInTheDocument();
});


