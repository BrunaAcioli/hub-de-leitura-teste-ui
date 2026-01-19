///<reference types="cypress"/>
import { faker } from '@faker-js/faker';
import cadastroPage from '../support/pages/cadastro-page';

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {

    beforeEach(() => {
        cadastroPage.visitarPaginaCadastro()
    });

    it('Deve fazer cadastro com sucesso, usando função JS', () => {
        let email = `teste@${Date.now()}teste.com`
        cy.get('#name').type('Bruna Acioli')
        cy.get('#email').type(email)
        cy.get('#phone').type('11923456789')
        cy.get('#password').type('Teste@1234')
        cy.get('#confirm-password').type('Teste@1234')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should('include', 'dashboard')

    });

    it('Deve fazer cadastro com sucesso,usando Faker', () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type('11923456789')
        cy.get('#password').type('Teste@1234')
        cy.get('#confirm-password').type('Teste@1234')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should('include', 'dashboard')
        cy.get('#home').should('contain', nome)
    });

    it('Deve preencher cadastro com sucesso - Usando comando customizado', () => {
        let email = `teste@${Date.now()}teste.com`
        let nome = faker.person.fullName({ sex: 'female' })
        cy.preencherCadastro(
            nome,
            email,
            '11923456789',
            'Trem180719',
            'Trem180719'
        )
        cy.url().should('include', 'dashboard')
    });

    it('Deve fazer cadastro com sucesso - Usando Page Objects', () => {
        let email = `teste@${Date.now()}teste.com`
        cadastroPage.preencherCadastro('Bruna Acioli', email, '11923456789', 'teste123', 'teste123')
        cy.url().should('include', 'dashboard')

    });

    it.only('Deve validar mensagem ao tentar cadastrar sem preencher nome', () => {
        cadastroPage.preencherCadastro('', 'bruma@teste.com', '11958657234', '1234', '123')
        cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres')
    });


    });




