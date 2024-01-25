const { nanoid } = require('nanoid');
const books = require('./books');

const addABook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);

    return response;
  }
  const id = nanoid();
  const finished = readPage === pageCount;
  const insertedAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();
  const book = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  books.push(book);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  let result;

  if (name !== undefined) {
    const filterBooksName = books.filter((book) => {
      const lowerBooksName = book.name.toLowerCase();
      return lowerBooksName.includes(name.toLowerCase());
    });
    result = filterBooksName.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
  } else if (reading !== undefined && ['0', '1'].includes(reading)) {
    const filterBooksReading = books.filter((book) => {
      if (reading === '0') {
        return book.reading === false;
      }
      return book.reading === true;
    });
    result = filterBooksReading.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
  } else if (finished !== undefined && ['0', '1'].includes(finished)) {
    const filterBooksFinished = books.filter((book) => {
      if (finished === '0') {
        return book.finished === false;
      }
      return book.finished === true;
    });
    result = filterBooksFinished.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
  } else {
    result = books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
  }
  const response = h.response({
    status: 'success',
    data: {
      books: result,
    },
  });
  return response;
};

const getABook = (request, h) => {
  const { bookId } = request.params;

  const booksFound = books.find((book) => book.id === bookId);

  if (booksFound === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  const response = h.response({
    status: 'success',
    data: {
      book: booksFound,
    },
  });
  return response;
};

const updateABook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const { bookId } = request.params;
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const indexBookFound = books.findIndex((book) => book.id === bookId);
  if (indexBookFound === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  const finished = readPage === pageCount;
  const updatedAt = new Date().toISOString();
  books[indexBookFound] = {
    ...books[indexBookFound],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt,
  };

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  return response;
};

const deleteABook = (request, h) => {
  const { bookId } = request.params;
  const indexBookFound = books.findIndex((book) => book.id === bookId);
  if (indexBookFound === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  books.splice(indexBookFound, 1);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
  return response;
};
module.exports = {
  addABook,
  getAllBooks,
  getABook,
  updateABook,
  deleteABook,
};
