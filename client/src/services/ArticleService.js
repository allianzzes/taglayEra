import axios from 'axios';
import constants from '../constants';

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// GET: All active reports
export const fetchArticles = () => API.get('/');

// GET: Specific report by URL name
export const fetchArticleByName = (name) => API.get(`/${name}`);

// POST: Create new scouting intel
export const createArticle = (article) => API.post('/', article);

// PUT: Edit existing report
export const updateArticle = (id, article) => API.put(`/${id}`, article);

// PATCH: Archive/Toggle report
export const toggleArticleStatus = (id) => API.patch(`/${id}/toggle`);

// DELETE: Purge report from database (The missing link!)
export const deleteArticle = (id) => API.delete(`/${id}`);



export default {
  fetchArticles,
  fetchArticleByName,
  createArticle,
  updateArticle,
  toggleArticleStatus,
  deleteArticle
};