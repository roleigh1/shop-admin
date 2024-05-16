import { FormSignIn } from "./Form";

describe("FormSignIn", () => {
  it("should render the form", () => {
    render(<FormSignIn />);
    const emailInput = screen.getByLabelText("User");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("should show error message when login data is missing", async () => {
    render(<FormSignIn />);
    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);
    const errorMessage = await screen.findByText("Please enter login data");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should show error message when login data is incorrect", async () => {
    const mockPost = jest.fn();
    mockPost.mockRejectedValueOnce({ message: "Unauthorized" });
    jest.mock("axios", () => ({
      post: mockPost,
    }));
    render(<FormSignIn />);
    const emailInput = screen.getByLabelText("User");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(loginButton);
    await waitFor(() => {
      const errorMessage = screen.getByText("wrong username or password");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("should navigate to home page when login data is correct", async () => {
    const mockPost = jest.fn();
    mockPost.mockResolvedValueOnce({ data: { token: "123" } });
    jest.mock("axios", () => ({
      post: mockPost,
    }));
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
    }));
    render(<FormSignIn />);
    const emailInput = screen.getByLabelText("User");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
  });
});
