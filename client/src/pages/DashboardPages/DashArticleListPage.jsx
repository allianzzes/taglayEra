import { fetchArticles, createArticle, updateArticle, toggleArticleStatus, deleteArticle } from '../../services/ArticleService';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Stack,
  Typography,
  Modal,
  Box,
  TextField,
  Switch,
  Paper
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: '#0a0a0a',
  border: '2px solid #9d0000',
  boxShadow: '0 0 20px rgba(157, 0, 0, 0.4)',
  p: 4,
  color: '#fff',
  borderRadius: '4px'
};

function DashArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [newArticle, setNewArticle] = useState({
    name: '',
    title: '',
    content: [],
    isActive: true,
  });

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setNewArticle({ name: '', title: '', content: [], isActive: true });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
  };

  const handleEdit = (id) => {
    const articleToEdit = articles.find((article) => article._id === id);
    if (articleToEdit) {
      setNewArticle(articleToEdit);
      setEditArticleId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleSaveArticle = async () => {
    try {
      if (isEditing) {
        await updateArticle(editArticleId, newArticle);
      } else {
        await createArticle(newArticle);
      }
      loadArticles();
      handleClose();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await toggleArticleStatus(id);
      loadArticles();
    } catch (error) {
      console.error('Error toggling article status:', error);
    }
  };

  const handlePurge = async (id) => {
    if (window.confirm("CRITICAL: AUTHORIZE DATA PURGE? THIS ACTION IS PERMANENT.")) {
      try {
        await deleteArticle(id);
        loadArticles();
      } catch (error) {
        console.error('Purge failed:', error);
      }
    }
  };

  const columns = [
    { field: 'name', headerName: 'IDENTIFIER', flex: 1 },
    { field: 'title', headerName: 'LOG_TITLE', flex: 1 },
    {
      field: 'isActive',
      headerName: 'UPLINK_STATUS',
      flex: 1,
      renderCell: (params) => (
        <Switch
          checked={params.row.isActive}
          onChange={() => handleToggleActive(params.row._id)}
          sx={{ 
            '& .MuiSwitch-switchBase.Mui-checked': { color: '#9d0000' }, 
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#9d0000' }
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'COMMANDS',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} sx={{ height: '100%', alignItems: 'center' }}>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => handleEdit(params.row._id)}
            sx={{ color: '#fff', borderColor: '#444' }}
          >
            EDIT
          </Button>
          <Button 
            variant="contained" 
            size="small" 
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={() => handlePurge(params.row._id)}
            sx={{ backgroundColor: '#9d0000', '&:hover': { backgroundColor: '#ff0000' }}}
          >
            PURGE
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff', letterSpacing: '1px' }}>
          INTEL_DATABASE_ENTRIES
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
          sx={{ backgroundColor: '#9d0000', '&:hover': { backgroundColor: '#ff0000' }}}
        >
          NEW_INTEL
        </Button>
      </Stack>

      <Paper sx={{ height: 600, width: '100%', backgroundColor: '#050505', border: '1px solid #333' }}>
        <DataGrid
          rows={articles}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
          sx={{
            color: '#d1d1d1',
            border: 'none',
            '& .MuiDataGrid-cell': { borderBottom: '1px solid #222' },
            '& .MuiDataGrid-columnHeaders': { backgroundColor: '#0a0a0a', borderBottom: '2px solid #9d0000' },
            '& .MuiDataGrid-footerContainer': { backgroundColor: '#0a0a0a', borderTop: '2px solid #9d0000' },
          }}
        />
      </Paper>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ borderBottom: '1px solid #9d0000', pb: 1, mb: 3, fontWeight: 'bold' }}>
            {isEditing ? 'MODIFY_LOG_DATA' : 'INITIALIZE_NEW_LOG'}
          </Typography>
          <Stack spacing={3}>
            <TextField
              label="IDENTIFIER (Slug)"
              fullWidth
              value={newArticle.name}
              onChange={(e) => setNewArticle({ ...newArticle, name: e.target.value })}
              InputLabelProps={{ style: { color: '#9d0000' } }}
              sx={{ input: { color: '#fff' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }}}}
            />
            <TextField
              label="LOG_TITLE"
              fullWidth
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              InputLabelProps={{ style: { color: '#9d0000' } }}
              sx={{ input: { color: '#fff' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }}}}
            />
            <TextField
              label="INTEL_CONTENT"
              multiline
              rows={5}
              fullWidth
              value={newArticle.content.join('\n')}
              onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value.split('\n') })}
              InputLabelProps={{ style: { color: '#9d0000' } }}
              sx={{ '& .MuiInputBase-input': { color: '#fff' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }}}}
            />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} sx={{ color: '#999' }}>DISCARD</Button>
            <Button 
              variant="contained" 
              onClick={handleSaveArticle}
              sx={{ backgroundColor: '#9d0000', '&:hover': { backgroundColor: '#ff0000' }}}
            >
              {isEditing ? 'COMMIT_CHANGES' : 'BROADCAST_LOG'}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}

export default DashArticleListPage;