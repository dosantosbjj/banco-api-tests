import gerarToken from '../helpers/auth.js'
import { expect } from 'chai'
import request from 'supertest'
import dotenv from 'dotenv'
dotenv.config()
import postTransferencias from '../fixtures/post-transferencias.json' assert { type : 'json' }

describe('Testes de transferência', () => {
    let token 
    context('POST /transferencias', () => {
        beforeEach(async () =>{
            token = await gerarToken('lucas.santos','123456')
        })

        it('Deve transferir R$10,00 ou mais com sucesso', async () => {
            const bodyTransferencias = { ...postTransferencias }
            const respostaTransferencia = await request(process.env.URL)
                .post('/transferencias')
                .set('Content-Type','application/json')
                .set('Authorization',`Bearer ${token}`)
                .send(bodyTransferencias)
                expect(respostaTransferencia.status).eq(201)
            })

        it('Não deve transferir valores menores de R$10,00', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 7
            const respostaTransferencia = await request(process.env.URL)
                .post('/transferencias')
                .set('Content-Type','application/json')
                .set('Authorization',`Bearer ${token}`)
                .send(bodyTransferencias)
            expect(respostaTransferencia.status).eq(422)
            expect(respostaTransferencia.body.error).to.eq('O valor da transferência deve ser maior ou igual a R$10,00.')
        })
    })
})