import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchArticleByName } from '../../services/ArticleService';
import NotFoundPage from '../NotFoundPage.jsx';

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchArticleByName(name);
        if (data?.article && data.article.isActive !== false) {
          setArticle(data.article);
        } else {
          setArticle(null);
        }
      } catch (err) {
        setError('DECRYPTION ERROR: FILE INACCESSIBLE.');
      } finally {
        setIsLoading(false);
      }
    };
    loadArticle();
  }, [name]);

  if (isLoading) return <div className="page"><p className="muted">DECRYPTING FILE...</p></div>;
  if (error || !article) return <NotFoundPage />;

  return (
    <div className="page article-page">
      <div className="page-header">
        <p className="eyebrow" style={{color: 'var(--accent)'}}>SCOUTING_REPORT</p>
        <h1 style={{textTransform: 'uppercase'}}>{article.title}</h1>
        <div className="article-meta">
          <span className="pill" style={{background: 'var(--accent)', color: 'white', border: 'none'}}>DANGER LEVEL: HIGH</span>
          <span className="muted">EST. EXTRACTION: {Math.max(2, Math.ceil(article.content.length / 2))} MIN</span>
        </div>
      </div>

      <div className="article-body">
        {article.content.map((paragraph, idx) => (
          <p key={idx} style={{borderLeft: '1px solid #222', paddingLeft: '20px', marginBottom: '20px'}}>
            {paragraph}
          </p>
        ))}
        
        <div className="card callout" style={{background: '#0f0000', borderLeftColor: 'var(--accent)'}}>
          <h3 style={{color: 'var(--accent)'}}>⚠ PROCEED WITH CAUTION</h3>
          <p>
            Intel in this sector is updated frequently by local scouts. Check the timestamp 
            before attempting a supply run.
          </p>
          <Link to="/articles" className="button-link primary">
            RETURN TO MAP
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;