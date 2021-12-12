import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App serviceConfig={null}/>);
  const linkElement = screen.getByText(/RCS Photography/i);
  expect(linkElement).toBeInTheDocument();
});
