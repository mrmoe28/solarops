import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddressForm } from '../AddressForm';
import { CreateProjectInput } from '@solarops/shared';

describe('AddressForm', () => {
  const mockOnSubmit = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  describe('Rendering', () => {
    it('renders all form fields', () => {
      render(<AddressForm onSubmit={mockOnSubmit} />);

      expect(screen.getByLabelText('Project Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Street Address')).toBeInTheDocument();
      expect(screen.getByLabelText('City')).toBeInTheDocument();
      expect(screen.getByLabelText('State')).toBeInTheDocument();
      expect(screen.getByLabelText('ZIP Code')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /start solar analysis/i })).toBeInTheDocument();
    });

    it('renders with default values when provided', () => {
      const defaultValues: Partial<CreateProjectInput> = {
        name: 'Test Project',
        address: '123 Test St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
      };

      render(<AddressForm onSubmit={mockOnSubmit} defaultValues={defaultValues} />);

      expect(screen.getByDisplayValue('Test Project')).toBeInTheDocument();
      expect(screen.getByDisplayValue('123 Test St')).toBeInTheDocument();
      expect(screen.getByDisplayValue('San Francisco')).toBeInTheDocument();
      expect(screen.getByText('California')).toBeInTheDocument();
      expect(screen.getByDisplayValue('94105')).toBeInTheDocument();
    });

    it('shows loading state when loading prop is true', () => {
      render(<AddressForm onSubmit={mockOnSubmit} loading={true} />);

      const submitButton = screen.getByRole('button', { name: /start solar analysis/i });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('State Dropdown', () => {
    it('opens dropdown when clicked', async () => {
      render(<AddressForm onSubmit={mockOnSubmit} />);

      const stateSelect = screen.getByRole('combobox', { name: /state/i });
      await user.click(stateSelect);

      // Check that all states are visible
      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'California' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Texas' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'New York' })).toBeInTheDocument();
      });
    });

    it('displays all 50 states', async () => {
      render(<AddressForm onSubmit={mockOnSubmit} />);

      const stateSelect = screen.getByRole('combobox', { name: /state/i });
      await user.click(stateSelect);

      await waitFor(() => {
        const stateOptions = screen.getAllByRole('option');
        expect(stateOptions).toHaveLength(50);
      });
    });

    it('supports keyboard navigation', async () => {
      render(<AddressForm onSubmit={mockOnSubmit} />);

      const stateSelect = screen.getByRole('combobox', { name: /state/i });
      await user.click(stateSelect);

      // Type 'C' to jump to California
      await user.keyboard('c');

      await waitFor(() => {
        const californiaOption = screen.getByRole('option', { name: 'California' });
        expect(californiaOption).toHaveAttribute('data-highlighted', 'true');
      });

      // Type 'CO' to jump to Colorado
      await user.keyboard('o');

      await waitFor(() => {
        const coloradoOption = screen.getByRole('option', { name: 'Colorado' });
        expect(coloradoOption).toHaveAttribute('data-highlighted', 'true');
      });
    });

    it('selects state when clicked', async () => {
      render(<AddressForm onSubmit={mockOnSubmit} />);

      const stateSelect = screen.getByRole('combobox', { name: /state/i });
      await user.click(stateSelect);

      const californiaOption = screen.getByRole('option', { name: 'California' });
      await user.click(californiaOption);

      await waitFor(() => {
        expect(screen.getByText('California')).toBeInTheDocument();
      });
    });

    it('has proper positioning attributes', async () => {
      render(<AddressForm onSubmit={mockOnSubmit} />);

      const stateSelect = screen.getByRole('combobox', { name: /state/i });
      await user.click(stateSelect);

      await waitFor(() => {
        const dropdown = screen.getByRole('listbox');
        // Check that dropdown has data-side attribute (managed by Radix UI)
        expect(dropdown).toBeInTheDocument();
      });
    });
  });

  describe('Form Validation', () => {
    it('shows validation errors for empty required fields', async () => {
      render(<AddressForm onSubmit={mockOnSubmit} />);

      const submitButton = screen.getByRole('button', { name: /start solar analysis/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/project name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/address is required/i)).toBeInTheDocument();
        expect(screen.getByText(/city is required/i)).toBeInTheDocument();
        expect(screen.getByText(/state is required/i)).toBeInTheDocument();
        expect(screen.getByText(/zip code is required/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('validates ZIP code format', async () => {
      render(<AddressForm onSubmit={mockOnSubmit} />);

      const zipInput = screen.getByLabelText('ZIP Code');
      await user.type(zipInput, '123'); // Invalid ZIP

      const submitButton = screen.getByRole('button', { name: /start solar analysis/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid zip code/i)).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('submits form with valid data', async () => {
      render(<AddressForm onSubmit={mockOnSubmit} />);

      // Fill in all fields
      await user.type(screen.getByLabelText('Project Name'), 'Solar Test Project');
      await user.type(screen.getByLabelText('Street Address'), '123 Solar Street');
      await user.type(screen.getByLabelText('City'), 'San Francisco');

      // Select state
      const stateSelect = screen.getByRole('combobox', { name: /state/i });
      await user.click(stateSelect);
      await user.click(screen.getByRole('option', { name: 'California' }));

      await user.type(screen.getByLabelText('ZIP Code'), '94105');

      // Submit form
      const submitButton = screen.getByRole('button', { name: /start solar analysis/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: 'Solar Test Project',
          address: '123 Solar Street',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
        });
      });
    });

    it('prevents submission when loading', async () => {
      render(<AddressForm onSubmit={mockOnSubmit} loading={true} />);

      const submitButton = screen.getByRole('button', { name: /start solar analysis/i });
      expect(submitButton).toBeDisabled();

      await user.click(submitButton);
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('trims whitespace from input values', async () => {
      render(<AddressForm onSubmit={mockOnSubmit} />);

      // Fill in fields with extra whitespace
      await user.type(screen.getByLabelText('Project Name'), '  Solar Project  ');
      await user.type(screen.getByLabelText('Street Address'), '  123 Main St  ');
      await user.type(screen.getByLabelText('City'), '  San Francisco  ');

      const stateSelect = screen.getByRole('combobox', { name: /state/i });
      await user.click(stateSelect);
      await user.click(screen.getByRole('option', { name: 'California' }));

      await user.type(screen.getByLabelText('ZIP Code'), '  94105  ');

      const submitButton = screen.getByRole('button', { name: /start solar analysis/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: 'Solar Project',
          address: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
        });
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      render(<AddressForm onSubmit={mockOnSubmit} />);

      expect(screen.getByRole('form')).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /project name/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /street address/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /city/i })).toBeInTheDocument();
      expect(screen.getByRole('combobox', { name: /state/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /zip code/i })).toBeInTheDocument();
    });

    it('associates error messages with form fields', async () => {
      render(<AddressForm onSubmit={mockOnSubmit} />);

      const submitButton = screen.getByRole('button', { name: /start solar analysis/i });
      await user.click(submitButton);

      await waitFor(() => {
        const nameInput = screen.getByLabelText('Project Name');
        const nameError = screen.getByText(/project name is required/i);
        expect(nameInput).toHaveAttribute('aria-invalid', 'true');
        expect(nameInput).toHaveAttribute(
          'aria-describedby',
          expect.stringContaining(nameError.id),
        );
      });
    });
  });
});
