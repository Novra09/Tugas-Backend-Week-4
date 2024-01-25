const {
  addABook,
  getAllBooks,
  getABook,
  updateABook,
  deleteABook,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addABook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getABook,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateABook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteABook,
  },
];
module.exports = routes;
