import express from 'express';
import dbMysql from './dbMysql.js';
import dbMongo from './dbMongo.js';

const app = express();
app.use(express.json());

app.delete('/usuarios/:id', async (req, res) => {
    const dataMySQL = await dbMysql.delUser(req.params.id);
    const dataMongo = await dbMongo.delUser(req.params.id);

    res.status(200).send(`MySQL:\n${dataMySQL}\nMongoDB:\n${dataMongo}`);
})

app.put('/usuarios/:id', async (req, res) => {
    const dataMySQL = await dbMysql.attUser(req.body, req.params.id);
    const dataMongo = await dbMongo.attUser(req.body, req.params.id);

    res.status(200).send(`MySQL:\n${dataMySQL}\nMongoDB:\n${dataMongo}`);
})

app.post('/usuarios', async (req, res) => {
    const dataMySQL = await dbMysql.createUser(req.body);
    const dataMongo = await dbMongo.createUser(req.body);

    res.status(201).send(`MySQL:\n${dataMySQL}\nMongoDB:\n${dataMongo}`);
});

app.get('/usuarios', async (req, res) => {
    const usuariosMySQL = await dbMysql.getUser();
    const usuariosMongo = await dbMongo.getUser();

    res.status(200).send(`MySQL:\n${usuariosMySQL}\nMongoDB:\n${usuariosMongo}`);
});

app.get('/usuarios/:id', async (req, res) => {
    const usuarioMySQL = await dbMysql.getUser(req.params.id);
    const usuarioMongo = await dbMongo.getUser(req.params.id);

    res.status(200).send(`MySQL:\n${usuarioMySQL}\nMongoDB:\n${usuarioMongo}`);
});

app.listen(3000);