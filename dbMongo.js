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
        console.log(id);
        data = await conn.db("Users").collection("User").findOne({_id: new ObjectId(id)});
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

console.log(await createUser({nome: "Luiza", idade: 19, email: "luiza@gmail.com"}));