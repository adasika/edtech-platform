import React from "react";
import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";

//list of comments
const CommentList = ({ comments }) => {
    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Comments
            </Typography>
            <List>
            {/* will map out comments with user name*/}
             {/* TO DO: list number of elapsed days since comment was posted*/}
            {comments.map(comment => (
                <div key={comment.id}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={comment.text}
                            secondary={`By: ${comment.user}`}
                        />
                    </ListItem>
                    <Divider variant="insert"/> 
                </div>
            ))}
        </List>
        </div>
    );
};


export default CommentList;