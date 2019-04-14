import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description }) => (
  <Helmet>
    <meta name="og:type" content="website" />
    <meta name="og:title" content={title} />
    <meta name="og:description" content={description} />
    <meta name="og:image" content="https://aeroheim.moe/favicon-512x512.png" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@aeroheim" />
  </Helmet>
);

export default Meta;
