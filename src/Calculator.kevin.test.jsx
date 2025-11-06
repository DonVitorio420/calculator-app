// src/Calculator.kevin.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import Calculator from './Calculator'

describe('Calculator - pruebas de Kevin', () => {
  test('muestra error con entrada no numérica', () => {
    render(<Calculator />)
    fireEvent.change(screen.getByLabelText(/primer-numero/i), { target: { value: 'abc' } })
    fireEvent.change(screen.getByLabelText(/segundo-numero/i), { target: { value: '5' } })
    fireEvent.click(screen.getByRole('button', { name: /calcular/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/ingrese números válidos/i)
  })

  test('suma números negativos correctamente', () => {
    render(<Calculator />)
    fireEvent.change(screen.getByLabelText(/primer-numero/i), { target: { value: '-3' } })
    fireEvent.change(screen.getByLabelText(/segundo-numero/i), { target: { value: '-7' } })
    fireEvent.change(screen.getByLabelText(/operacion/i), { target: { value: 'add' } })
    fireEvent.click(screen.getByRole('button', { name: /calcular/i }))
    expect(screen.getByText(/resultado:/i)).toHaveTextContent('-10')
  })

  test('reset limpia campos, resultado y errores', () => {
    render(<Calculator />)
    fireEvent.change(screen.getByLabelText(/primer-numero/i), { target: { value: '10' } })
    fireEvent.change(screen.getByLabelText(/segundo-numero/i), { target: { value: '0' } })
    fireEvent.change(screen.getByLabelText(/operacion/i), { target: { value: 'div' } })
    fireEvent.click(screen.getByRole('button', { name: /calcular/i }))

    // Debe haber error por división entre cero
    expect(screen.getByRole('alert')).toHaveTextContent(/no se puede dividir por cero/i)

    // Click en "Limpiar"
    fireEvent.click(screen.getByRole('button', { name: /limpiar/i }))

    // Los inputs quedan vacíos y no hay alertas ni resultado
    expect(screen.getByLabelText(/primer-numero/i)).toHaveValue('')
    expect(screen.getByLabelText(/segundo-numero/i)).toHaveValue('')
    // No debe existir texto de error ni resultado
    expect(screen.queryByRole('alert')).toBeNull()
    expect(screen.queryByText(/resultado:/i)).toBeNull()
  })
})