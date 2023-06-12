import express, { Request, Response } from "express"
import cors from "cors"
import { db } from "./database/knex"
import { TUser } from "./types"

const app = express()
app.use(cors())
app.use(express.json())


app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
})


app.get("/users", async (req: Request, res: Response) => {
    try {

        const result = await db("usuarios")

        res.status(200).send(result)

    }
    catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})


app.post("/addUsers", async (req: Request, res: Response) => {

    try {

        const { id, nome, email, senha, tipo_usuario} = req.body as TUser

        
        const novoUsuario: TUser = {
            id: id,
            nome: nome,
            email: email,
            senha: senha,
            tipo_usuario: tipo_usuario
        }

        console.log(novoUsuario);
        
        await db("usuarios").insert(novoUsuario)
        res.status(201).send("Cadastro realizado com sucesso")
        }catch (error: any) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            }
        }
})

app.put("/users/:id", async (req: Request, res: Response) => {
    try {
        const idParams = req.params.id 

        const { id, nome, email, senha, tipo_usuario} = req.body as TUser

        const [usuariosExistente] = await db("usuarios")

       const editarUsuario = {
          id: id || usuariosExistente.id,
          nome: nome || usuariosExistente.nome,
          email: email || usuariosExistente.email,
          senha: senha || usuariosExistente.senha,
          tipo_usuario: tipo_usuario || usuariosExistente.tipo_usuario
       }

       await db("usuarios").update(editarUsuario).where({id: idParams})
       res.status(201).send("Cadastro realizado com sucesso")

    }catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


app.delete("/usuarios/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id


        await db("usuarios").del().where({ id: id })
        res.status(200).send("Usuario deletado com sucesso")

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})