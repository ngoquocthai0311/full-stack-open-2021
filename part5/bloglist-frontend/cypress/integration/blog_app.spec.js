describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3000/api/testing/reset')
        cy.visit('http://localhost:3000/')
    })
    it('Login form is shown', () => {
        cy.contains('Login to application')
        cy.contains('Log in')
    })
})