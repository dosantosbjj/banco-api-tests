import { expect } from 'chai'
import request from 'supertest'
import dotenv from 'dotenv'
dotenv.config()

describe('Login', () => {
    context('POST /login', () => {
        it('Deve retornar 200 com um token em string quando usar credenciais válidas', async () => {
            const response = await request(process.env.URL)
                .post('/login')
                .send({ username: process.env.USER_CONTA, senha: process.env.SENHA_CONTA})
                .set('Content-Type', 'application/json')
            expect(response.status).eq(200)
            expect(response.body.token).to.be.a('string')
        })
    })
})