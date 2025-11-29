import express from 'express';
import dbMysql from './dbMysql.js';

const app = express();
app.use(express.json());

app.delete('/usuarios/:id', async (req, res) => {
    const data = await dbMysql.delUser(req.params.id);

    res.status(200).send(data);
})

app.put('/usuarios/:id', async (req, res) => {
    const data = await dbMysql.attUser(req.body, req.params.id)

    res.status(200).send(data);
})

app.post('/usuarios', async (req, res) => {
    const data = await dbMysql.createUser(req.body)

    res.status(201).send(data);
});

app.get('/usuarios', async (req, res) => {
    const usuarios = await dbMysql.getUser();
    res.status(200).send(usuarios);
});

app.get('/usuarios/:id', async (req, res) => {
    const usuarios = await dbMysql.getUser(req.params.id);
    res.status(200).send(usuarios);
});

app.listen(3000);