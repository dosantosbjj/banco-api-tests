import request from 'supertest'
import { expect } from 'chai'

export default async function gerarToken(username, senha){
    const respostaLogin = await request(process.env.URL)
        .post('/login')
        .send({ username: username, senha: senha})
        .set('Content-Type', 'application/json')
    expect(respostaLogin.status).eq(200)
    expect(respostaLogin.body.token).to.be.a('string')
    const token = respostaLogin.body.token
    return token
}