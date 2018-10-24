import React, { createElement } from 'react';
import marksy from 'marksy/components';
import prism from 'prismjs';
import prismjsx from 'prismjs/components/prism-jsx'
import prismLanguages from 'prism-languages';
import { BlogPostImageBlock, BlogPostImageGroup, BlogPostImage, YoutubeEmbed } from '../components/blog-post-content';
import styles from '../static/styles/components/blog-post-elements.css';

const parser = marksy({
    createElement,
    highlight(language, code)
    {
        language = Object.assign({}, prismLanguages[language]);
        return prism.highlight(code, language);
    },
    components: 
    {
        ImageBlock(props) { return <BlogPostImageBlock {...props}/>; },
        ImageGroup(props) { return <BlogPostImageGroup {...props}/>; },
        Image(props) { return <BlogPostImage {...props}/>; },
        YoutubeEmbed(props) { return <YoutubeEmbed {...props}/>}, 
    },
    elements:
    {
        h1({id, children}) { return <h1 className={styles.h1}>{children}</h1>; },
        h2({id, children}) { return <h2 className={styles.h2}>{children}</h2>; },
        h3({id, children}) { return <h3 className={styles.h3}>{children}</h3>; },
        a ({href, title, target, children}) { return <a href={href} title={title} target={target} className={styles.a}>{children}</a>; },
        hr() { return <hr className={styles.hr}/>; },
    },
});

export default (markdown) => parser(markdown).tree;

