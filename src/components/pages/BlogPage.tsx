import React, { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Как сохранить букет свежим дольше',
    excerpt: 'Узнайте простые и эффективные способы продлить жизнь срезанных цветов в домашних условиях',
    image: '/images/blog/blog-1.jpg',
    date: '15 мая 2023',
    category: 'Советы',
    slug: 'keep-flowers-fresh'
  },
  {
    id: 2,
    title: 'Тренды флористики 2023',
    excerpt: 'Обзор самых популярных цветочных композиций, цветовых сочетаний и стилей в этом сезоне',
    image: '/images/blog/blog-2.jpg',
    date: '3 апреля 2023',
    category: 'Тренды',
    slug: 'floral-trends-2023'
  },
  {
    id: 3,
    title: 'Язык цветов: что означают разные цветы',
    excerpt: 'История флориографии и значения популярных цветов в разных культурах',
    image: '/images/blog/blog-3.jpg',
    date: '21 марта 2023',
    category: 'История',
    slug: 'flower-language'
  },
  {
    id: 4,
    title: 'Букет на свадьбу: как выбрать идеальный',
    excerpt: 'Советы по выбору свадебного букета, который идеально дополнит образ невесты',
    image: '/images/blog/blog-4.jpg',
    date: '15 февраля 2023',
    category: 'Свадьба',
    slug: 'wedding-bouquet'
  },
  {
    id: 5,
    title: 'Растения для офиса: топ-10 неприхотливых видов',
    excerpt: 'Какие растения выбрать для офисного пространства, чтобы создать уютную атмосферу',
    image: '/images/blog/blog-5.jpg',
    date: '10 января 2023',
    category: 'Комнатные растения',
    slug: 'office-plants'
  },
  {
    id: 6,
    title: 'Сезонные цветы: что цветет зимой',
    excerpt: 'Обзор зимних цветов и растений, которые помогут создать праздничное настроение',
    image: '/images/blog/blog-6.jpg',
    date: '5 декабря 2022',
    category: 'Сезонные цветы',
    slug: 'winter-flowers'
  }
];

const CATEGORIES: Category[] = [
  { id: 1, name: 'Все', slug: 'all' },
  { id: 2, name: 'Советы', slug: 'tips' },
  { id: 3, name: 'Тренды', slug: 'trends' },
  { id: 4, name: 'История', slug: 'history' },
  { id: 5, name: 'Свадьба', slug: 'wedding' },
  { id: 6, name: 'Комнатные растения', slug: 'indoor-plants' },
  { id: 7, name: 'Сезонные цветы', slug: 'seasonal-flowers' }
];

const POSTS_PER_PAGE = 4;

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Фильтрация постов по категории и поисковому запросу
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Пагинация
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1); // Сбрасываем страницу при смене категории
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Сбрасываем страницу при поиске
  };
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
            />
            <button className="search-field__button">
              🔍
            </button>
          </div>
        </div>
        
        <div className="blog__content">
          <aside className="blog__sidebar">
            <div className="blog__categories">
              <h2 className="blog__sidebar-title">Категории</h2>
              <ul className="categories-list">
                {CATEGORIES.map(category => (
                  <li 
                    key={category.id} 
                    className={`categories-list__item ${selectedCategory === category.slug ? 'categories-list__item--active' : ''}`}
                  >
                    <button
                      onClick={() => handleCategoryChange(category.slug)}
                      className="categories-list__button"
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
                        <img src={post.image} alt={post.title} className="blog-card__image" />
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
                    >
                      &larr;
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`pagination__button ${currentPage === number ? 'pagination__button--active' : ''}`}
                      >
                        {number}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="pagination__button"
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
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="button button--primary"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 