const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Obtener todos los usuarios
router.get('/items', itemController.getAllItems);

// Buscar usuarios por query params
router.get('/items/search', itemController.searchItems);

// Crear o actualizar un usuario
router.put('/items', itemController.upsertItem);

// Eliminar usuarios por condición
router.delete('/items', itemController.deleteItems);

module.exports = router;
