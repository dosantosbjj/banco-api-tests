import postTransferencias from '../fixtures/post-transferencias.json' assert { type : 'json' }
import gerarToken from '../helpers/auth.js'
import request from 'supertest'
import { expect } from 'chai'
import dotenv from 'dotenv'
dotenv.config()

describe('Testes de transferência', () => {
    let token 
    
    beforeEach(async () =>{
        token = await gerarToken('lucas.santos','123456')
    })

    context('POST /transferencias', () => {
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

    context('GET /transferencias', () => {
        it('Deve retornar os dados de uma transferência pelo id', async () => {
            const resposta = await request(process.env.URL)
                .get('/transferencias/11')
                .set('Authorization', `Bearer ${token}`)
            expect(resposta.status).eq(200)
            expect(resposta.body.id).eq(11)
            expect(resposta.body.id).to.be.a('number')
            expect(resposta.body.conta_origem_id).eq(1)
            expect(resposta.body.conta_destino_id).eq(2)
        })

        it('Deve retornar 10 transferências ao informar o limit=10', async () => {
            const resposta = await request(process.env.URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)
            expect(resposta.status).eq(200)
            expect(resposta.body.limit).eq(10)
            expect(resposta.body.page).eq(1)
            expect(resposta.body.transferencias).to.have.length(10)
        })
    })
})