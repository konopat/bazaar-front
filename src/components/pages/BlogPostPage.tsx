import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BLOG_POSTS } from '../../mocks/blog';
import BlogPostCard from '../common/BlogPostCard';
import SocialLinks from '../common/SocialLinks';
import LazyImage from '../common/LazyImage';

import '../../styles/pages/blog-post.css';

// Стили для текста в шапке блога
const headerTextStyles = {
  color: '#F4E8DD', // Кремовый белый цвет
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
};

const headerButtonStyles = {
  color: '#F4E8DD',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Найти текущий пост по slug
  const currentPost = useMemo(() => {
    return BLOG_POSTS.find(post => post.slug === slug);
  }, [slug]);

  // Найти связанные посты
  const relatedPosts = useMemo(() => {
    if (!currentPost?.relatedPosts) return [];
    return currentPost.relatedPosts
      .map(id => BLOG_POSTS.find(post => post.id === id))
      .filter(Boolean);
  }, [currentPost]);

  // Обработчик прогресса прокрутки страницы
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Прокрутка вверх при первой загрузке страницы
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [slug]);

  // Если пост не найден, перенаправляем на страницу блога
  useEffect(() => {
    if (!slug || (slug && !currentPost)) {
      navigate('/blog');
    }
  }, [slug, currentPost, navigate]);

  if (!currentPost) {
    return (
      <div className="container">
        <div className="blog-post__loading">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <div className="progress-bar">
        <div 
          className="progress-bar__fill" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      
      <div 
        className="blog-post__header" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${currentPost.image})` 
        }}
      >
        <div className="container">
          <div className="blog-post__header-content">
            <button 
              onClick={() => navigate('/blog')} 
              className="blog-post__back-button"
              style={headerButtonStyles}
            >
              &larr; Вернуться к блогу
            </button>
            <h1 className="section-title blog-post__title" style={headerTextStyles}>{currentPost.title}</h1>
            <div className="blog-post__meta">
              <span className="blog-post__category" style={headerTextStyles}>{currentPost.category.name}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="blog-post__content">
          {currentPost.content ? (
            <div className="blog-post__text" dangerouslySetInnerHTML={{ __html: currentPost.content }} />
          ) : (
            <div className="blog-post__excerpt">
              <p>{currentPost.excerpt}</p>
              <p>Полный текст статьи находится в разработке.</p>
            </div>
          )}
          
          <div className="blog-post__subscribe">
            <div className="divider-accent"></div>
            <h3 className="blog-post__subscribe-title">Подписаться на обновления</h3>
            <SocialLinks className="blog-post__social-links" />
          </div>
        </div>
        
        <div className="divider-accent"></div>
        
        {relatedPosts.length > 0 && (
          <div className="blog-post__related">
            <h2 className="section-title section-title--centered">Похожие статьи</h2>
            <div className="blog-post__related-posts">
              {relatedPosts.map(post => post && (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage; 