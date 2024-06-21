import React from "react";
import { Button, Box, TextField } from "@mui/material";


//create comment component
const CreateComment = ({ onSubmit }) => {
    const [text, setText] = useState("");


const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ text });
    setText("");
};

//this will likely have to be changed to be more in line with youtube's comment style
return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt:2 }}>
        <TextField 
            label="Comment"
            multiline
            fullWidth
            value={text}
            onChange={e => setText(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt:2 }}>
            Add your comment...
        </Button>
    </Box>
);

};

export default CreateComment;