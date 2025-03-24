import Skeleton from './Skeleton';

const PageSkeleton = () => {
  return (
    <div className="page-skeleton">
      <div className="page-skeleton__header">
        <Skeleton height={50} className="page-skeleton__title" />
        <Skeleton height={24} width="60%" className="page-skeleton__subtitle" />
      </div>
      
      <div className="page-skeleton__content">
        {[1, 2, 3].map((item) => (
          <div key={item} className="page-skeleton__card">
            <Skeleton height={200} className="page-skeleton__image" />
            <Skeleton height={24} className="page-skeleton__card-title" />
            <Skeleton height={16} width="80%" />
            <Skeleton height={16} width="60%" />
            <Skeleton height={40} className="page-skeleton__button" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageSkeleton; 