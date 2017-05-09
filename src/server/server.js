const frontend = require('./frontend');
const backend= require('./backend');

const PORT = process.env.PORT || 7777;
const PROD = process.env.NODE_ENV === "production";

if (PROD)
{
    // Run only the backend on production. It will serve the frontend on request.
    backend(PORT);
}
else
{
    // Run the backend server and the frontend using webpack-dev-server. While the frontend server
    // is still configured to proxy all requests back to the backend, using webpack-dev-server allows 
    // for Hot Module Replacement to be utilized for the frontend.
    backend(PORT - 1);
    frontend(PORT);
}
