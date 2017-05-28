import React from 'react';
import marksy from 'marksy/components';
import { ImageBlock, ImageGroup, Image } from './blog-post-image';

const BlogPostParser = marksy({
    components: {
        ImageBlock(props) { return <ImageBlock {...props}/>; },
        ImageGroup(props) { return <ImageGroup {...props}/>; },
        Image(props) { return <Image {...props}/>; },
    },
});

export default BlogPostParser;

