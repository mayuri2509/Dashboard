import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../pages/Dashboard"; 

jest.mock("../components/Sidebar", () => () => <div data-testid="sidebar">Sidebar</div>);
jest.mock("../components/Table", () => ({ posts }: any) => (
  <div data-testid="posts-table">Table with {posts.length} posts</div>
));
describe("Dashboard component", () => {
  const mockPosts = [
    { id: 1, title: "Post One", body: "Body One" },
    { id: 2, title: "Post Two", body: "Body Two" },
  ];
   test("renders Sidebar and PostsTable with posts", () => {
    render(<Dashboard posts={mockPosts} />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("posts-table")).toHaveTextContent("Table with 2 posts");
  });
});
