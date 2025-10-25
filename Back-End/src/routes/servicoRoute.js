const express = require('express');
const { getllServicoHandler, getServicoByIdHandler, createServicoHandler, updateServicoHanlder, deleteServicoHandler } = require('../controller/servicoController');
const app = express.Router();

app.get('/', getllServicoHandler);
app.get('/:id_service', getServicoByIdHandler);
app.post('/', createServicoHandler);
app.put('/:id_service', updateServicoHanlder);
app.delete('/:id_service', deleteServicoHandler);

module.exports = app;