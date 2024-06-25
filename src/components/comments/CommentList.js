import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

//shows list of comments with content, user_id, and created_at
const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Card key={comment.id} variant="outlined" style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="body1">{comment.content}</Typography>
            <Typography variant="subtitle2" color="text.secondary" style={{ marginTop: '8px' }}>
              By: {comment.user_id} | {formatDate(comment.created_at)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

export default CommentList;
