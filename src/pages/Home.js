import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserVideos } from '../api/api';
import VideoList from '../components/videos/VideoList';
import Header from '../components/Header'; 
import { Button, Grid, TextField, Typography } from '@mui/material';

//Home page for Ed-tech platform
const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await getUserVideos(searchText);
      console.log('API Response:', response); // Log for debugging
      setVideos(response.videos);
    } catch (error) {
      console.error('Error fetching user videos:', error);
      setError('Failed to fetch videos. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Header /> 
      <div style={{ marginBottom: '10px' }}>
        <TextField
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by user ID"
          style={{ width: '400px', marginRight: '10px' }}
          InputLabelProps={{ shrink: true }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Button variant="contained" onClick={handleSearch} style={{ height: '40px', minWidth: '150px', marginRight: '10px' }}>
          Search
        </Button>
        <Button component={Link} to="/create" variant="contained" style={{ height: '40px', minWidth: '150px' }}>
          Upload
        </Button>
      </div>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <Grid container spacing={3} justifyContent="center" style={{ marginTop: '10px' }}>
        {videos.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1">No videos found.</Typography>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <VideoList videos={videos} /> {/* Video list called here if videos is not 0 */}
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Home;
