import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"; // Add this import to fix toBeInTheDocument
import AlbumModal from "./AlbumModal";
import styles from "./AlbumModal.module.scss"; // Import CSS module
import type { AlbumType, LinkType, Tag } from "@/types"; // Import your types
import Image from "next/image"; // Import to properly type the mock

// Mock the next/image component with proper types
jest.mock("next/image", () => ({
	__esModule: true,
	default: (props: React.ComponentProps<typeof Image>) => {
		return (
			<img {...props} src={(props.src as string) || ""} alt={props.alt || ""} />
		);
	},
}));

describe("AlbumModal", () => {
	// Create a properly typed mock album that matches your AlbumType
	const mockAlbum: AlbumType = {
		id: 1,
		name: "Test Album",
		year: 2023,
		artist: "Test Artist",
		coverArt: "/test-image.jpg",
		description: "<p>Lorem ipsum dolor sit amet</p>",
		links: [
			{ id: 1, name: "Spotify", href: "https://spotify.com", albumId: 1 }, // Add albumId
			{
				id: 2,
				name: "Apple Music",
				href: "https://apple.com/music",
				albumId: 1,
			}, // Add albumId
		] as LinkType[], // Cast to LinkType[] to ensure proper typing
		tags: [
			{ id: 1, name: "music" },
			{ id: 2, name: "prod" },
		] as Tag[], // Cast to TagType[] if needed
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const mockOnClose = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders album details correctly", () => {
		const { container } = render(
			<AlbumModal album={mockAlbum} onClose={mockOnClose} />
		);

		// Check title and artist
		expect(
			screen.getByText(`${mockAlbum.name} (${mockAlbum.year})`)
		).toBeInTheDocument();
		expect(screen.getByText(mockAlbum.artist)).toBeInTheDocument();

		// Check for description using the correct class name from your component
		const descriptionElement = container.querySelector(
			`.${styles.description}`
		);
		expect(descriptionElement?.innerHTML).toContain(
			"Lorem ipsum dolor sit amet"
		);

		// Check for tags
		expect(screen.getByText("music")).toBeInTheDocument();
		expect(screen.getByText("prod")).toBeInTheDocument();

		// Check for links
		expect(screen.getByText("Spotify")).toBeInTheDocument();
		expect(screen.getByText("Apple Music")).toBeInTheDocument();
	});

	it("closes when the close button is clicked", async () => {
		render(<AlbumModal album={mockAlbum} onClose={mockOnClose} />);

		const closeButton = screen.getByLabelText("Close");
		await userEvent.click(closeButton);

		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it("closes when clicking on the backdrop", async () => {
		const { container } = render(
			<AlbumModal album={mockAlbum} onClose={mockOnClose} />
		);

		// Find the backdrop element using container.querySelector with the correct style
		const backdrop = container.querySelector(`.${styles.backdrop}`);
		expect(backdrop).not.toBeNull();

		if (backdrop) {
			await userEvent.click(backdrop);
			expect(mockOnClose).toHaveBeenCalledTimes(1);
		}
	});

	it("doesn't close when clicking inside the modal content", async () => {
		const { container } = render(
			<AlbumModal album={mockAlbum} onClose={mockOnClose} />
		);

		// Click on the modal content with correct style reference
		const modalContent = container.querySelector(`.${styles.content}`);
		expect(modalContent).not.toBeNull();

		if (modalContent) {
			await userEvent.click(modalContent);
			expect(mockOnClose).not.toHaveBeenCalled();
		}
	});

	it("renders the album cover image", () => {
		render(<AlbumModal album={mockAlbum} onClose={mockOnClose} />);

		const image = screen.getByAltText(`${mockAlbum.name} cover`);
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute(
			"src",
			expect.stringContaining("/test-image.jpg")
		);
	});

	it("renders links with correct href attributes", () => {
		render(<AlbumModal album={mockAlbum} onClose={mockOnClose} />);

		const spotifyLink = screen.getByText("Spotify").closest("a");
		const appleMusicLink = screen.getByText("Apple Music").closest("a");

		expect(spotifyLink).toHaveAttribute("href", "https://spotify.com");
		expect(appleMusicLink).toHaveAttribute("href", "https://apple.com/music");
		expect(spotifyLink).toHaveAttribute("target", "_blank");
		expect(appleMusicLink).toHaveAttribute("rel", "noopener noreferrer");
	});

	it("returns null if no album is provided", () => {
		// Use a safe type assertion that matches your component's implementation
		const { container } = render(
			// @ts-expect-error - Deliberately testing with invalid props
			<AlbumModal album={null} onClose={mockOnClose} />
		);
		expect(container.firstChild).toBeNull();
	});
});
