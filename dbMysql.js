import mysql from 'mysql2/promise';

const conexao = async () => {
    if (global.conexaoMySQL && global.conexaoMySQL.state !== 'disconnected') {
        return global.conexaoMySQL;
    } else {
        const db = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '123456',
            database: 'users'
        });
        global.conexaoMySQL = db;
        return db;
    }
}

const getUser = async (id=undefined) => {
    if (!id) {
        const conec = await conexao();
        const usuarios = await conec.query('SELECT * FROM user;');

        return usuarios[0];
    } else {
        const conec = await conexao();
        const usuarios = await conec.query('SELECT * FROM user WHERE id = ?;', [id]);
        
        return usuarios[0];
    }
}

const createUser = async (user) => {
    try {
        const conec = await conexao();
        await conec.query(
            'INSERT INTO user(nome, idade, email) VALUES(?, ?, ?);',
            [user.nome, user.idade, user.email]
        );
    
        return `${user.nome} foi adicionado ao MySQL com sucesso!`;
    } catch (e) {
        return `Não foi possível adicionar o usuário ${user.nome} ao MySQL! Erro: ${e.message}`;
    }
}

const attUser = async (user, id) => {
    const conec = await conexao();
    await conec.query(
        'UPDATE user SET nome = ?, idade = ?, email = ? WHERE id = ?;',
        [user.nome, user.idade, user.email, id]
    );

    return `${user.nome} foi alterado com sucesso no MySQL!`;
}

const delUser = async (id) => {
    const conec = await conexao();
    const user = await conec.query('DELETE FROM user WHERE id = ?;', [id]);

    return `Usuário(id: ${id}) deletado com sucesso do MySQL!`;
}

const dbMysql = { getUser, createUser, attUser, delUser };
export default dbMysql;