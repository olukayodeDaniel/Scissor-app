import { render, fireEvent } from "@testing-library/vue";
import DashboardModal from "@/components/DashboardModal.vue";
import "@testing-library/jest-dom";

test("renders and interacts with the modal", async () => {
  // Render the modal component
  const { getByText, queryByText } = render(DashboardModal); 

  // Ensure modal is initially not visible
  expect(queryByText("Modal Title")).not.toBeInTheDocument();

  // Simulate opening the modal (assuming you have a button or other trigger)
  const openButton = getByText("Open Modal");
  await fireEvent.click(openButton);

  // Ensure modal is visible after opening
  expect(getByText("Modal Title")).toBeInTheDocument();

  // Simulate closing the modal
  const closeButton = getByText("Close");
  await fireEvent.click(closeButton);

  // Ensure modal is not visible after closing
  expect(queryByText("Modal Title")).not.toBeInTheDocument();
});
