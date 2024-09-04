describe('/livros POST', () => {

  before(() => {
    cy.dropCollection('books', { database: 'test', failSilently: 'true' }).then(result => {
      cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
  });
  })


  it('deve cadastrar um novo livro', () => {

    const livro = {
      "title": "O Senhor dos Anéis",
      "author": "J.R.R. Tolkien",
      "publisher": "HarperCollins",
      "year": 1954,
      "pages": 1216
    }

    cy.postLivro(livro)
    .then(response => {
      expect(response.status).to.eql (201)

      expect(response.body.title).to.eql(livro.title)
      expect(response.body.author).to.eql(livro.author)
      expect(response.body.publisher).to.eql(livro.publisher)
      expect(response.body.year).to.eql(livro.year)
      expect(response.body.pages).to.eql(livro.pages)
      expect(response.body._id).to.not.to.be.empty
    })
  })


  it('não deve cadastrar um livro com titulo duplicado', () => {

      const livro = {
        "title": "Harry Potter e a Pedra Filosofal",
        "author": "J.K Rowling",
        "publisher": "Rocco",
        "year": 1997,
        "pages": 223
      }

      cy.postLivro(livro)
        .then(response => {
          expect(response.status).to.eql(201)
        })

      cy.postLivro(livro)
        .then(response => {
          expect(response.status).to.eql(409)
          expect(response.body.erro).to.eql("o título do livro já foi cadastrado.")
        })
        
    })
})

