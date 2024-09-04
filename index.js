const express = require('express');
const connectDB = require('./config');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Conectar ao MongoDB
require('dotenv').config();

// Conecte ao MongoDB usando a URI do arquivo .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


// Middleware para JSON
app.use(express.json());

// Usar rotas de livros
app.use('/api', bookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
