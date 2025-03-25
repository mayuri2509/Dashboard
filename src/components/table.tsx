import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Typography, Button, TextField, Box } from "@mui/material";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsTableProps {
  posts: Post[];
}

const PostsTable: React.FC<PostsTableProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const postsPerPage = 5;

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const sortedPosts = [...filteredPosts].sort((a, b) =>
    sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  );

  const paginatedPosts = sortedPosts.slice((page - 1) * postsPerPage, page * postsPerPage);

  return (
    <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 1 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Posts List
      </Typography>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <TextField
          label="Search by Title"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          style={{ background: "rgb(58 91 104)" }}
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          sx={{ mb: 2 }}
        >
          Sort by Title ({sortOrder === "asc" ? "Descending" : "Ascending"})
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="bg-cyan-700 text-white">
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPosts.length > 0 ? (
              paginatedPosts.map((post) => (
                <TableRow key={post.id} hover>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.body}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No posts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(filteredPosts.length / postsPerPage)}
        page={page}
        onChange={handleChange}
        className="bg-cyan-700 text-white"
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </Paper>
  );
};

export default PostsTable;
