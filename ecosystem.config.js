module.exports = {
  apps: [
    {
      name: 'AdmintalTalpakanV3',
      script: './server2.js',
      instances: 'max',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        NODE_APP_INSTANCE: 'max',
      },
    },
  ],
};
