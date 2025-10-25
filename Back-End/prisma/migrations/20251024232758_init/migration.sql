-- CreateTable
CREATE TABLE "Cliente" (
    "id_cliente" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "empresa" TEXT,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "Servico" (
    "id_servico" SERIAL NOT NULL,
    "nome_servico" TEXT NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id_servico")
);

-- CreateTable
CREATE TABLE "Agendamento" (
    "id_agendamento" SERIAL NOT NULL,
    "mensagem" TEXT NOT NULL,
    "dt_agendamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "id_cliente" INTEGER NOT NULL,
    "id_servico" INTEGER NOT NULL,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id_agendamento")
);

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_id_servico_fkey" FOREIGN KEY ("id_servico") REFERENCES "Servico"("id_servico") ON DELETE RESTRICT ON UPDATE CASCADE;
