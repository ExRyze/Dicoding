const { addBook, getBooks, getBook, updBook, delBook } = require('./handler');


const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return 'Home!';
    },
  },
  {
    method: 'GET',
    path: '/dashboard',
    handler: () => {
      return 'Dashboard!';
    },
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBook,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: delBook,
  }
];

module.exports = routes;