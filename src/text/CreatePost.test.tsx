import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddNewPost from "../pages/CreatePost";

describe("AddNewPost", () => {
  beforeEach(() => {
    localStorage.clear(); 
  });

  test("renders the Add New Post button", () => {
    render(<AddNewPost onAddPost={jest.fn()} />);
    expect(screen.getByText("Add New Post")).toBeInTheDocument();
  });

  test("opens dialog on button click", () => {
    render(<AddNewPost onAddPost={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /add new post/i }));
     expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });
  test("shows validation errors for short input", () => {
    render(<AddNewPost onAddPost={jest.fn()} />);
    fireEvent.click(screen.getByText("Add New Post"));
    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "123" } });
    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "short" } });
    fireEvent.click(screen.getByText("Submit"));
   
    expect(screen.getByText(/at least 5 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
  });

  test("submits valid form and stores to localStorage", () => {
    const mockAddPost = jest.fn();
    render(<AddNewPost onAddPost={mockAddPost} />);
    fireEvent.click(screen.getByText("Add New Post"));
    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Valid Title" } });
    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "A valid long enough description" } });
    fireEvent.click(screen.getByText("Submit"));
   
    expect(mockAddPost).toHaveBeenCalledTimes(1);
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    expect(storedPosts.length).toBe(1);
    expect(storedPosts[0].title).toBe("Valid Title");
  });
});
