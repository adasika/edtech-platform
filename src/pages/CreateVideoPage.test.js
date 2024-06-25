import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateVideoPage from './CreateVideoPage';
import { createVideo } from '../api/api';

jest.mock('../api/api', () => ({
  createVideo: jest.fn(),
}));

jest.mock('../components/Header', () => () => <div>Header</div>);

describe('CreateVideoPage', () => {
  beforeEach(() => {
    createVideo.mockClear();
  });

  test('renders header and form fields', () => {
    render(
      <BrowserRouter>
        <CreateVideoPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Upload Video')).toBeInTheDocument();
    expect(screen.getByLabelText('User ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Video URL')).toBeInTheDocument();
    expect(screen.getByText('Create Video')).toBeInTheDocument();
  });

  test('shows error message for invalid YouTube URL', async () => {
    render(
      <BrowserRouter>
        <CreateVideoPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('User ID'), { target: { value: 'user123' } });
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText('Video URL'), { target: { value: 'invalid-url' } });

    fireEvent.click(screen.getByText('Create Video'));

    await waitFor(() => {
      expect(screen.getByText('Invalid YouTube URL.')).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    const mockResponse = { data: { message: 'Video created successfully!' } };
    createVideo.mockResolvedValue(mockResponse);

    render(
      <BrowserRouter>
        <CreateVideoPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('User ID'), { target: { value: 'user123' } });
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText('Video URL'), { target: { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } });

    fireEvent.click(screen.getByText('Create Video'));

    await waitFor(() => {
      expect(screen.getByText('Video created successfully!')).toBeInTheDocument();
    });

    expect(createVideo).toHaveBeenCalledWith('user123', 'Test Description', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Test Title');
  });

  test('shows error message on API failure', async () => {
    createVideo.mockRejectedValue({ response: { data: { message: 'Failed to create video.' } } });

    render(
      <BrowserRouter>
        <CreateVideoPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('User ID'), { target: { value: 'user123' } });
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText('Video URL'), { target: { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } });

    fireEvent.click(screen.getByText('Create Video'));

    await waitFor(() => {
      expect(screen.getByText('Failed to create video.')).toBeInTheDocument();
    });
  });
});
