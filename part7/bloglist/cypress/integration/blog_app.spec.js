describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3000/api/testing/reset')
        // create a user in the backend
        cy.request('POST', 'http://localhost:3000/api/users', {
            username: 'test',
            password: 'test',
            name: 'Tester Test'
        })
        cy.visit('http://localhost:3000/')
    })
    it('Login form is shown', () => {
        cy.contains('Login to application')
        cy.contains('Log in')
    })

    describe('Login', () => {
        it('succeeds with correct credentials',() => {
            cy.get('#username').type('test')
            cy.get('#password').type('test')
            cy.contains('Log in').click()
            cy.contains('Tester Test logged in')
        })
        it('fails with incorrect credentials', () => {
            cy.get('#username').type('test')
            cy.get('#password').type('wrong')
            cy.contains('Log in').click()
            cy.get('.error').should('contain', 'wrong username or password')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', () => {
        const title = 'Shot from the Street'
        const author = 'Lizzy Hadfield'
        const url = 'https://www.lizzyhadfield.com/'
        beforeEach(() => {
            cy.login({ username: 'test', password: 'test' })
            cy.createBlog({ title, author, url })
            cy.createBlog({ title: 'blog1', author: 'author1', url: 'url1' })
            cy.createBlog({ title: 'blog2', author: 'author2', url: 'url2' })
            cy.createBlog({ title: 'blog3', author: 'author3', url: 'url3' })
        })
        it('A blog can be created', () => {
            cy.contains('create new blog').click()
            cy.get('#title').type('title')
            cy.get('#author').type('author')
            cy.get('#url').type('url')
            cy.get('#button-create').click()
            cy.get('.short-blog').should('contain', 'title author')
            cy.get('.short-blog').should('contain', 'view')
        })
        it('A valid can be liked', () => {
            cy.contains(`${title} ${author}`).contains('view').click()
            cy.contains('hide')
            cy.contains('like').click()
            cy.get('.success').should('contain', `The blog ${title} by ${author} updated likes to 1`)
        })
        it('A valid blog can be deleted', () => {
            cy.contains(`${title} ${author}`).contains('view').click()
            cy.contains('remove').click()
            cy.get('.success').should('contain', 'delete blog successfully')
        })
        it('a valid blog can not be deleted if user did not create it', () => {
            cy.contains('log out').click()
            // create a user in the backend
            cy.request('POST', 'http://localhost:3000/api/users', {
                username: 'anothertest',
                password: 'anothertest',
                name: 'Anothertester Anothertester'
            })
            cy.visit('http://localhost:3000/')
            cy.login({ username: 'anothertest', password: 'anothertest' })

            cy.contains(`${title} ${author}`).contains('view').click()
            cy.contains('remove').click()
            cy.contains('Unauthorized action')
        })
        it.only('blogs are ordered when likes are updated', () => {
            cy.contains('blog1').parent().as('blog1')
            cy.contains('blog2').parent().as('blog2')
            cy.contains('blog3').parent().as('blog3')

            cy.get('@blog1').contains('view').click()
            cy.wait(1000)
            cy.get('@blog1').contains('like').click()
            cy.wait(1000)
            cy.get('@blog1').contains('like').click()
            cy.wait(1000)
            cy.get('@blog1').contains('like').click()
            cy.wait(1000)

            cy.get('@blog2').contains('view').click()
            cy.wait(1000)
            cy.get('@blog2').contains('like').click()
            cy.wait(1000)
            cy.get('@blog2').contains('like').click()
            cy.wait(1000)

            cy.get('@blog3').contains('view').click()
            cy.wait(1000)
            cy.get('@blog3').contains('like').click()
            cy.wait(1000)

            cy.get('.blog').then(blogs => {
                cy.wrap(blogs[0]).should('contain', '3')
                cy.wrap(blogs[1]).should('contain', '2')
                cy.wrap(blogs[2]).should('contain', '1')
            })
        })
    })
})