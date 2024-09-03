const express = require('express');
const connectDB = require('./config');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware para JSON
app.use(express.json());

// Usar rotas de livros
app.use('/api', bookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
