const express = require('express');
const router = express.Router();
const Book = require('../models/Book.js');

// Cadastro de livros
router.post('/books', async (req, res) => {
    try {
        const { title, author, publisher, year, pages } = req.body;

        // Validação de dados
        if (!title || !author || !publisher || !year || !pages) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        const newBook = new Book({ title, author, publisher, year, pages });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar o livro', error: err.message });
    }
});

// Listagem de livros
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar os livros', error: err.message });
    }
});

// Consulta de livro por ID
router.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        res.json(book);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao consultar o livro', error: err.message });
    }
});

// Remoção de livro
router.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        res.json({ message: 'Livro removido com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao remover o livro', error: err.message });
    }
});

module.exports = router;
