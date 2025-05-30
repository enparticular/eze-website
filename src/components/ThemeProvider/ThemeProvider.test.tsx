import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ThemeProvider, { useTheme } from "./ThemeProvider";

// Create a test component that uses the theme context
function TestComponent() {
	const { isDarkMode, toggleTheme } = useTheme();
	return (
		<div>
			<span data-testid="theme-status">{isDarkMode ? "Dark" : "Light"}</span>
			<button onClick={toggleTheme}>Toggle Theme</button>
		</div>
	);
}

// Mock localStorage
const localStorageMock = (function () {
	let store: Record<string, string> = {};
	return {
		getItem: jest.fn((key: string) => store[key] || null),
		setItem: jest.fn((key: string, value: string) => {
			store[key] = value;
		}),
		clear: jest.fn(() => {
			store = {};
		}),
	};
})();

// Apply localStorage mock
Object.defineProperty(window, "localStorage", {
	value: localStorageMock,
});

// Use this approach:
Object.defineProperty(document.body, "classList", {
	value: {
		add: jest.fn(),
		remove: jest.fn(),
		contains: jest.fn(),
		toggle: jest.fn(),
	},
	configurable: true,
});

describe("ThemeProvider", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		localStorageMock.clear();
	});

	it("toggles theme when button is clicked", async () => {
		localStorageMock.getItem.mockReturnValue("light");

		render(
			<ThemeProvider>
				<TestComponent />
			</ThemeProvider>
		);

		// Start with light theme
		expect(screen.getByTestId("theme-status")).toHaveTextContent("Light");

		// Click the toggle button
		await userEvent.click(screen.getByText("Toggle Theme"));

		// Theme should now be dark
		expect(screen.getByTestId("theme-status")).toHaveTextContent("Dark");

		// Should update localStorage
		expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "dark");

		// Should add class to body
		expect(document.body.classList.add).toHaveBeenCalledWith("dark-mode");
	});

	it("removes dark-mode class when switching to light theme", async () => {
		// Start with dark theme
		localStorageMock.getItem.mockReturnValue("dark");

		render(
			<ThemeProvider>
				<TestComponent />
			</ThemeProvider>
		);

		expect(screen.getByTestId("theme-status")).toHaveTextContent("Dark");

		// Toggle to light theme
		await userEvent.click(screen.getByText("Toggle Theme"));

		// Should remove dark-mode class
		expect(document.body.classList.remove).toHaveBeenCalledWith("dark-mode");
		expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "light");
	});

	it("throws an error when useTheme is used outside ThemeProvider", () => {
		// Suppress console errors for this test
		const originalError = console.error;
		console.error = jest.fn();

		expect(() => {
			render(<TestComponent />);
		}).toThrow("useTheme must be used within a ThemeProvider");

		// Restore console.error
		console.error = originalError;
	});
});
