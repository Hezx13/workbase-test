import { Box, Button, Dialog, TextField } from "@mui/material";
import { FC, useState } from "react";
import { getLocalDateTimeString } from "../utils/timeUtils";

const EditDialog: FC<any> = ({ taskEdit, onCloseEdit, onSubmit }) => {
    const [newDateTime, setNewDateTime] = useState(getLocalDateTimeString(new Date()));
    const [newName, setNewName] = useState('');

    return (
        <Dialog
            open={!!taskEdit}
            onClose={onCloseEdit}
            
        >
            <Box
                sx={{width: '300px',
                height: '200px',
                display: 'flex', 
                justifyContent: 'center', 
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px'
            }}
            >

                <TextField
                label="due"
                    type="datetime-local"
                    value={newDateTime}
                    onChange={(e) => setNewDateTime(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{width: '100%', marginBottom: '5px'}}
                />
                <TextField
                label="name"
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{width: '100%'}}
                    
                />
            </Box>
            <Button color="error"onClick={onCloseEdit}>Cancel</Button>
            <Button onClick={()=>onSubmit(
                taskEdit,
                newName,
                newDateTime
                )}>Submit</Button>
        </Dialog>
    );
};

export default EditDialog;
