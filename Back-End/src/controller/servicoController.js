const { getAllService, getServiceById, updateService, createService, deleteService } = require("../model/servicosModel")

exports.getllServicoHandler = async(req, res) => {
    try{
        const services = await getAllService();
        res.status(200).json(services);
    }catch (error) {
        console.error('Erro ao buscar serviços:', error);
        res.status(500).json({ message: 'Erro ao buscar serviços' });
  }
}

exports.getServicoByIdHandler = async (req, res) => {
  const id = Number(req.params.id_service);

  try {
    const service = await getServiceById(id);

    if (!service) {
      return res.status(404).json({ message: `Serviço com ID ${id} não encontrado` });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error(`Erro ao buscar serviço ID ${id}:`, error);
    res.status(500).json({ message: 'Erro ao buscar serviço' });
  }
};

exports.createServicoHandler = async (req, res) => {
  const { nome_servico, agendamentos } = req.body;

  try {
    const newService = await createService(nome_servico, agendamentos);
    res.status(201).json(newService);
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    res.status(500).json({ message: 'Erro ao criar serviço' });
  }
};

exports.updateServicoHanlder = async(req, res) => {
    const id = Number(req.params.id_service);
    const updatedData = req.body;

     try {
    const updatedService = await updateService(id, updatedData);
    res.status(200).json(updatedService);
  } catch (error) {
    console.error(`Erro ao atualizar serviço ID ${id}:`, error);
    res.status(500).json({ message: 'Erro ao atualizar serviço' });
  }
}

exports.deleteServicoHandler = async (req, res) => {
  const id = Number(req.params.id_service);

  try {
    const result = await deleteService(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(`Erro ao deletar serviço ID ${id}:`, error);
    res.status(500).json({ message: 'Erro ao deletar serviço' });
  }
};