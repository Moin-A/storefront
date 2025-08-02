// next.config.js

module.exports = {
    env:{
      API_URL: process.env.API_URL
    },
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3001',
          pathname: '/rails/active_storage/**',
        },
        {
          protocol: 'http',
          hostname: '0.0.0.0',
          port: '3001',
          pathname: '/rails/active_storage/**',
        },
      ],
    },
  };