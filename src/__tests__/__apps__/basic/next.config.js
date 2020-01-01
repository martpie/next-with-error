module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack: (config) => {
      config.resolve.symlinks = false;

      return config;
    }
  });
};
