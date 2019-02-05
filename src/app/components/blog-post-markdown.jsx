import React from 'react';
import styles from '../static/styles/components/blog-post-markdown.css';

const BlogPostImageBlock = ({ children }) => <figure className={styles.imageBlock}>{children}</figure>;

const BlogPostImageGroup = ({ children, maxImagePerRow }) => {
  const imageMargin = 10;
  const style = {
    flex: `1 1 calc(${100 / maxImagePerRow}% - ${maxImagePerRow * imageMargin}px)`,
  };

  let key = 0;
  const childrenWithProps = children.map(child => React.cloneElement(child,
    {
      key: key++,
      style,
    }));

  return <figure className={styles.imageGroup}>{childrenWithProps}</figure>;
};

const BlogPostImage = ({ index, src, title, caption, alt, style, context }) => (
  // TODO: add proper button wrapper around element.
  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions
  <figure tabIndex="0" className={styles.imgCell} style={style} onClick={() => context.viewGallery(index)}
    onKeyUp={(e) => {
      if (e.key === 'Enter') {
        context.viewGallery(index);
      }
    }}
  >
    <img className={styles.img} src={src} alt={alt} title={title} />
    <figcaption className={styles.imgCaptionGroup}>
      <h3 className={styles.imgCaptionHeader}>{title}</h3>
      <p className={styles.imgCaptionDescription}>{caption}</p>
    </figcaption>
  </figure>
);

const YoutubeEmbed = ({ src }) => (
  <div className={styles.youtubeEmbedContainer}>
    <iframe className={styles.youtubeEmbed} title={src} src={src} frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen />
  </div>
);

export { BlogPostImageBlock, BlogPostImageGroup, BlogPostImage, YoutubeEmbed };
