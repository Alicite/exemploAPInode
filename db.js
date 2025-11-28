import mysql from 'mysql2/promise';

const conexao = async () => {
    if (global.conexao && global.conexao.state !== 'disconnected') {
        return global.conexao;
    } else {
        const db = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '123456',
            database: 'users'
        });
        global.conexao = db;
        return db;
    }
}

export default conexao;