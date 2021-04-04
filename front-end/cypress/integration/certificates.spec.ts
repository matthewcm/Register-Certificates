describe ('Certificate Collection Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Create new Test Certificate 1', () => {
        cy.get('[data-cy=title]')
            .type('Test Title')

        cy.get('[data-cy=photo]')
            .attachFile("unicorn.png")

        cy.get('[data-cy=form')
            .find('#artist-selection')
            .find('input')
            .type("Test D", {force: true})
            .type("{enter}")

        cy.get('[data-cy=year]')
            .type('2020')

        cy.get('[data-cy=submit]')
            .click()
    })
    it('Create new Test Certificate 2', () => {
        cy.get('[data-cy=title]')
            .type('Test B')

        cy.get('[data-cy=photo]')
            .attachFile("unicorn.png")

        cy.get('[data-cy=form')
            .find('#artist-selection')
            .find('input')
            .type("Test C", {force: true})
            .type("{enter}")

        cy.get('[data-cy=year]')
            .type('2010')

        cy.get('[data-cy=submit]')
            .click()
    })
    it('Create new Test Certificate 3', () => {
        cy.get('[data-cy=title]')
            .type('Test A')

        cy.get('[data-cy=photo]')
            .attachFile("unicorn.png")

        cy.get('[data-cy=form')
            .find('#artist-selection')
            .find('input')
            .type("Test A", {force: true})
            .type("{enter}")

        cy.get('[data-cy=year]')
            .type('2020')

        cy.get('[data-cy=submit]')
            .click()
    })

    it('Check Pagination page changes', () => {
        cy.get('[data-cy=pagination]')
            .contains(2)
            .click()
    })

    it('Test Delete', () => {
        cy.get('[data-cy=collection]')
            .find('[data-cy=certificate]')
            .first()
            .within(() => {
                cy.get('[data-cy=delete]')
                    .click()
            })
    })

    it('Test Edit', () => {
        cy.get('[data-cy=collection]')
            .find('[data-cy=certificate]')
            .first()
            .within(() => {
                cy.get('[data-cy=edit]')
                        .click()
            })

        cy.get('[data-cy=editForm]')
            .within(() => {
                cy.get('[data-cy=title]')
                    .clear()
                    .type('Modified')

                cy.get('[data-cy=photo]')
                    .attachFile("unicorn.png")

                cy.get('[data-cy=form]')
                    .find('#artist-selection')
                    .find('input')
                    .clear({force:true})
                    .type("Test Modified", {force: true})
                    .type("{enter}")

                cy.get('[data-cy=year]')
                    .clear()
                    .type('2010')

                cy.get('[data-cy=submit]')
                    .click()
            })

        cy.contains('Modified')

    })

    it('Sorts by artist surname', () => {
        cy.get('[data-cy=pagination-bar]')
            .first()
            .find('.dropdown')
            .click()

        cy.get('.dropdown-menu')
            .contains("Sort by artist's surname")
            .click()

        cy.get('[data-cy=pagination-bar')
            .first()
            .find('.dropdown')
            .should("contain", "Sort by artist's surname")

    })

    it('Sorts by unsorted', () => {
        cy.get('[data-cy=pagination-bar]')
            .first()
            .find('.dropdown')
            .click()


        cy.get('.dropdown-menu')
            .contains('Unsorted')
            .click()

        cy.get('[data-cy=pagination-bar')
            .first()
            .find('.dropdown')
            .should("contain", "Unsorted")
    })
})
