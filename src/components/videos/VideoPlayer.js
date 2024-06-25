import React from 'react';
import YouTube from 'react-youtube';
import { getYouTubeVideoId } from '../../utils/utils';
import { Paper } from '@mui/material';

//Video Player for VideoDetail Page
const VideoPlayer = ({ videoUrl }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <YouTube videoId={getYouTubeVideoId(videoUrl)} opts={{ width: '100%', height: '400px' }} />
    </Paper>
  );
};

export default VideoPlayer;
