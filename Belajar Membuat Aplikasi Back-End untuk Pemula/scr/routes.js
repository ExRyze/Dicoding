const routes = [
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
  // {
  //   method: 'POST',
  //   path: '/login',
  //   handler: (request, h) => {
  //     const { username, password } = request.payload;
  //     return `Welcome ${username}!`;
  //   },
  // }
]