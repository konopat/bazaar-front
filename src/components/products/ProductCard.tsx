        <div className="product-card__image-container">
          <LazyImage
            src={imageUrl}
            alt={name}
            fallbackSrc="/images/product-placeholder.jpg"
            className="product-card__image"
            containerClassName="product-card__image-wrapper"
            objectFit="contain"
          />
        </div> 