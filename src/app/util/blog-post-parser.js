import React from 'react';
import marksy from 'marksy/components';
import { BlogPostImageBlock, BlogPostImageGroup, BlogPostImage } from '../components/blog-post-image';

const parser = marksy({
    components: {
        ImageBlock(props) { return <BlogPostImageBlock {...props}/>; },
        ImageGroup(props) { return <BlogPostImageGroup {...props}/>; },
        Image(props) { return <BlogPostImage {...props}/>; },
    },
});

export default (markdown) => parser(markdown).tree;

