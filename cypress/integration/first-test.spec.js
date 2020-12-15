context('first example', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should contain text', () => {
        cy.get('header.App-header')
            .should('contain.text', 'Edit src/App.js')
    })

})
