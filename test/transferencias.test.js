import { expect } from 'chai'
import request from 'supertest'
import dotenv from 'dotenv'
dotenv.config()


describe('Testes de transferência', () => {
    context('POST /transferencias', () => {
        it('Deve transferir R$10,00 ou mais com sucesso', async () => {
            const respostaLogin = await request(process.env.URL)
                .post('/login')
                .send({ username: process.env.USER_CONTA, senha: process.env.SENHA_CONTA})
                .set('Content-Type', 'application/json')
                expect(respostaLogin.status).eq(200)
                const token = respostaLogin.body.token

            const respostaTransferencia = await request(process.env.URL)
                .post('/transferencias')
                .set('Content-Type','application/json')
                .set('Authorization',`Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 1000,
                    token: '' 
                    }
                )
                expect(respostaTransferencia.status).eq(201)
            })

        it('Não deve transferir valores menores de R$10,00', async () => {
            const respostaLogin = await request(process.env.URL)
                .post('/login')
                .send({ username: process.env.USER_CONTA, senha: process.env.SENHA_CONTA})
                .set('Content-Type', 'application/json')
            expect(respostaLogin.status).eq(200)
            expect(respostaLogin.body.token).to.be.a('string')
            let token = respostaLogin.body.token
            const respostaTransferencia = await request(process.env.URL)
                .post('/transferencias')
                .set('Content-Type','application/json')
                .set('Authorization',`Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 7,
                    token: '' 
                    }
                )
            expect(respostaTransferencia.status).eq(422)
            expect(respostaTransferencia.body.error).to.eq('O valor da transferência deve ser maior ou igual a R$10,00.')
        })
    })
})