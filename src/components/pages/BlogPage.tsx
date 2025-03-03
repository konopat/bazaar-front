import React, { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  category: string;
  preview: string;
  image: string;
  date: string;
  readTime: number;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

const categories: Category[] = [
  { id: 'all', name: 'Все статьи', count: 12 },
  { id: 'care', name: 'Уход за цветами', count: 4 },
  { id: 'decoration', name: 'Декор', count: 3 },
  { id: 'events', name: 'Мероприятия', count: 2 },
  { id: 'trends', name: 'Тренды', count: 3 }
];

const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Как продлить жизнь срезанным цветам',
    category: 'care',
    preview: 'Простые советы, которые помогут вашим букетам радовать вас дольше. От правильной воды до температурного режима.',
    image: '/images/blog/flowers-care.jpg',
    date: '15 марта 2024',
    readTime: 5
  },
  {
    id: 2,
    title: 'Тренды свадебной флористики 2024',
    category: 'trends',
    preview: 'Какие цветы и композиции будут популярны на свадьбах в этом году? Разбираем основные тенденции.',
    image: '/images/blog/wedding-trends.jpg',
    date: '10 марта 2024',
    readTime: 7
  },
  {
    id: 3,
    title: 'Мастер-класс: создаем весенний букет',
    category: 'decoration',
    preview: 'Пошаговая инструкция по созданию красивой цветочной композиции из сезонных цветов.',
    image: '/images/blog/spring-bouquet.jpg',
    date: '5 марта 2024',
    readTime: 10
  }
  // Добавьте больше статей здесь
];

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6;

  const filteredPosts = mockPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="blog">
      <div className="container">
        <div className="blog__header">
          <h1 className="blog__title">Блог о цветах</h1>
          <div className="blog__search">
            <input
              type="text"
              placeholder="Поиск по статьям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog__search-input"
            />
          </div>
        </div>

        <div className="blog__content">
          <aside className="blog__sidebar">
            <div className="blog__categories">
              <h2 className="blog__categories-title">Категории</h2>
              <div className="blog__categories-list">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`blog__category ${selectedCategory === category.id ? 'blog__category--active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="blog__category-name">{category.name}</span>
                    <span className="blog__category-count">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="blog__main">
            <div className="blog__grid">
              {currentPosts.map(post => (
                <article key={post.id} className="blog-card">
                  <div className="blog-card__image">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="blog-card__content">
                    <div className="blog-card__meta">
                      <span className="blog-card__date">{post.date}</span>
                      <span className="blog-card__read-time">{post.readTime} мин чтения</span>
                    </div>
                    <h3 className="blog-card__title">{post.title}</h3>
                    <p className="blog-card__preview">{post.preview}</p>
                    <button className="blog-card__button">
                      Читать далее
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="blog__pagination">
                <button
                  className="blog__pagination-button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`blog__pagination-button ${currentPage === page ? 'blog__pagination-button--active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="blog__pagination-button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  →
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