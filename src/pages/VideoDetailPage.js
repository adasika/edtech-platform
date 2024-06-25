import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleVideo, getVideoComments, createComment, editVideo } from '../api/api';
import VideoPlayer from '../components/videos/VideoPlayer';
import CommentList from '../components/comments/CommentList';
import CreateComment from '../components/comments/CreateComment';
import Header from '../components/Header'; 
import { Button, Card, CardContent, Divider, Grid, TextField, Typography } from '@mui/material';

const VideoDetailPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');
  const [userId, setUserId] = useState('');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    const fetchVideoAndComments = async () => {
      try {
        const videoResponse = await getSingleVideo(videoId);
        setVideo(videoResponse.video);

        const commentsResponse = await getVideoComments(videoId);
        setComments(commentsResponse.comments);
      } catch (error) {
        console.error('Error fetching video details:', error);
        setError('Failed to fetch video details. Please try again.');
      }
    };

    fetchVideoAndComments();
  }, [videoId]);

  const handleCommentSubmit = async () => {
    try {
      await createComment(videoId, commentText, userId);
      const commentsResponse = await getVideoComments(videoId);
      setComments(commentsResponse.comments);
      setCommentText('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSaveEdit = async () => {
    try {
      await editVideo(videoId, editedTitle, editedDescription);
      refreshPage();
    } catch (error) {
      console.error('Error editing video:', error);
    }
  };

  const refreshPage = () => {
    window.location.reload(); // Doing a manual refresh after user saves edit data - couldn't figure out why the page was stuck on "loading"
  };

  if (!video) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Header /> 
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="div" style={{ marginBottom: '10px' }}>
                {video.title}
              </Typography>
              <VideoPlayer videoUrl={video.video_url} />
              <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                {video.description}
              </Typography>
              <Button variant="contained" onClick={handleBack} style={{ marginTop: '10px' }}>
                Back
              </Button>
              <Button variant="contained" onClick={() => setShowEditPopup(true)} style={{ marginTop: '10px', marginLeft: '10px' }}>
                Edit
              </Button>
              {/* Including Edit video with VideoDetail */}
              {showEditPopup && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', zIndex: '9999', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
                  <Typography variant="h6" gutterBottom>Edit Video</Typography>
                  <TextField
                    fullWidth
                    label="Title"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    multiline
                    rows={4}
                    style={{ marginBottom: '10px' }}
                  />
                  <Button variant="contained" color="primary" onClick={handleSaveEdit}>Save</Button>
                  <Button variant="contained" onClick={() => setShowEditPopup(false)} style={{ marginLeft: '10px' }}>Cancel</Button>
                </div>
              )}
              {/* End Edit Video Popup */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
            Comments
          </Typography>
          <CreateComment
            videoId={videoId}
            onCommentSubmit={handleCommentSubmit}
            commentText={commentText}
            setCommentText={setCommentText}
            userId={userId}
            setUserId={setUserId}
          />
          <Divider style={{ margin: '10px 0' }} />
          <CommentList comments={comments} />
        </Grid>
      </Grid>
    </div>
  );
};

export default VideoDetailPage;
