import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoDetailPage from './pages/VideoDetailPage';
import CreateVideoPage from './pages/CreateVideoPage';

//Routes for the application
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos/:videoId" element={<VideoDetailPage />} />
        <Route path="/create" element={<CreateVideoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
