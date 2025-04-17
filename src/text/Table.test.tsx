
import { render, screen, fireEvent } from "@testing-library/react";
import PostsTable from "../components/Table";
import  '@testing-library/jest-dom';

const mockPosts = [
  { id: 1, title: "Alpha", body: "Post Alpha" },
  { id: 2, title: "Bravo", body: "Post Bravo" },
  { id: 3, title: "Charlie", body: "Post Charlie" },
  { id: 4, title: "Delta", body: "Post Delta" },
  { id: 5, title: "Echo", body: "Post Echo" },
  { id: 6, title: "Foxtrot", body: "Post Foxtrot" },
];

describe("PostsTable Component", () => {
  test("renders the component with posts", () => {
    render(<PostsTable posts={mockPosts} />);
    expect(screen.getByText("Posts List")).toBeInTheDocument();
    expect(screen.getByLabelText("Search by Title")).toBeInTheDocument();
    expect(screen.getByText("Sort by Title (Descending)")).toBeInTheDocument();
  });

  test("displays paginated posts", () => {
    render(<PostsTable posts={mockPosts} />);
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.queryByText("Foxtrot")).not.toBeInTheDocument();
  });
  test("goes to page 2 when pagination button is clicked", () => {
    render(<PostsTable posts={mockPosts} />);
    const buttons = screen.getAllByRole("button");
    const pageTwoButton = buttons.find(btn => btn.textContent === "2");
    expect(pageTwoButton).toBeInTheDocument();
    fireEvent.click(pageTwoButton!);
    expect(screen.getByText("Foxtrot")).toBeInTheDocument();
  });
  
  test("filters posts based on search input", () => {
    render(<PostsTable posts={mockPosts} />);
    const searchInput = screen.getByLabelText("Search by Title");
    fireEvent.change(searchInput, { target: { value: "char" } });
    expect(screen.getByText("Charlie")).toBeInTheDocument();
    expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
  });

  test("sorts posts when sort button is clicked", () => {
    render(<PostsTable posts={mockPosts} />);
    const sortButton = screen.getByText(/Sort by Title/i);
    fireEvent.click(sortButton); 
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Foxtrot"); 
  });

  test("shows 'No posts found' if filter returns no result", () => {
    render(<PostsTable posts={mockPosts} />);
    const searchInput = screen.getByLabelText("Search by Title");
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });
    expect(screen.getByText("No posts found.")).toBeInTheDocument();
  });
});
