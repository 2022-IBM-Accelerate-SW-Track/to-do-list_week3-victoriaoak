import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp("5/30/2023", "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
 });



 test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  // the first task
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element);

  // duplicating the task
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp("5/30/2023", "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: ""}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element);
  const check = screen.queryByText(/History Test/i);
  expect(check).toBeNull();
  const check_empty = screen.getByText(/You have no todo's left/i);
  expect(check_empty).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: ""}});
  fireEvent.click(element);
  const check = screen.queryByText(new RegExp("5/30/2023", "i"));
  expect(check).toBeNull();
  const check_empty = screen.getByText(/You have no todo's left/i);
  expect(check_empty).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp("5/30/2023", "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();

  // delete the task
  const del = screen.getByRole("checkbox");
  fireEvent.click(del);
  const check_empty = screen.getByText(/You have no todo's left/i);
  expect(check_empty).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp("5/30/2023", "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
  const historyCheck = screen.getByTestId(/History Test/i).style.background
  // "#ff7f7f"
  expect(historyCheck).toBe("rgb(255, 255, 255)")


  const inputTask_late = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate_late = screen.getByPlaceholderText("mm/dd/yyyy");
  const element_late = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask_late, { target: { value: "Calculus Test"}});
  fireEvent.change(inputDate_late, { target: { value: "05/30/2021"}});
  fireEvent.click(element_late);
  const check_late = screen.getByText(/Calculus Test/i);
  const checkDate_late = screen.getByText(new RegExp("5/30/2021", "i"));
  expect(check_late).toBeInTheDocument();
  expect(checkDate_late).toBeInTheDocument();
  const calcCheck_late = screen.getByTestId(/Calculus Test/i).style.background
  expect(calcCheck_late).toBe("rgb(255, 127, 127)")

 });
