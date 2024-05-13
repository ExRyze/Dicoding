const Hapi = require('@hapi/hapi');
// const routes = require('./routes');
 
const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
  });

  server.route([
    {
      method: 'GET',
      path: '/users/{username}',
      handler: (request, h) => {
          const { username } = request.params;
          return `Hello, ${username}!`;
      },
    },
    {
      method: 'GET',
      path: '/test',
      handler: (request, h) => {
          return `Hello!`;
      },
    }
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();