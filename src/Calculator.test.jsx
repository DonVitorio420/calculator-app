import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

test('suma 2 + 3 = 5', () => {
  render(<Calculator />);
  fireEvent.change(screen.getByLabelText(/primer-numero/i), { target: { value: '2' } });
  fireEvent.change(screen.getByLabelText(/segundo-numero/i), { target: { value: '3' } });
  fireEvent.change(screen.getByLabelText(/operacion/i), { target: { value: 'add' } });
  fireEvent.click(screen.getByText(/calcular/i));
  expect(screen.getByText(/resultado:/i)).toHaveTextContent('5');
});

test('error al dividir por cero', () => {
  render(<Calculator />);
  fireEvent.change(screen.getByLabelText(/primer-numero/i), { target: { value: '10' } });
  fireEvent.change(screen.getByLabelText(/segundo-numero/i), { target: { value: '0' } });
  fireEvent.change(screen.getByLabelText(/operacion/i), { target: { value: 'div' } });
  fireEvent.click(screen.getByText(/calcular/i));
  expect(screen.getByRole('alert')).toHaveTextContent(/no se puede dividir por cero/i);
});

test('valida entradas no numéricas', () => {
  render(<Calculator />);
  fireEvent.change(screen.getByLabelText(/primer-numero/i), { target: { value: 'a' } });
  fireEvent.change(screen.getByLabelText(/segundo-numero/i), { target: { value: '1' } });
  fireEvent.click(screen.getByText(/calcular/i));
  expect(screen.getByRole('alert')).toHaveTextContent(/ingrese números válidos/i);
});
