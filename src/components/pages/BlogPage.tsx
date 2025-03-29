import { useState, useCallback } from 'react';
import Icon from '../../components/common/Icon';
import { BLOG_POSTS, CATEGORIES, POSTS_PER_PAGE } from '../../constants/blog';

import '../../styles/pages/blog.css';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Фильтрация постов по категории и поисковому запросу
  const filteredPosts = BLOG_POSTS.filter(post => {
    // Находим соответствующую категорию
    const categoryItem = CATEGORIES.find(cat => 
      cat.slug === selectedCategory || (selectedCategory === 'all' && cat.name === 'Все')
    );
    
    // Проверяем соответствие категории
    const matchesCategory = selectedCategory === 'all' || 
                           (categoryItem && post.category === categoryItem.name);
    
    // Проверяем поисковый запрос
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Пагинация
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  const handleCategoryChange = useCallback((categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1); // Сбрасываем страницу при смене категории
  }, []);
  
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Сбрасываем страницу при поиске
  }, []);
  
  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setCurrentPage(1);
  }, []);

  return (
    <div className="blog">
      <div className="container">
        <h1 className="section-title section-title--centered">Блог</h1>
        
        <div className="blog__search">
          <div className="search-field">
            <input
              type="text"
              placeholder="Поиск по статьям..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-field__input"
              aria-label="Поиск по блогу"
            />
            <button className="search-field__button" aria-label="Искать">
              <Icon name="search" size={20} />
            </button>
          </div>
        </div>
        
        <div className="blog__content">
          <aside className="blog__sidebar">
            <div className="blog__categories">
              <h2 className="section-title">Категории</h2>
              <ul className="categories-list">
                {CATEGORIES.map(category => (
                  <li 
                    key={category.id} 
                    className={`categories-list__item ${selectedCategory === category.slug ? 'categories-list__item--active' : ''}`}
                  >
                    <button
                      onClick={() => handleCategoryChange(category.slug)}
                      className="categories-list__button"
                      aria-current={selectedCategory === category.slug ? 'true' : 'false'}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          
          <main className="blog__main">
            {currentPosts.length > 0 ? (
              <>
                <div className="blog__posts">
                  {currentPosts.map(post => (
                    <article key={post.id} className="blog-card">
                      <div className="blog-card__image-wrapper">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="blog-card__image" 
                          loading="lazy"
                        />
                        <span className="blog-card__category">{post.category}</span>
                      </div>
                      <div className="blog-card__content">
                        <span className="blog-card__date">{post.date}</span>
                        <h3 className="blog-card__title">{post.title}</h3>
                        <p className="blog-card__excerpt">{post.excerpt}</p>
                        <a href={`/blog/${post.slug}`} className="blog-card__link">
                          Читать дальше
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <div className="blog__pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="pagination__button"
                      aria-label="Предыдущая страница"
                    >
                      &larr;
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`pagination__button ${currentPage === number ? 'pagination__button--active' : ''}`}
                        aria-current={currentPage === number ? 'page' : undefined}
                        aria-label={`Страница ${number}`}
                      >
                        {number}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="pagination__button"
                      aria-label="Следующая страница"
                    >
                      &rarr;
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="blog__no-results">
                <p>По вашему запросу ничего не найдено</p>
                <button 
                  onClick={handleResetFilters}
                  className="button button--primary"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </main>
        </div>
        
        <div className="divider-accent"></div>
      </div>
    </div>
  );
};

export default BlogPage; 