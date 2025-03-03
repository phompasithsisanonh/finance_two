import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders FinanceCalc title', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const titleElement = screen.getByText(/FinanceCalc/i); // เปลี่ยนเป็นข้อความที่อยู่ในหน้า
  expect(titleElement).toBeInTheDocument();
});