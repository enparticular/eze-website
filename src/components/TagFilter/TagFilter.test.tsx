import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TagFilter from "./TagFilter";
import styles from "./TagFilter.module.scss";
import type { TagFilterType } from "@/types";

describe("TagFilter", () => {
	// Create mock tags and handlers for the tests
	const mockTags: TagFilterType[] = ["all", "music", "prod", "mix"];
	const mockActiveTag: TagFilterType = "music";
	const mockOnTagSelect = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders all tags correctly", () => {
		render(
			<TagFilter
				tags={mockTags}
				activeTag={mockActiveTag}
				onTagSelect={mockOnTagSelect}
			/>
		);

		// Check for title
		expect(screen.getByText("Filtros:")).toBeInTheDocument();

		// Check all tags are rendered
		expect(screen.getByText("All")).toBeInTheDocument();
		expect(screen.getByText("music")).toBeInTheDocument();
		expect(screen.getByText("prod")).toBeInTheDocument();
		expect(screen.getByText("mix")).toBeInTheDocument();
	});

	it("marks the active tag correctly", () => {
		render(
			<TagFilter
				tags={mockTags}
				activeTag={mockActiveTag}
				onTagSelect={mockOnTagSelect}
			/>
		);

		// Find the active tag button
		const activeButton = screen.getByText("music");

		// Check that it has the active class
		expect(activeButton).toHaveClass(styles.active);

		// Check that it has the aria-pressed attribute set to true
		expect(activeButton).toHaveAttribute("aria-pressed", "true");

		// Check other buttons don't have active class
		const allButton = screen.getByText("All");
		expect(allButton).not.toHaveClass(styles.active);
		expect(allButton).toHaveAttribute("aria-pressed", "false");
	});

	it("calls onTagSelect when a tag is clicked", async () => {
		render(
			<TagFilter
				tags={mockTags}
				activeTag={mockActiveTag}
				onTagSelect={mockOnTagSelect}
			/>
		);

		// Click on the "prod" tag
		const prodTag = screen.getByText("prod");
		await userEvent.click(prodTag);

		// Check that onTagSelect was called with the right tag
		expect(mockOnTagSelect).toHaveBeenCalledTimes(1);
		expect(mockOnTagSelect).toHaveBeenCalledWith("prod");
	});

	it("doesn't call onTagSelect when the active tag is clicked", async () => {
		render(
			<TagFilter
				tags={mockTags}
				activeTag={mockActiveTag}
				onTagSelect={mockOnTagSelect}
			/>
		);

		// Click on the already active tag
		const activeTag = screen.getByText("music");
		await userEvent.click(activeTag);

		// Should still call onTagSelect (component doesn't prevent this)
		expect(mockOnTagSelect).toHaveBeenCalledTimes(1);
		expect(mockOnTagSelect).toHaveBeenCalledWith("music");
	});

	it("handles empty tags array gracefully", () => {
		const { container } = render(
			<TagFilter
				tags={[]}
				activeTag={mockActiveTag}
				onTagSelect={mockOnTagSelect}
			/>
		);

		// Should still render the title
		expect(screen.getByText("Filtros:")).toBeInTheDocument();

		// Tag list should be empty
		const tagList = container.querySelector(`.${styles.tagList}`);
		expect(tagList).toBeInTheDocument();
		expect(tagList?.children.length).toBe(0);
	});

	it("defaults activeTag to 'all' when not provided", () => {
		render(
			<TagFilter
				tags={mockTags}
				// @ts-expect-error - Deliberately testing default prop behavior
				activeTag={undefined}
				onTagSelect={mockOnTagSelect}
			/>
		);

		// The "All" tag should be active
		const allButton = screen.getByText("All");
		expect(allButton).toHaveClass(styles.active);
		expect(allButton).toHaveAttribute("aria-pressed", "true");
	});

	it("applies correct styles to tag buttons", () => {
		const { container } = render(
			<TagFilter
				tags={mockTags}
				activeTag={mockActiveTag}
				onTagSelect={mockOnTagSelect}
			/>
		);

		// Check that all buttons have the tag class
		const tagButtons = container.querySelectorAll(`.${styles.tag}`);
		expect(tagButtons.length).toBe(mockTags.length);

		// All buttons should have the tag class
		tagButtons.forEach((button) => {
			expect(button).toHaveClass(styles.tag);
		});
	});
});
