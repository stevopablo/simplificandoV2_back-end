const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Retorna todos os serviços
exports.getAllService = async () => {
  try {
    return await prisma.servico.findMany({ include: { agendamentos: true } });
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    throw error;
  }
};

// Retorna um serviço pelo ID
exports.getServiceById = async (id) => {
  try {
    return await prisma.servico.findUnique({
      where: { id_servico: Number(id) },
      include: { agendamentos: true }
    });
  } catch (error) {
    console.error(`Erro ao pegar serviço por ID: ${id}`, error);
    throw error;
  }
};

// Cria um novo serviço (agendamentos opcionais)
exports.createService = async (nomeServico, agendamentos = []) => {
  if (!nomeServico) {
    throw new Error('O nome do serviço é obrigatório');
  }

  try {
    return await prisma.servico.create({
      data: {
        nome_servico: nomeServico,
        agendamentos: {
          create: agendamentos.map(a => ({
            mensagem: a.mensagem,
            status: a.status || 'pendente',
            id_cliente: a.id_cliente
          }))
        }
      },
      include: { agendamentos: true }
    });
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    throw error;
  }
};

// Atualiza apenas o nome do serviço
exports.updateService = async (idService, updatedServiceData = {}) => {
  const existService = await exports.getServiceById(idService);
  if (!existService) {
    throw new Error(`Serviço com ID ${idService} não encontrado`);
  }

  try {
    return await prisma.servico.update({
      where: { id_servico: Number(idService) },
      data: {
        nome_servico: updatedServiceData.nome_servico || existService.nome_servico
      },
      include: { agendamentos: true }
    });
  } catch (error) {
    console.error(`Erro ao atualizar serviço ID ${idService}:`, error);
    throw error;
  }
};

// Deleta um serviço pelo ID
exports.deleteService = async (idService) => {
  const existService = await exports.getServiceById(idService);
  if (!existService) {
    throw new Error(`Serviço com ID ${idService} não encontrado`);
  }

  try {
    await prisma.servico.delete({
      where: { id_servico: Number(idService) }
    });
    return { message: `Serviço ID ${idService} deletado com sucesso.` };
  } catch (error) {
    console.error(`Erro ao deletar serviço ID ${idService}:`, error);
    throw error;
  }
};
