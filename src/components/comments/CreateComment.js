import React from 'react';
import { Button, Grid, TextField } from '@mui/material';

//create comment component
const CreateComment = ({ onCommentSubmit, commentText, setCommentText, userId, setUserId }) => {
  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !userId.trim()) {
      return; // Do not submit if comment text or user ID is empty
    }
    onCommentSubmit(); 
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={9}>
        <TextField
          fullWidth
          variant="outlined"
          label="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Your user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </Grid>
      <Grid item xs={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          disabled={!commentText.trim() || !userId.trim()}
        >
          Post
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateComment;
