import React, { createElement } from 'react';
import marksy from 'marksy/jsx';
import prism from 'prismjs';
import prismLanguages from 'prism-languages';
import { BlogPostImageBlock, BlogPostImageGroup, BlogPostImage, YoutubeEmbed } from '../components/blog-post-markdown';
import styles from '../static/styles/components/blog-post-markdown.css';

function findComponentNodes(tree, filter) {
  let nodes = [];
  for (const node of tree) {
    if (node) {
      if (filter(node)) {
        nodes.push(node);
      }
      if (node.props && node.props.children) {
        nodes = nodes.concat(findComponentNodes(node.props.children, filter));
      }
    }
  }

  return nodes;
}

function compileBlogPost(markdown, context) {
  // NOTE: marksy does not guarantee that element/component overrides will only be called once per instance found. in addition,
  // component rendering functions are only called when rendered so no compile-time logic can be used within marksy.
  const compile = marksy({
    createElement,
    highlight(language, code) {
      return prism.highlight(code, Object.assign({}, prismLanguages[language]));
    },
    components:
        {
          ImageBlock(props) { return <BlogPostImageBlock {...props} />; },
          ImageGroup(props) { return <BlogPostImageGroup {...props} />; },
          Image(props) { return <BlogPostImage index={props.context.indexMap.get(props.src)} {...props} />; },
          YoutubeEmbed(props) { return <YoutubeEmbed {...props} />; },
        },
    elements:
        {
          h1({ children }) { return <h1 className={styles.h1}>{children}</h1>; },
          h2({ children }) { return <h2 className={styles.h2}>{children}</h2>; },
          h3({ children }) { return <h3 className={styles.h3}>{children}</h3>; },
          a({ href, title, target, children }) { return <a href={href} title={title} target={target} className={styles.a}>{children}</a>; },
          hr() { return <hr className={styles.hr} />; },
        },
  });

  // initial compile - parse tree and do compile-time logic.
  let content = compile(markdown, null, { ...context }).tree;
  const images = findComponentNodes(content, node => node.type && node.type.name === 'Image')
    .map((image, index) => ({
      index,
      src: image.props.src,
      title: image.props.title,
      caption: image.props.caption,
      alt: image.props.alt,
    }));

  // second compile - needed in order to provide indices for <BlogPostImage/> components.
  const indexMap = new Map(images.map(image => [image.src, image.index]));
  content = compile(markdown, null, { ...context, indexMap }).tree;

  return {
    content,
    images,
  };
}

export default compileBlogPost;
