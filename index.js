import express from 'express';
import conexao from './db.js';

const app = express();
app.use(express.json());

app.delete('/usuarios/:id', async (req, res) => {
    const conec = await conexao();
    const user = await conec.query('DELETE FROM user WHERE id = ?;', [req.params.id]);

    res.status(204).send();
})

app.put('/usuarios/:id', async (req, res) => {
    const conec = await conexao();
    const user = req.body;
    await conec.query(
        'UPDATE user SET nome = ?, idade = ?, email = ? WHERE id = ?;',
        [user.nome, user.idade, user.email, req.params.id]
    );

    res.status(204).send();
})

app.post('/usuarios', async (req, res) => {
    const conec = await conexao();
    const user = req.body;
    await conec.query(
        'INSERT INTO user(nome, idade, email) VALUES(?, ?, ?);',
        [user.nome, user.idade, user.email]
    );

    res.status(201).send(`${user.nome} foi adicionado ao BD com sucesso!`);
});

app.get('/usuarios', async (req, res) => {
    const conec = await conexao();
    const usuarios = await conec.query('SELECT * FROM user;');
    res.status(200).send(usuarios[0]);
});

app.listen(3000);