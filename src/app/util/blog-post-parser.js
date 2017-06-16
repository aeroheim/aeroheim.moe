import React, { createElement } from 'react';
import marksy from 'marksy/components';
import highlight from 'highlight.js/lib/highlight';
import hljs from 'highlight.js/lib/languages/javascript';
import { BlogPostImageBlock, BlogPostImageGroup, BlogPostImage } from '../components/blog-post-image';

highlight.registerLanguage('javascript', hljs);

const parser = marksy({
    createElement,
    highlight,
    components: {
        ImageBlock(props) { return <BlogPostImageBlock {...props}/>; },
        ImageGroup(props) { return <BlogPostImageGroup {...props}/>; },
        Image(props) { return <BlogPostImage {...props}/>; },
    },
});

export default (markdown) => parser(markdown).tree;

