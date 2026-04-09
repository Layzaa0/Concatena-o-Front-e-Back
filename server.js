const express = require("express");
const cors = require("cors");
const conexao = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando com nMySQL!");
});

app.post("/alunos", (req, res) => {
  const { nome, email, telefone, cpf, senha } = req.body;

  if (!nome || !email || !telefone || !cpf || !senha) {
    return res.status(400).json({
      erro: "Nome, email, telefone, cpf e senha são obrigatórios"
    });
  }

  const sql = "INSERT INTO alunos (nome, email, telefone, cpf, senha) VALUES (?, ?, ?, ?, ?)";
  
  conexao.query(sql, [nome, email, telefone, cpf, senha], (erro, resultado) => {
    if (erro) {
      console.error("Erro ao salvar aluno:", erro);
      return res.status(500).json({
        erro: "Erro ao salvar no banco de dados"
      });
    }

    res.status(201).json({
      mensagem: "Aluno cadastrado com sucesso!",
      id: resultado.insertId
    });
  });
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});