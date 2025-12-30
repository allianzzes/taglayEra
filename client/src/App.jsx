import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import Layout from './components/Layout';
import DashLayout from './components/DashLayout';
import AuthLayout from './components/AuthLayout';

// Landing Pages 
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import ArticlePage from './pages/LandingPages/ArticlePage';
import HomePage from './pages/LandingPages/HomePage';
import NewReport from './pages/LandingPages/NewReport';
import SignInPage from './pages/SignInPage'; 

// Dashboard Pages 
import UserListPage from './pages/DashboardPages/UserListPage';
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage';

// Error Page
import NotFoundPage from './pages/NotFoundPage';

//Guard
import ProtectedRoute from './components/ProtectedRoute';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'articles', element: <ArticleListPage /> },
      { path: 'articles/:name', element: <ArticlePage /> }
    ]
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'signin',
        element: <SignInPage />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <ProtectedRoute>
        <DashLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <DashArticleListPage /> }, // Default view when hitting /dashboard
      { path: 'users', element: <UserListPage /> },
      { path: 'dash-articles', element: <DashArticleListPage /> },
      { path: 'new-report', element: <NewReport /> },
    ]
  },
  // Catch-all for any other 404s
  {
    path: '*',
    element: <NotFoundPage />
  }
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;