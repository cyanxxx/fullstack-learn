describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test1',
      username: 'test1',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('login').click()
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('test1')
      cy.get('input:last').type('sekret')
      cy.get('#login-button').click()
      cy.contains('test1 logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong credentials')
      cy.get('html').should('not.contain', 'test1 logged in')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test1', password: 'sekret' }).then(_ => {
        cy.createBlog({ title: 'a note created by cypress', author: 'ccc', url: '123' })
        cy.createBlog({ title: 'a note created by most likes', author: 'ccc', url: '123' })
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('www')
      cy.get('#url').type('www')
      cy.contains('add').click()

      cy.contains('a note created by cypress')
    })
    it('A blog can be updated', function() {
      cy.contains('a note created by cypress').parent().find('button').click()
      cy.contains('a note created by cypress').parent().parent().as('theblog')
      cy.get('@theblog').get('.like').click()
      cy.contains('a note created by cypress').parent().parent().should('contain', '1')
    })
    it('A blog can be delete', function() {
      cy.contains('a note created by cypress').parent().find('button').click()
      cy.contains('a note created by cypress').parent().parent().as('theblog')
      cy.get('@theblog').get('.remove').click()
      cy.get('html').should('not.contain', 'a note created by cypress')
    })
    it('most like show', function() {
      cy.contains('a note created by most likes').parent().find('button').click()
      cy.contains('a note created by most likes').parent().parent().as('theblog')
      cy.get('@theblog').get('.like').click().then(_ => {
        //  TODO: should fix this
        cy.wait(1000)
        cy.get('.blog').first().contains('a note created by most likes')
      })
    })
  })
})