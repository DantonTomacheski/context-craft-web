import { render, screen, fireEvent } from '@testing-library/react'
import { ToolCard } from '@/components/ToolCard'
import '@testing-library/jest-dom'

describe('ToolCard', () => {
  it('renders title and description', () => {
    render(<ToolCard title="Test Tool" description="A tool for testing." />)
    expect(screen.getByText('Test Tool')).toBeInTheDocument()
    expect(screen.getByText('A tool for testing.')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<ToolCard title="Clickable" description="Click me!" onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })
})
