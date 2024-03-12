import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

function App() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    pages: '',
    status: '',
    release: '',
  });
  const apiUrl = 'http://localhost:3333/books';

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  const toggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = selectedBook ? `${apiUrl}/${selectedBook.id}` : apiUrl;
      const method = selectedBook ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save book');
      }

      await fetchBooks();
      setShowModal(false);
      setFormData({
        name: '',
        pages: '',
        status: '',
        release: '',
      });
    } catch (error) {
      console.error('Error saving book:', error.message);
    }
  };

  const handleDelete = async () => {
    if (!selectedBook) return;

    try {
      const response = await fetch(`${apiUrl}/${selectedBook.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      await fetchBooks();
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting book:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Book List</h1>
      <button onClick={toggleForm}>Adicionar Livro</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Páginas</th>
            <th>Status</th>
            <th>Lançamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.pages}</td>
              <td>{book.status}</td>
              <td>{book.release}</td>
              <td>
                <button onClick={() => openModal(book)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Book Modal"
      >
        <h2>{selectedBook ? 'Editar Livro' : 'Adicionar Livro'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Páginas:
            <input
              type="text"
              name="pages"
              value={formData.pages}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Status:
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Lançamento:
            <input
              type="text"
              name="release"
              value={formData.release}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Salvar</button>
          {selectedBook && (
            <button type="button" onClick={handleDelete}>
              Excluir
            </button>
          )}
        </form>
        <button onClick={closeModal}>Fechar</button>
      </Modal>
    </div>
  );
}

export default App;
