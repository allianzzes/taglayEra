import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../services/ArticleService"; // Corrected double dots
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const NewReport = () => {
    const [title, setTitle] = useState('');
    const [name, setName] = useState(''); 
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const reportData = {
            title,
            name: name.toLowerCase().replace(/\s+/g, '-'),
            content: content.split('\n').filter(line => line.trim() !== ''),
            isActive: true
        };

        try {
            await createArticle(reportData);
            navigate('/dashboard/dash-articles');
        } catch (err) {
            console.error("TRANSMISSION_FAILED:", err);
            alert("CRITICAL ERROR: Data packet dropped.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
            <Paper sx={{ p: 4, backgroundColor: '#0a0a0a', border: '1px solid #9d0000', color: '#fff' }}>
                <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Courier New', fontWeight: 'bold', color: '#fff' }}>
                    NEW_INTEL_BROADCAST
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="REPORT_TITLE"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ mb: 3, input: { color: '#fff' }, label: { color: '#9d0000' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }}}}
                        required
                    />
                    <TextField
                        fullWidth
                        label="URL_IDENTIFIER"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 3, input: { color: '#fff' }, label: { color: '#9d0000' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }}}}
                        required
                    />
                    <TextField
                        fullWidth
                        label="LOG_ENTRIES"
                        multiline
                        rows={6}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        sx={{ mb: 3, '& .MuiInputBase-input': { color: '#00ff00', fontFamily: 'Courier New' }, label: { color: '#9d0000' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }}}}
                        required
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        disabled={loading}
                        sx={{ backgroundColor: '#9d0000', color: '#fff', '&:hover': { backgroundColor: '#ff0000' }}}
                    >
                        {loading ? 'TRANSMITTING...' : 'EXECUTE_BROADCAST'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default NewReport; // This MUST be here to prevent the white screen