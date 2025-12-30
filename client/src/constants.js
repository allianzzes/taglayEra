const HOST = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : '/api';

export default { HOST };