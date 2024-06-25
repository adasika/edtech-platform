import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import { getUserVideos } from '../api/api';

jest.mock('../api/api', () => ({
  getUserVideos: jest.fn()
}));

describe('Home Component', () => {
  test('renders header and input field', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Search by user ID')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  test('shows error message on API failure', async () => {
    getUserVideos.mockRejectedValue(new Error('Failed to fetch videos'));

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Search by user ID'), {
      target: { value: 'user123' }
    });

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch videos. Please try again.')).toBeInTheDocument();
    });
  });

  test('renders video list on successful search', async () => {
    const mockVideos = {
      videos: [
        { id: 1, title: 'Video 1', description: 'Description 1', video_url: 'url1' },
        { id: 2, title: 'Video 2', description: 'Description 2', video_url: 'url2' }
      ]
    };

    getUserVideos.mockResolvedValue(mockVideos);

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Search by user ID'), {
      target: { value: 'user123' }
    });

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('Video 1')).toBeInTheDocument();
      expect(screen.getByText('Video 2')).toBeInTheDocument();
    });
  });

  test('shows "No videos found." when no videos are returned', async () => {
    const mockVideos = {
      videos: []
    };

    getUserVideos.mockResolvedValue(mockVideos);

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Search by user ID'), {
      target: { value: 'user123' }
    });

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('No videos found.')).toBeInTheDocument();
    });
  });
});
