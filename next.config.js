// next.config.js

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '0.0.0.0',
          port: '3001',
          pathname: '/rails/active_storage/**',
        },
      ],
    },
  };