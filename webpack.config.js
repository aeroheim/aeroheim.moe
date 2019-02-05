module.exports = env => [require('./webpack.app')(env), require('./webpack.server')(env)];
