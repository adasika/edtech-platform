import axios from 'axios';

const BASE_URL = 'https://take-home-assessment-423502.uc.r.appspot.com/api';

//apis

//GET userVideos based on userID
export const getUserVideos = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        user_id: userId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user videos:', error);
    throw error;
  }
};

//GET single video based on videoID
export const getSingleVideo = async (videoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/videos/single`, {
      params: {
        video_id: videoId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching single video:', error);
    throw error;
  }
};

//POST (create) video with request body
export const createVideo = async (userId, description, videoUrl, title) => {
  try {
    const response = await axios.post(`${BASE_URL}/videos`, {
      user_id: userId,
      description,
      video_url: videoUrl,
      title
    });
    console.log('API Response:', response); 
  } catch (error) {
    console.error('Error creating video:', error);
    throw error;
  }
};

//PUT (update) video with request body
export const editVideo = async (videoId, title, description) => {
  try {
    const response = await axios.put(`${BASE_URL}/videos`, {
      video_id: videoId,
      title,
      description
    });
    return response.data;
  } catch (error) {
    console.error('Error editing video:', error);
    throw error;
  }
};

//POST (create) comment
export const createComment = async (videoId, content, userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/videos/comments`, {
      video_id: videoId,
      content,
      user_id: userId
    });
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

//GET comments
export const getVideoComments = async (videoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/videos/comments`, {
      params: {
        video_id: videoId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};
