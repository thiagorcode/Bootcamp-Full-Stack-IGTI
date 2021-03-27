import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
const { Schema } = db

const create = async (req, res) => {
  try {
    let status = await Schema.insertMany(req.body)

    res.send({ status: "Criado com sucesso!" });
    logger.info(`POST /grade - ${JSON.stringify(status)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const { name } = req.query;
  //condicao para o filtro no findAll
  const condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  const resultFind = await Schema.find(condition)

  try {
    res.send(resultFind);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;

  try {

    let resultFindOne = await Schema.findOne({ _id: id }, { _id: 0 })
    res.send(resultFindOne);

    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade = ${id} - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }
  const { name, type, subject, value } = req.body;
  const { id } = req.params;

  try {

    let statusUpdate = await Schema.findOneAndUpdate({ _id: id }, { name, type, subject, value }, { new: true });
    res.send({
      message: 'Grade atualizado com sucesso',
      status: statusUpdate
    });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;


  try {
    const statusDelete = await Schema.deleteOne({ _id: id })

    res.send({
      message: 'Grade excluido com sucesso',
      statusDelete
    });
    res.end()
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    const statusRemove = await Schema.deleteMany({})

    res.send({
      message: `Grades excluidas`,
      statusRemove
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todas as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
