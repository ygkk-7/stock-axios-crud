import { render, screen, fireEvent, waitFor, userEvent} from '@testing-library/react';
import CrudOperations from './crudOperationsHomework';

test('Enter Stock Details', () => {
  render(<CrudOperations />);
  const heading = screen.getByText(/Create/i);
  expect(heading).toBeInTheDocument();
});

test('Submit Button Clicked without ticker data',async ()=>{
  const result = render(<CrudOperations />);
  const tickerWarning = result.getByText(/Ticker cannot be empty/);
  fireEvent.submit(result.container.querySelector('#saveBtn'));
  await waitFor(() => expect(tickerWarning.toBeInTheDocument));
});

test('Submit Button Clicked with ticker data',async ()=>{
    const result = render(<CrudOperations />);
    const tickerInput = result.getByText(/Ticker$/);
    const tickerWarning = result.getByText(/Ticker cannot be empty/);
    fireEvent.change(tickerInput, { value: 'Ticker Value' } )
    fireEvent.submit(result.container.querySelector('#saveBtn'));
    await waitFor(() => expect(!tickerWarning.toBeInTheDocument));
  });

  test('Submit Button Clicked without org data',async ()=>{
    const result = render(<CrudOperations />);
    const tickerWarning = result.getByText(/Org cannot be empty/);
    fireEvent.submit(result.container.querySelector('#saveBtn'));
    await waitFor(() => expect(tickerWarning.toBeInTheDocument));
  });

  test('Submit Button Clicked with org data',async ()=>{
    const result = render(<CrudOperations />);
    const orgInput = result.getByText(/Organization/);
    const orgWarning = result.getByText(/Org cannot be empty/);
    fireEvent.change(orgInput, { value: 'Org Value' } )
    fireEvent.submit(result.container.querySelector('#saveBtn'));
    await waitFor(() => expect(!orgWarning.toBeInTheDocument));
  });