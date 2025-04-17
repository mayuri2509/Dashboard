import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle ,Box} from "@mui/material";
import { z } from "zod";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface AddNewPostProps {
  onAddPost: (newPost: Post) => void;
}

const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
});

const AddNewPost: React.FC<AddNewPostProps> = ({ onAddPost }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const handleOpen = () => {
    setOpen(true);
    setTitle("");
    setDescription("");
    setErrors({});
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const validation = postSchema.safeParse({ title, description });

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors({
        title: fieldErrors.title ? fieldErrors.title[0] : "",
        description: fieldErrors.description ? fieldErrors.description[0] : "",
      });
      return;
    }
   const newPost = { id: Date.now(), title, body: description }; 
    onAddPost(newPost);
   const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    localStorage.setItem("posts", JSON.stringify([newPost, ...savedPosts]));
   handleClose();
  };

  return (
    <Box sx={{height:"100vh"}}> 
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{marginLeft:"650px",marginTop:"100px"}}>
        Add New Post
      </Button>

      <Dialog open={open} onClose={handleClose} >
        <DialogTitle >Add New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddNewPost;
