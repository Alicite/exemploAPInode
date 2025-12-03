import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri);

const conexao = async () => {
    if (global.conexaoMongo && global.conexaoMongo.state !== 'disconnected'){
        return global.conexaoMongo;
    }

    try {
        const db = await client.connect();
        global.conexaoMongo = db;
        return db;

    } catch (error) {
        console.error(error);
    }
}

const getUser = async (id=undefined) => {
    const conn = await conexao();
    let data = undefined;

    if (!id) {
        data = await conn.db("Users").collection("User").find({}).toArray();
    } else {
        data = await conn.db("Users").collection("User").findOne({_id_: new ObjectId(id)});
    }
    
    await conn.close();
    return data;
}

const createUser  = async (user) => {
    try {
        const conn = await conexao();
        await conn.db("Users").collection("User").insertOne(user);
        await conn.close();
    
        return `${user.nome} adicionado ao MongoDB com sucesso!` 
    } catch (error) {
        return `Não foi possível adicionar o usuário ${user.nome}. Erro: ${error.message}!`
    }
}

const attUser  = async (user, id) => {
    try {
        const conn = await conexao();
        await conn.db("Users").collection("User").replaceOne({ _id: new ObjectId(id)}, user);
        await conn.close();
    
        return `${user.nome} atualizado no MongoDB com sucesso!` 
    } catch (error) {
        return `Não foi possível atualizar o usuário ${user.nome}. Erro: ${error.message}!`
    }
}

const delUser  = async (id) => {
    try {
        const conn = await conexao();
        await conn.db("Users").collection("User").deleteOne({ _id: new ObjectId(id)});
        await conn.close();
    
        return `Usuário(id: ${id}) deletado do MongoDB com sucesso!` 
    } catch (error) {
        return `Não foi possível deletar o usuário. Id do usuário: ${id}. Erro: ${error.message}!`
    }
}

const dbMongo = { getUser, createUser, attUser, delUser };
export default dbMongo;