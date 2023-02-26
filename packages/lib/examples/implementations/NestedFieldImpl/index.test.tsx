import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { NestedFieldImpl } from '.';

describe('Complex Form implementation', () => {
  it('submit button is enabled after fill form', async () => {
    render(() => <NestedFieldImpl />);
    fireEvent.click(screen.getByTestId('fill'));
    await waitFor(() => {
      expect((screen.getByTestId('submit') as HTMLButtonElement).disabled).toBe(false);
      expect(screen.getByTestId('form-status').innerHTML).toBe('Valid');
    });
  });

  it('submit button is disabled after submitting form', async () => {
    render(() => <NestedFieldImpl />);
    fireEvent.click(screen.getByTestId('fill'));
    fireEvent.click(screen.getByTestId('submit'));
    await waitFor(() => {
      expect((screen.getByTestId('submit') as HTMLButtonElement).disabled).toBe(true);
      expect(screen.getByTestId('form-status').innerHTML).toBe('Invalid');
    });
  });

  it('nested contact field is invalid', async () => {
    render(() => <NestedFieldImpl />);
    fireEvent.click(screen.getByTestId('fill'));
    fireEvent.input(screen.getByTestId('contact.email'), { target: { value: '' } });
    fireEvent.input(screen.getByTestId('contact.phone'), { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByTestId('contact-status').innerHTML).toBe('Invalid');
    });
  });

  it("error message should not appear on conditional validation when the field hasn't been touched", async () => {
    render(() => <NestedFieldImpl />);
    fireEvent.input(screen.getByTestId('hasHouse'), { target: { checked: true } });
    await waitFor(() => {
      expect(screen.getByTestId('houseAddress-error').innerHTML).toBe('');
    });
  });

  it('error message should appear on conditional validation when the field has been touched', async () => {
    render(() => <NestedFieldImpl />);
    fireEvent.input(screen.getByTestId('hasHouse'), { target: { checked: true } });
    fireEvent.input(screen.getByTestId('houseAddress'), { target: { value: 'Street 123' } });
    fireEvent.input(screen.getByTestId('houseAddress'), { target: { value: '' } });
    fireEvent.input(screen.getByTestId('hasHouse'), { target: { checked: false } });
    fireEvent.input(screen.getByTestId('hasHouse'), { target: { checked: true } });
    await waitFor(() => {
      expect(screen.getByTestId('houseAddress-error').innerHTML).toBe('houseAddress is a required field');
    });
  });
});
