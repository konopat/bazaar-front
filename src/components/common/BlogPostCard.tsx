import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';
import { BlogPost } from '../../mocks/blog';
import { BlogPostCardProps } from '../../types/common';

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const { id, title, excerpt, image, category, slug } = post;

  return (
    <article className="blog-card">
      <Link to={`/blog/${slug}`} className="blog-card__link-wrapper">
        <div className="blog-card__image-container">
          <LazyImage
            src={image}
            alt={title}
            fallbackSrc="/images/blog-placeholder.jpg"
            aspectRatio={16/9}
            containerClassName="blog-card__image-container"
            className="blog-card__image"
            key={`blog-image-${id}`}
            objectFit="cover"
          />
          <span className="blog-card__category">{category.name}</span>
        </div>
        
        <div className="blog-card__content">
          <h3 className="blog-card__title">{title}</h3>
          <p className="blog-card__excerpt">{excerpt}</p>
          
          <div className="blog-card__action">
            <span className="blog-card__read-more">
              Читать дальше
              <span className="blog-card__arrow">→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogPostCard; 