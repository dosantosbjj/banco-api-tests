import { expect } from 'chai'
import request from 'supertest'
import dotenv from 'dotenv'
dotenv.config()
import postLogin from '../fixtures/post-login.json' assert {type : 'json'}

describe('Login', () => {
    context('POST /login', () => {
        const loginBody = { ...postLogin}
        it('Deve retornar 200 com um token em string quando usar credenciais válidas', async () => {
            const response = await request(process.env.URL)
                .post('/login')
                .send(postLogin)
                .set('Content-Type', 'application/json')
            expect(response.status).eq(200)
            expect(response.body.token).to.be.a('string')
        })
    })
})