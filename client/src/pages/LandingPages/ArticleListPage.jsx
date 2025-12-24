import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleList from '../../components/ArticleList';
import { fetchArticles } from '../../services/ArticleService';

function ArticleListPage() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchArticles();
        const activeArticles = (data?.articles || []).filter((article) => article.isActive);
        setArticleList(activeArticles);
      } catch (err) {
        setError('DATA CORRUPTION: UNABLE TO RETRIEVE SECTOR LOGS.');
      } finally {
        setIsLoading(false);
      }
    };
    loadArticles();
  }, []);

  if (isLoading) return <div className="page"><p className="muted">SCANNING FREQUENCIES...</p></div>;

  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow" style={{color: 'var(--accent)'}}>ENCRYPTED_DATABASE</p>
        <h1>ACTIVE SECTORS & SCOUTING INTEL.</h1>
        <p className="lead">
          Select a sector to view recent scouting reports, threat levels, and survivor logs. 
          Do not venture into unmapped territory without a secondary signal.
        </p>
      </div>

      {error ? (
        <div className="callout"><p>{error}</p></div>
      ) : articleList.length > 0 ? (
        <ArticleList articles={articleList} />
      ) : (
        <p className="muted">NO ACTIVE SIGNALS DETECTED IN THIS RADIUS.</p>
      )}

      <div className="cta-banner" style={{background: '#1a0000', border: '1px solid var(--accent)'}}>
        <h3>WANT TO CONTRIBUTE INTEL?</h3>
        <p>
          Verified scouts can upload new findings from the field. Authenticate your terminal 
          to gain write-access to the database.
        </p>
        <Link to="/about" className="button-link secondary">
          VIEW PROTOCOL
        </Link>
      </div>
    </div>
  );
}

export default ArticleListPage;