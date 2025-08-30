const {getDefaultConfig} = require('@react-native/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  return {
    ...config,
    server: {
      ...config.server,
      enhanceMiddleware: (middleware) => (req, res, next) => {
        if (req.url.endsWith('/symbolicate')) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({stack: []}));
          return;
        }
        return middleware(req, res, next);
      },
    },
  };
})();
