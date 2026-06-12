const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const normalizarDataNascimento = (valor) => {
  if (valor instanceof Date) {
    return Number.isNaN(valor.getTime()) ? null : valor;
  }

  if (typeof valor !== "string") {
    return null;
  }

  const valorLimpo = valor.trim();

  const partesBrasileiras = valorLimpo.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (partesBrasileiras) {
    const [, dia, mes, ano] = partesBrasileiras;
    const data = new Date(Number(ano), Number(mes) - 1, Number(dia));

    const dataValida =
      data.getFullYear() === Number(ano) &&
      data.getMonth() === Number(mes) - 1 &&
      data.getDate() === Number(dia);

    return dataValida ? data : null;
  }

  const dataIso = new Date(valorLimpo);
  return Number.isNaN(dataIso.getTime()) ? null : dataIso;
};

const cadastrar = async (req, res) => {
  try {
    const { nome, cpf, email, dataNascimento, senha } = req.body;

    if (!nome || !cpf || !email || !dataNascimento || !senha) {
      return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    }

    const dataNascimentoFormatada = normalizarDataNascimento(dataNascimento);
    if (!dataNascimentoFormatada) {
      return res.status(400).json({ mensagem: "Data de nascimento inválida" });
    }

    const cpfEmUso = await prisma.usuario.findFirst({
      where: { cpf, NOT: { id: req.usuarioId } },
    });
    if (cpfEmUso) {
      return res.status(400).json({ mensagem: "CPF já está em uso" });
    }

    const usuarioExiste = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExiste) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: { nome, cpf, email, dataNascimento: dataNascimentoFormatada, senha: senhaCriptografada },
    });

    return res.status(201).json({ mensagem: "Usuário criado", id: usuario.id });
  } catch (error) {
    console.error("Erro cadastrar:", error);
    return res.status(500).json({ mensagem: "Erro ao cadastrar usuário" });
  }
};

const login = async (req, res) => {
  try {
    const { identificador, senha } = req.body;

    if (!identificador || !senha) {
      return res.status(400).json({ mensagem: "Identificador e senha são obrigatórios" });
    }

    const usuario = await prisma.usuario.findFirst({
      where: {
        OR: [
          { email: identificador },
          { cpf: identificador }
        ]
      }
    });

    if (!usuario) {
      return res.status(401).json({ mensagem: "Identificador ou senha incorretos" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Identificador ou senha incorretos" });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao fazer login" });
  }
};

const perfil = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.usuarioId },
      select: { id: true, nome: true, email: true, criadoEm: true },
    });

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    return res.json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao buscar perfil" });
  }
};

const editarPerfil = async (req, res) => {
  try {
    const { nome, cpf, email, dataNascimento } = req.body;

    if (!nome && !email && !cpf && !dataNascimento) {
      return res.status(400).json({ mensagem: "Informe ao menos um campo para atualizar" });
    }

    if (email) {
      const emailEmUso = await prisma.usuario.findFirst({
        where: { email, NOT: { id: req.usuarioId } },
      });
      if (emailEmUso) {
        return res.status(400).json({ mensagem: "Email já está em uso" });
      }
    }
    if(cpf) {
      const cpfEmUso = await prisma.usuario.findFirst({
        where: { cpf, NOT: { id: req.usuarioId } },
      });
      if (cpfEmUso) {
        return res.status(400).json({ mensagem: "CPF já está em uso" });
      }
    }

    const dataNascimentoFormatada = dataNascimento ? normalizarDataNascimento(dataNascimento) : null;
    if (dataNascimento && !dataNascimentoFormatada) {
      return res.status(400).json({ mensagem: "Data de nascimento inválida" });
    }

    const usuario = await prisma.usuario.update({
      where: { id: req.usuarioId },
      data: {
        ...(nome && { nome }),
        ...(cpf && { cpf}),
        ...(email && { email }),
        ...(dataNascimentoFormatada && { dataNascimento: dataNascimentoFormatada }),
      },
      select: { id: true, nome: true, cpf: true, email: true, dataNascimento: true },
    });

    return res.json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao atualizar perfil" });
  }
};

const alterarSenha = async (req, res) => {
  try {
    const { senhaAtual, novaSenha } = req.body;

    if (!senhaAtual || !novaSenha) {
      return res.status(400).json({ mensagem: "Senha atual e nova senha são obrigatórias" });
    }

    const usuario = await prisma.usuario.findUnique({ where: { id: req.usuarioId } });

    const senhaCorreta = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Senha atual incorreta" });
    }

    const senhaCriptografada = await bcrypt.hash(novaSenha, 10);

    await prisma.usuario.update({
      where: { id: req.usuarioId },
      data: { senha: senhaCriptografada },
    });

    return res.json({ mensagem: "Senha alterada com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao alterar senha" });
  }
};

const excluirConta = async (req, res) => {
  try {
    const { senha } = req.body;

    if (!senha) {
      return res.status(400).json({ mensagem: "Senha é obrigatória para excluir a conta" });
    }

    const usuario = await prisma.usuario.findUnique({ where: { id: req.usuarioId } });

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Senha incorreta" });
    }

    await prisma.tarefa.deleteMany({ where: { usuarioId: req.usuarioId } });
    await prisma.usuario.delete({ where: { id: req.usuarioId } });

    return res.json({ mensagem: "Conta excluída com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao excluir conta" });
  }
};

module.exports = { cadastrar, login, perfil, editarPerfil, alterarSenha, excluirConta };