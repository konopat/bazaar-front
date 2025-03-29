import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';
import { BlogPost } from '../../constants/blog';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const { id, title, excerpt, image, date, category, slug } = post;

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
          />
          <span className="blog-card__category">{category}</span>
        </div>
        
        <div className="blog-card__content">
          <span className="blog-card__date">{date}</span>
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