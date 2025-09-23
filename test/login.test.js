import { expect } from 'chai'
import request from 'supertest'
describe('Login', () => {
    context('POST /login', () => {
        it('Deve retornar 200 com um token em string quando usar credenciais válidas', async () => {
            const response = await request('http://localhost:3000')
                .post('/login')
                .send({ username: 'lucas.santos', senha: '123456'})
                .set('Content-Type', 'application/json')
            expect(response.status).eq(200)
            expect(response.body.token).to.be.a('string')
            request
        })
    })
})