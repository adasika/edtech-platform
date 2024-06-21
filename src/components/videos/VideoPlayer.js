import React from "react";
import { Box } from "@mui/material";

//component for the video box
const VideoPlayer = ({ url }) => {
    return (
        <Box>
            <video width="100%" controls>
                <source src={url} type="video/mp4"/>
            </video>
        </Box>
    );
};

export default VideoPlayer;