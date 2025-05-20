const { Router } = require('express');
const AdoptionModel = require('../dao/models/adoption.model');
const UserModel = require('../dao/models/user.model');
const PetModel = require('../dao/models/pet.model');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Adoption
 *   description: Endpoints para gestionar adopciones
 */

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoption]
 *     responses:
 *       200:
 *         description: Lista de adopciones
 */
router.get('/', async (req, res) => {
  try {
    const adoptions = await AdoptionModel.find().populate('user').populate('pet');
    res.json({ status: 'success', payload: adoptions });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Error al obtener adopciones' });
  }
});

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     summary: Crear una nueva adopción
 *     tags: [Adoption]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - petId
 *             properties:
 *               userId:
 *                 type: string
 *               petId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Adopción creada exitosamente
 */
router.post('/', async (req, res) => {
  try {
    const { userId, petId } = req.body;
    if (!userId || !petId) return res.status(400).json({ status: 'error', message: 'Datos incompletos' });

    const adoption = await AdoptionModel.create({ user: userId, pet: petId });
    res.json({ status: 'success', payload: adoption });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Error al crear adopción' });
  }
});

/**
 * @swagger
 * /api/adoptions/{id}:
 *   delete:
 *     summary: Eliminar una adopción por ID
 *     tags: [Adoption]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopción eliminada exitosamente
 *       404:
 *         description: Adopción no encontrada
 */
router.delete('/:id', async (req, res) => {
  try {
    const result = await AdoptionModel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ status: 'error', message: 'Adopción no encontrada' });
    res.json({ status: 'success', message: 'Adopción eliminada' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Error al eliminar adopción' });
  }
});

module.exports = router;
