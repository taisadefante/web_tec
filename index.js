const express = require("express");
const path = require("path");
const app = express();

//definindo o template engine
app.set("view engine", "ejs");

//mvc - model view controller

//DEFININDO OS ARQUIVOS ESTÁTICOS - HTML - se não usar o ejs
//app.use(express.static(path.join(__dirname, "views")));

//DEFININDO OS ARQUIVOS PUBLICOS
//const publicFolder = path.join(__dirname, "public");
//const expressPublic = express.static(publicFolder);
//pp.use(expressPublic);
app.use(express.static(path.join(__dirname, "public")));

//ROTAS
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/posts", (req, res) => {
  res.render("posts");
});

//404 error (not found)
app.use((req, res) => {
  // middleware
  res.send("Pagina não encontrada");
});

// EXECUTANDO O SERVIDOR
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}.`));
