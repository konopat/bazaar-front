import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Icon from '../common/Icon';
import BlogPostCard from '../common/BlogPostCard';
import { BLOG_POSTS } from '../../constants/blog';

import '../../styles/pages/blog-post.css';

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
      
      <div className="blog-post__header" style={{ backgroundImage: `url(${currentPost.image})` }}>
        <div className="container">
          <div className="blog-post__header-content">
            <button 
              onClick={() => navigate('/blog')} 
              className="blog-post__back-button"
            >
              &larr; Вернуться к блогу
            </button>
            <h1 className="blog-post__title">{currentPost.title}</h1>
            <div className="blog-post__meta">
              <span className="blog-post__date">{currentPost.date}</span>
              <span className="blog-post__category">{currentPost.category}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="blog-post__content">
          {currentPost.content ? (
            <>
              {currentPost.content.intro && (
                <div className="blog-post__intro">
                  <p>{currentPost.content.intro}</p>
                </div>
              )}
              
              <div className="blog-post__sections">
                {currentPost.content.sections.map((section, index) => (
                  <section key={index} className="blog-post__section">
                    <h2 className="section-title">{section.title}</h2>
                    
                    <div className="blog-post__section-content">
                      {section.text.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="blog-post__paragraph">
                          {paragraph.startsWith('•') ? (
                            <ul className="blog-post__list">
                              {paragraph.split('\n').map((item, j) => (
                                <li key={j}>{item.replace('• ', '')}</li>
                              ))}
                            </ul>
                          ) : (
                            paragraph
                          )}
                        </p>
                      ))}
                    </div>
                    
                    {section.image && (
                      <div className="blog-post__image-wrapper">
                        <img 
                          src={section.image} 
                          alt={section.title} 
                          className="blog-post__image"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </section>
                ))}
              </div>
              
              {currentPost.content.conclusion && (
                <div className="blog-post__conclusion">
                  <h2 className="section-title">Заключение</h2>
                  <p>{currentPost.content.conclusion}</p>
                </div>
              )}
            </>
          ) : (
            <div className="blog-post__excerpt">
              <p>{currentPost.excerpt}</p>
              <p>Полный текст статьи находится в разработке.</p>
            </div>
          )}
          
          <div className="blog-post__share">
            <p className="blog-post__share-title">Поделиться:</p>
            <div className="blog-post__share-buttons">
              <button className="blog-post__share-button" aria-label="Поделиться в Telegram">
                <Icon name="telegram" size={20} />
              </button>
              <button className="blog-post__share-button" aria-label="Поделиться в WhatsApp">
                <Icon name="whatsapp" size={20} />
              </button>
              <button className="blog-post__share-button" aria-label="Поделиться в Instagram">
                <Icon name="instagram" size={20} />
              </button>
            </div>
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