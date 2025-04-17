import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

jest.mock("./components/Sidebar", () => () => <div>Sidebar</div>);
jest.mock("./components/Header", () => () => <div>Header</div>);
jest.mock("./pages/Dashboard", () => (props: any) => (
  <div>
    Dashboard
    {props.posts.map((post: any) => (
      <div key={post.id}>{post.title}</div>
    ))}
  </div>
));
jest.mock("./pages/CreatePost", () => (props: any) => (
  <div>
    CreatePost
    <button onClick={() => props.onAddPost({ id: 101, title: "New Post", body: "Body" })}>
      Add Post
    </button>
  </div>
));

const mockApiPosts = [
  { id: 1, title: "API Post 1", body: "API Body 1" },
  { id: 2, title: "API Post 2", body: "API Body 2" },
];

const mockLocalStoragePosts = [
  { id: 2, title: "Local Post 2", body: "Local Body 2" },
  { id: 3, title: "Local Post 3", body: "Local Body 3" },
];

beforeEach(() => {
 
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockApiPosts),
    })
  ) as jest.Mock;

  
  Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockLocalStoragePosts));
  Storage.prototype.setItem = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders Dashboard with combined posts from API and localStorage", async () => {
  render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <App />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
  expect(await screen.findByText("API Post 1")).toBeInTheDocument();
  expect(await screen.findByText("Local Post 2")).toBeInTheDocument();
  expect(await screen.findByText("Local Post 3")).toBeInTheDocument();
  
});

test("renders CreatePost page and adds a new post", async () => {
  render(
    <MemoryRouter initialEntries={['/Createpost']}>
      <App />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("CreatePost")).toBeInTheDocument();
  });

  const addButton = screen.getByText("Add Post");
  userEvent.click(addButton);

  await waitFor(() => {
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "posts",
      expect.stringContaining("New Post")
    );
  });
});

test("redirects unknown path to /dashboard", async () => {
  render(
    <MemoryRouter initialEntries={["/unknown"]}>
      <App />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
