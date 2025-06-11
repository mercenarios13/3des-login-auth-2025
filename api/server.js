require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

const loginRoutes = require('./src/routes/login');
const postsRoutes = require('./src/routes/posts');

const teste = (req, res) => {
    res.json({titulo:'API exemplo JWT com Node.js e Express'});
    console.log('Rota de teste acessada');
}

app.use(cors());
app.use(express.json());
app.get('/', teste);
app.use(loginRoutes);
app.use(postsRoutes);

app.listen(port, () => {
    console.log('http://localhost:' + port);
})