import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import AddNewPost from "./pages/createpost";
import { useState, useEffect } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import Header from "./components/header";
import { CssBaseline } from "@mui/material";

interface Post {
  id: number;
  title: string;
  body: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const apiResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
      const apiPosts: Post[] = await apiResponse.json();

      const localStoragePosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");

     
      const uniqueApiPosts = apiPosts.filter(apiPost => 
        !localStoragePosts.some(localPost => localPost.id === apiPost.id)
      );

      setPosts([...localStoragePosts, ...uniqueApiPosts]);
    };

    fetchPosts();
  }, []);

  const handleAddPost = (newPost: Post) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <ThemeProvider>
      <CssBaseline />
      <Header />
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard posts={posts} />} />
          <Route path="/createpost" element={<AddNewPost onAddPost={handleAddPost} />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

