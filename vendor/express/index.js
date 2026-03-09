const http = require('http');

function express() {
  const middlewares = [];
  const routes = [];

  const app = {
    use(fn) {
      middlewares.push(fn);
    },
    get(path, handler) {
      routes.push({ method: 'GET', path, handler });
    },
    listen(port, cb) {
      const server = http.createServer((req, res) => {
        res.json = (payload) => {
          res.statusCode = res.statusCode || 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(payload));
        };

        let index = 0;
        const next = () => {
          if (index < middlewares.length) {
            const mw = middlewares[index++];
            return mw(req, res, next);
          }

          const route = routes.find((r) => r.method === req.method && r.path === req.url.split('?')[0]);
          if (route) {
            return route.handler(req, res);
          }

          res.statusCode = 404;
          res.end('Not Found');
        };

        next();
      });

      server.listen(port, cb);
      return server;
    }
  };

  return app;
}

express.json = () => (_req, _res, next) => next();

module.exports = express;
