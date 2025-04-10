const Item = require('../models/item');

// GET /items - obtener todos los documentos
exports.getAllItems = async (req, res) => {
    try {
      const items = await Item.find({});
      console.log(items);  // Verifica que los datos estén siendo obtenidos
      res.status(200).json(items);
    } catch (err) {
      console.error(err);  // También logea el error completo
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  };  

// GET /items/search - buscar por query
exports.searchItems = async (req, res) => {
  try {
    const query = req.query;
    const items = await Item.find(query);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar los usuarios' });
  }
};

// PUT /items - crear o actualizar
exports.upsertItem = async (req, res) => {
  try {
    const { email, ...updateData } = req.body;
    if (!email) return res.status(400).json({ error: 'Email es requerido como identificador' });

    const item = await Item.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true, upsert: true }
    );

    const status = item.wasNew ? 201 : 200;
    res.status(status).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar/crear el usuario' });
  }
};

// DELETE /items - eliminar documentos por condición
exports.deleteItems = async (req, res) => {
  try {
    const query = req.body;
    const result = await Item.deleteMany(query);
    if (result.deletedCount === 0) return res.status(204).send();
    res.status(200).json({ deleted: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar los usuarios' });
  }
};
