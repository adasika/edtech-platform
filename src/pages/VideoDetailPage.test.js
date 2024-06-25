import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import VideoDetailPage from '../pages/VideoDetailPage';
import { getSingleVideo, getVideoComments, createComment, editVideo } from '../api/api';

jest.mock('../api/api', () => ({
  getSingleVideo: jest.fn(),
  getVideoComments: jest.fn(),
  createComment: jest.fn(),
  editVideo: jest.fn(),
}));

const mockVideo = {
  video: {
    title: 'Test Video',
    description: 'This is a test video.',
    video_url: 'http://test.com/video.mp4',
  },
};

const mockComments = {
  comments: [
    { id: 1, text: 'Great video!', user_id: 'user1' },
    { id: 2, text: 'Very informative.', user_id: 'user2' },
  ],
};

describe('VideoDetailPage', () => {
  beforeEach(() => {
    getSingleVideo.mockResolvedValue(mockVideo);
    getVideoComments.mockResolvedValue(mockComments);
  });

  test('renders loading state initially', () => {
    render(
      <Router>
        <VideoDetailPage />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('fetches and displays video and comments', async () => {
    render(
      <Router>
        <VideoDetailPage />
      </Router>
    );

    await waitFor(() => expect(getSingleVideo).toHaveBeenCalled());
    await waitFor(() => expect(getVideoComments).toHaveBeenCalled());

    expect(screen.getByText('Test Video')).toBeInTheDocument();
    expect(screen.getByText('This is a test video.')).toBeInTheDocument();
    expect(screen.getByText('Great video!')).toBeInTheDocument();
    expect(screen.getByText('Very informative.')).toBeInTheDocument();
  });

  test('submits a comment', async () => {
    render(
      <Router>
        <VideoDetailPage />
      </Router>
    );

    await waitFor(() => expect(getSingleVideo).toHaveBeenCalled());

    fireEvent.change(screen.getByLabelText('Add a comment'), { target: { value: 'New comment' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(createComment).toHaveBeenCalledWith('1', 'New comment', ''));

   
    getVideoComments.mockResolvedValue({
      comments: [
        ...mockComments.comments,
        { id: 3, text: 'New comment', user_id: 'user3' },
      ],
    });

    await waitFor(() => expect(screen.getByText('New comment')).toBeInTheDocument());
  });

  test('handles edit video popup and save', async () => {
    render(
      <Router>
        <VideoDetailPage />
      </Router>
    );

    await waitFor(() => expect(getSingleVideo).toHaveBeenCalled());

    fireEvent.click(screen.getByText('Edit'));

    expect(screen.getByText('Edit Video')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated Title' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Updated Description' } });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => expect(editVideo).toHaveBeenCalledWith('1', 'Updated Title', 'Updated Description'));
  });
});
