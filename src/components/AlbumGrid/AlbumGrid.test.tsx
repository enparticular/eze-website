import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { AlbumGrid } from "./AlbumGrid";
import type { AlbumType } from "@/types";

// Mock the Next.js router
jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		prefetch: jest.fn(),
		back: jest.fn(),
		forward: jest.fn(),
		refresh: jest.fn(),
	}),
	usePathname: () => "/",
	useSearchParams: () => new URLSearchParams(),
}));

// Don't mock TagFilter since AlbumGrid doesn't use it directly

// Mock AlbumCard and AlbumModal which ARE used by AlbumGrid
jest.mock("../AlbumCard/AlbumCard", () => ({
	AlbumCard: ({ album, onClick }) => (
		<div data-testid={`album-card-${album.id}`} onClick={() => onClick(album)}>
			{album.name} by {album.artist}
		</div>
	),
}));

jest.mock("../AlbumModal/AlbumModal", () => ({
	__esModule: true,
	default: ({ album, onClose }) =>
		album ? (
			<div data-testid="album-modal" onClick={onClose}>
				Modal for {album.name}
			</div>
		) : null,
}));

describe("AlbumGrid", () => {
	const mockAlbums: AlbumType[] = [
		{
			id: 1,
			name: "Album 1",
			year: 2023,
			artist: "Artist 1",
			coverArt: "/image1.jpg",
			description: "Description 1",
			links: [],
			tags: [{ id: 1, name: "music" }],
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: 2,
			name: "Album 1",
			year: 2023,
			artist: "Artist 2",
			coverArt: "/image1.jpg",
			description: "Description 1",
			links: [],
			tags: [{ id: 1, name: "music" }],
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: 3,
			name: "Album 1",
			year: 2023,
			artist: "Artist 3",
			coverArt: "/image1.jpg",
			description: "Description 3",
			links: [],
			tags: [{ id: 1, name: "music" }],
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	];

	it("renders all albums initially", () => {
		render(<AlbumGrid initialAlbums={mockAlbums} />);

		// Check that albums are rendered
		expect(screen.getByTestId("album-card-1")).toBeInTheDocument();
		expect(screen.getByTestId("album-card-2")).toBeInTheDocument();
		expect(screen.getByTestId("album-card-3")).toBeInTheDocument();

		// No modal should be visible initially
		expect(screen.queryByTestId("album-modal")).not.toBeInTheDocument();
	});

	it("shows modal when an album is clicked", async () => {
		render(<AlbumGrid initialAlbums={mockAlbums} />);

		// Click on Album 1
		await userEvent.click(screen.getByTestId("album-card-1"));

		// Modal should be shown with the correct album
		expect(screen.getByTestId("album-modal")).toBeInTheDocument();
		expect(screen.getByText("Modal for Album 1")).toBeInTheDocument();
	});

	it("closes modal when onClose is called", async () => {
		render(<AlbumGrid initialAlbums={mockAlbums} />);

		// Open modal
		await userEvent.click(screen.getByTestId("album-card-1"));
		expect(screen.getByTestId("album-modal")).toBeInTheDocument();

		// Close modal
		await userEvent.click(screen.getByTestId("album-modal"));
		expect(screen.queryByTestId("album-modal")).not.toBeInTheDocument();
	});

	it("handles empty albums array gracefully", () => {
		render(<AlbumGrid initialAlbums={[]} />);

		// No album cards should be rendered
		expect(screen.queryByTestId(/album-card-/)).not.toBeInTheDocument();
	});
});
