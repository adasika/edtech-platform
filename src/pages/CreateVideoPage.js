import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createVideo } from '../api/api';
import { getYouTubeVideoId } from '../utils/utils'; 
import Header from '../components/Header'; 
import{ Alert, Box, Button, Container, Paper, Snackbar, TextField, Typography } from '@mui/material';

const CreateVideoPage = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    title: '',
    description: '',
    video_url: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [urlError, setUrlError] = useState('');

  //check if text is a valid youtube URL
  const isValidYouTubeUrl = (url) => {
    const pattern = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return pattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidYouTubeUrl(formData.video_url)) {
      setUrlError('Invalid YouTube URL.');
      return;
    }
    try {
      const videoId = getYouTubeVideoId(formData.video_url); // Extract video ID using util
      if (!videoId) {
        setUrlError('Invalid YouTube URL.');
        return;
      }
      
      const response = await createVideo(formData.user_id, formData.description, formData.video_url, formData.title); //the request body for POST request
      console.log('Video created:', response);
      setSuccessMessage('Video created successfully!');
      setSnackbarOpen(true);
      //clears form after successful creation
      setFormData({
        user_id: '',
        title: '',
        description: '',
        video_url: '',
      });
      setUrlError('');
    } catch (error) {
      console.error('Error creating video:', error);
      if (error.response) {
        setError(error.response.data.message || 'Failed to create video.');
      } else {
        setError('Network Error. Please try again later.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'video_url') {
      if (!isValidYouTubeUrl(value)) {
        setUrlError('Invalid YouTube URL.');
      } else {
        setUrlError('');
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Header /> 
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upload Video
        </Typography>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" color="primary" style={{ marginBottom: '10px' }}>
            Back to Home
          </Button>
        </Link>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="User ID"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              multiline
              rows={4}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Video URL"
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
              required
              error={!!urlError}
              helperText={urlError}
            />
          </Box>
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Create Video
          </Button>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default CreateVideoPage;
