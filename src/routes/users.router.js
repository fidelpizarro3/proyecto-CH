const { Router } = require('express');
const UserModel = require('../dao/models/user.model');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gestionar usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   full_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   age:
 *                     type: integer
 */

router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json({ status: 'success', payload: users });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Error al obtener usuarios' });
  }
});

module.exports = router;
