import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AlbumCard } from "./AlbumCard";

// Mock the next/image component
jest.mock("next/image", () => ({
	__esModule: true,
	default: (props) => {
		// Make sure we pass all necessary props to the mock image
		return <img {...props} src={props.src || ""} alt={props.alt || ""} />;
	},
}));

describe("AlbumCard", () => {
	const mockAlbum = {
		id: 1,
		name: "Test Album",
		year: 2023,
		artist: "Test Artist",
		coverArt: "/test-image.jpg",
		description: "Test description",
		links: [],
		tags: [{ id: 1, name: "music" }],
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const mockOnClick = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders album information correctly", () => {
		render(<AlbumCard album={mockAlbum} onClick={mockOnClick} />);

		expect(screen.getByText(/Test Album/)).toBeInTheDocument();
		expect(screen.getByText("Test Artist")).toBeInTheDocument();
		expect(screen.getByText("music")).toBeInTheDocument();
	});

	it("calls onClick when the card is clicked", async () => {
		render(<AlbumCard album={mockAlbum} onClick={mockOnClick} />);

		const card = screen.getByText(/Test Album/).closest("div");
		expect(card).not.toBeNull();

		if (card) {
			await userEvent.click(card);
			expect(mockOnClick).toHaveBeenCalledWith(mockAlbum);
		}
	});
});
