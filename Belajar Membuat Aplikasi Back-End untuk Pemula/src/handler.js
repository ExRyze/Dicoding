const { nanoid } = require('nanoid');
const books = require('./books');

const addBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  
  if (name === undefined || name === '') {
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
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished = false;
  if (pageCount === readPage) {
    finished = true;
  }
  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  };

  books.push(newBook);
 
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: newBook.id
    }
  });
  response.code(201);
  return response;
};

const getBooks = (request, h) => {
  
  let { name, reading, finished } = request.query;

  let rspBooks = books;

  if (name !== undefined) {
    rspBooks = rspBooks.filter((book) => {return book.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;});
  }
  if (reading !== undefined) {
    if (reading === '0') {
      rspBooks = rspBooks.filter((book) => {return book.reading === false;});
    } else if (reading === '1') {
      rspBooks = rspBooks.filter((book) => {return book.reading === true;});
    }
  }
  if (finished !== undefined) {
    if (finished === '0') {
      rspBooks = rspBooks.filter((book) => {return book.finished === false;});
    } else if (finished === '1') {
      rspBooks = rspBooks.filter((book) => {return book.finished === true;});
    }
  }

  const response = h.response({
    status: 'success',
    data: {
      books: rspBooks
    }
  });
  response.code(200);
  return response;
};

const getBook = (request, h) => {
  const { bookId } = request.params;
  const check = books.filter((book) => {return book.id === bookId;}).length > 0;

  if (check) {
    const response = h.response({
      status: 'success',
      data: {
        book: books.filter((book) => {return book.id === bookId;})
      }
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const updBook = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  
  if (name === undefined || name === '') {
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
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((book) => {return book.id === bookId;});

  if (index !== -1) {
    const updatedAt = new Date().toISOString();
    let finished = false;
    if (pageCount === readPage) {
      finished = true;
    }
    books[index] = {
      ...books[index],
      name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt
    };
 
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const delBook = (request, h) => {
  const { bookId } = request.params;
  
  const index = books.findIndex((book) => {return book.id === bookId;});
 
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = { addBook, getBooks, getBook, updBook, delBook };