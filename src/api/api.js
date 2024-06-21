import axios from "axios";

const API_URL = "https://take-home-assessment-423502.uc.r.appspot.com/api";

//video endpoints
export const getVideos = (userId) => axios.get(`${API_URL}/videos?user_id=${userId}`);
export const createVideo = (data) => axios.post(`${API_URL}/videos`, data);
export const editVideo = (id, data) => axios.put(`${API_URL}/videos`, { id, ...data });

//single video endpoint(videoId)
export const getSingleVideoById = (id) => axios.get(`${API_URL}/videos/single?video_id=${id}`);

//comment endpoints
export const getVideoComments = (id) => axios.get(`${API_URL}/videos/comments?video_id=${id}`);
export const createVideoComments = (id, data) = axios.post(`${API_URL}/videos/comments`, { id, ...data });