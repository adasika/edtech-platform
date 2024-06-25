import React from 'react';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import { getYouTubeVideoId } from '../../utils/utils';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';

//component for video list on Home page
const VideoList = ({ videos }) => {
  return (
    <Grid container spacing={2}>
      {videos.map((video) => {
        const videoId = getYouTubeVideoId(video.video_url);

        // Debugging statements
        console.log('Video Title:', video.title);
        console.log('Video Description:', video.description);
        console.log('YouTube Video ID:', videoId);

        return (
          <Grid item key={video.id} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ cursor: 'pointer', height: '100%' }}>
              {/* Embed YouTube video */}
              <YouTube videoId={videoId} opts={{ width: '100%', height: '200px' }} />
              <CardContent>
                <Typography variant="h6" component="div">
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {video.description}
                </Typography>
                <Box mt={2}>
                  <Button component={Link} to={`/videos/${video.id}`} variant="contained" color="primary">
                    View Details {/*Click for expansion of video*/}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default VideoList;
