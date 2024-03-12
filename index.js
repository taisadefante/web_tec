const express = require("express");
const path = require("path");
const app = express();

//mvc - model view controller

//DEFININDO OS ARQUIVOS ESTÁTICOS - HTML
const staticFolder = path.join(__dirname, "views");
const expressStatic = express.static(staticFolder);
app.use(expressStatic);

//DEFININDO OS ARQUIVOS PUBLICOS
const publicFolder = path.join(__dirname, "public");
const expressPublic = express.static(publicFolder);
app.use(expressPublic);

//ROTAS
app.get("/", (req, res) => {
  res.render("views/index");
});

app.get("/sobre", (req, res) => {
  res.send("Sobre");
});

//404 error (not found)
app.use((req, res) => {
  // middleware
  res.send("Pagina não encontrada");
});

// EXECUTANDO O SERVIDOR
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}.`));
