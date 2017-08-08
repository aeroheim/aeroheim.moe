import React, { createElement } from 'react';
import marksy from 'marksy/components';
import prism from 'prismjs';
import prismjsx from 'prismjs/components/prism-jsx'
import prismLanguages from 'prism-languages';
import { BlogPostImageBlock, BlogPostImageGroup, BlogPostImage } from '../components/blog-post-image';

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
    },
});

export default (markdown) => parser(markdown).tree;

