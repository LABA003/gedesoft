/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Usuario` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreUsu` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `imagen` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` ENUM('ADMIN', 'MESERO', 'COCINERO', 'CAJERO') NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `idCategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` ENUM('ENTRADA', 'PLATO_FUERTE', 'BEBIDA', 'POSTRE', 'OTRO') NOT NULL,

    PRIMARY KEY (`idCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Platillo` (
    `idPlatillo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombrePlatillo` VARCHAR(191) NOT NULL,
    `ingredientes` VARCHAR(191) NULL,
    `imagen` VARCHAR(191) NULL,
    `precio` DOUBLE NOT NULL,
    `idCategoria` INTEGER NULL,

    PRIMARY KEY (`idPlatillo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `idPedido` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NULL,
    `numMesa` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idPedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetallePedido` (
    `idPedido` INTEGER NOT NULL,
    `idPlatillo` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`idPedido`, `idPlatillo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `idTicket` INTEGER NOT NULL AUTO_INCREMENT,
    `idPedido` INTEGER NULL,
    `idUsuario` INTEGER NULL,
    `metodoPago` VARCHAR(191) NULL,
    `total` DOUBLE NULL,
    `status` ENUM('PENDIENTE', 'PAGADO', 'CANCELADO') NOT NULL DEFAULT 'PENDIENTE',

    UNIQUE INDEX `Ticket_idPedido_key`(`idPedido`),
    PRIMARY KEY (`idTicket`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Platillo` ADD CONSTRAINT `Platillo_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `Categoria`(`idCategoria`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetallePedido` ADD CONSTRAINT `DetallePedido_idPedido_fkey` FOREIGN KEY (`idPedido`) REFERENCES `Pedido`(`idPedido`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetallePedido` ADD CONSTRAINT `DetallePedido_idPlatillo_fkey` FOREIGN KEY (`idPlatillo`) REFERENCES `Platillo`(`idPlatillo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_idPedido_fkey` FOREIGN KEY (`idPedido`) REFERENCES `Pedido`(`idPedido`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE SET NULL ON UPDATE CASCADE;
