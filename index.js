const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// definindo o template engine
app.set("view engine", "ejs");

// definindo os arquivos estáticos
// app.use(express.static(path.join(__dirname, 'views')))

// definindo os arquivos públicos
app.use(express.static(path.join(__dirname, "public")));

// habilita server para receber dados via post (formulário)
app.use(express.urlencoded({ extended: true }));

// rotas
app.get("/", (req, res) => {
  res.render("index", {
    title: "Digital Tech - Home",
  });
});

app.get("/posts", (req, res) => {
  res.render("posts", {
    title: "Digital Tech - Posts",
    posts: [
      {
        title: "Novidade no mundo da tecnologia",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum eum consequuntur dolore nihil, itaque omnis at tempore deserunt excepturi accusamus saepe vitae earum laudantium asperiores facere! Autem fuga ducimus iure?",
        stars: 1,
      },
      {
        title: "Criando um servidor com node.js",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum eum consequuntur dolore nihil, itaque omnis at tempore deserunt excepturi accusamus saepe vitae earum laudantium asperiores facere! Autem fuga ducimus iure?",
      },
      {
        title: "Javascript é a linguagem mais usada no mundo!",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum eum consequuntur dolore nihil, itaque omnis at tempore deserunt excepturi accusamus saepe vitae earum laudantium asperiores facere! Autem fuga ducimus iure?",
        stars: 3,
      },
    ],
  });
});

app.get("/cadastro-posts", (req, res) => {
  const { c } = req.query;

  res.render("cadastro-posts", {
    title: "Digital Tech - Cadastrar Post",
    cadastrado: c,
  });
});

app.post("/salvar-post", (req, res) => {
  const { titulo, texto } = req.body;

  const data = fs.readFileSync("./store/posts.json");
  const posts = JSON.parse(data);

  posts.push({
    titulo,
    texto,
  });

  const postsString = JSON.stringify(posts);
  fs.writeFileSync("./store/posts.json", postsString);

  res.redirect("/cadastro-posts?c=1");
});

// 404 error (not found)
app.use((req, res) => {
  // middleware
  res.send("Página não encontrada!");
});

// executando o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
