// Importações necessárias
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const moment = require("moment"); // Adicionando moment.js para formatação de datas

// Inicialize o Firebase Admin com a chave privada
const serviceAccount = require("./google-services.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Obtém a referência do Firestore

const app = express();
app.use(cors()); // Permite requisições de origens diferentes (CORS)
app.use(express.json()); // Middleware para lidar com JSON

// Rota para adicionar um usuário ao Firestore
app.post("/api/addUser", async (req, res) => {
  const { email, senha, telefone, nome } = req.body;

  if (!email || !senha || !telefone || !nome) {
    return res.status(400).send({ error: "Dados incompletos!" });
  }

  try {
    // Hashear a senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Adicionar usuário com senha hasheada
    const docRef = await db.collection("usuarios").add({
      email,
      senha: senhaHash, // Salva a senha como hash
      telefone,
      nome,
    });

    res.status(201).send({
      message: "Usuário cadastrado com sucesso!",
      id: docRef.id,
    });
  } catch (error) {
    console.error("Erro ao salvar no Firestore:", error);
    res.status(500).send({ error: "Erro ao salvar no Firestore." });
  }
});

// Rota para adicionar uma tarefa ao Firestore
app.post("/api/tarefas", async (req, res) => {
  try {
    const { userId, titulo, descricao, horario } = req.body;

    if (!userId || !titulo || !descricao || !horario ) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const formattedHorario = moment(horario, "DD/MM/YYYY HH:mm").toDate(); // Converte para o formato correto

    const tarefasRef = db.collection("tarefas");
    const novaTarefa = {
      userId,
      titulo,
      descricao,
      horario: formattedHorario,
    };

    const docRef = await tarefasRef.add(novaTarefa);
    res.status(201).json({ message: "Tarefa adicionada!", id: docRef.id });
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
    res.status(500).json({ error: "Erro ao adicionar tarefa." });
  }
});

// Rota para listar as tarefas de um usuário
app.get("/api/tarefas/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "O ID do usuário é obrigatório!" });
    }

    const tarefasSnapshot = await db.collection("tarefas").where("userId", "==", userId).get();

    if (tarefasSnapshot.empty) {
      return res.status(404).json({ message: "Nenhuma tarefa encontrada para este usuário." });
    }

    const tarefas = tarefasSnapshot.docs.map((doc) => {
      const tarefaData = doc.data();
      return {
        id: doc.id,
        ...tarefaData,
        horario: moment(tarefaData.horario.toDate()).format("DD/MM/YYYY HH:mm"), // Formata a data
      };
    });

    res.status(200).json(tarefas);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    res.status(500).json({ error: "Erro ao buscar tarefas." });
  }
});

// Rota para excluir uma tarefa
app.delete("/api/tarefas/:id", async (req, res) => {
  try {
    const { id } = req.params; // ID da tarefa a ser excluída

    // Referência à tarefa no Firestore
    const tarefaRef = db.collection("tarefas").doc(id);
    const tarefa = await tarefaRef.get();

    if (!tarefa.exists) {
      return res.status(404).json({ error: "Tarefa não encontrada!" });
    }

    await tarefaRef.delete();
    res.status(200).json({ message: "Tarefa excluída com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    res.status(500).json({ error: "Erro ao excluir tarefa." });
  }
});

// Rota para editar uma tarefa
app.put("/api/tarefas/:id", async (req, res) => {
  try {
    const { id } = req.params; // ID da tarefa a ser atualizada
    const { titulo, descricao, horario } = req.body;

    // Verifica se os campos necessários foram fornecidos
    if (!titulo && !descricao && !horario ) {
      return res.status(400).json({ error: "Nenhum campo para atualizar foi fornecido!" });
    }

    const atualizacoes = {};
    if (titulo) atualizacoes.titulo = titulo;
    if (descricao) atualizacoes.descricao = descricao;
    if (horario) atualizacoes.horario = new Date(horario); // Formato de data

    // Atualiza a tarefa no Firestore
    const tarefaRef = db.collection("tarefas").doc(id);
    const tarefa = await tarefaRef.get();

    if (!tarefa.exists) {
      return res.status(404).json({ error: "Tarefa não encontrada!" });
    }

    await tarefaRef.update(atualizacoes);
    res.status(200).json({ message: "Tarefa atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).json({ error: "Erro ao atualizar tarefa." });
  }
});



// Rota de autenticação (login)
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send({ error: "E-mail e senha são obrigatórios!" });
  }

  try {
    const emailNormalizado = email.toLowerCase().trim();
    const usuarios = await db.collection("usuarios").where("email", "==", emailNormalizado).get();

    if (usuarios.empty) {
      return res.status(401).send({ error: "E-mail ou senha inválidos!" });
    }

    const usuarioDoc = usuarios.docs[0];
    const usuario = usuarioDoc.data();

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).send({ error: "E-mail ou senha inválidos!" });
    }

    // Gera um token JWT
    const token = jwt.sign({ id: usuarioDoc.id }, "sua_chave_secreta", { expiresIn: "1h" });

    res.status(200).send({
      message: "Login realizado com sucesso!",
      token,
      usuario: {
        id: usuarioDoc.id,
        email: usuario.email,
        nome: usuario.nome,
      },
    });
  } catch (error) {
    console.error("Erro ao autenticar:", error);
    res.status(500).send({ error: "Erro ao autenticar." });
  }
});

// Middleware para interpretar JSON no corpo da requisição
app.use(bodyParser.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("Bem-vindo ao backend com Node.js e Express!");
});

// Porta do servidor
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});