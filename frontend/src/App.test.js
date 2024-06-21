import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

describe('App loading state', () => {
  it('should display spinner when loading is true', () => {
    // Render the App component with loading set to true
    render(<App />, { initialState: { loading: true } });

    // Assert that the spinner is rendered
    const spinnerElement = screen.getByTestId('app-spinner');
    expect(spinnerElement).toBeInTheDocument();
  });
});