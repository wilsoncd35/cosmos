import { HomePage } from '../../pom/com.todomvc/homePage.js'

describe('Given the Todo MVC page', function () {
  beforeEach(function () {
    this.homePage = new HomePage()
    cy.visit('/')
  })

  it('then I should see the page.', function () {
    expect(this.homePage.heading).to.exist
    expect(this.homePage.input).to.exist
  })

  describe('when I enter a todo', function () {
    beforeEach(function () {
      this.homePage.input.type('Test todo item 01.{enter}')
    })

    it('then the todo should be added to the list.', function () {
      this.homePage.todoListItems.should('have.length', 1)
      this.homePage.todoListItems
        .first()
        .should('have.text', 'Test todo item 01.')
    })

    describe('and I enter a second todo item', function () {
      beforeEach(function () {
        this.homePage.input.type('Test todo item 02.{enter}')
      })

      it('then the second todo should be added to the list.', function () {
        this.homePage.todoListItems.should('have.length', 2)
        this.homePage.todoListItems
          .last()
          .should('have.text', 'Test todo item 02.')
      })

      describe('and I complete the first todo item', function () {
        beforeEach(function () {
          this.homePage.todoListItems
            .first()
            .find('[data-testid="todo-item-toggle"]')
            .click()
        })

        it('then the first todo item should be marked as completed.', function () {
          this.homePage.todoListItems.first().should('have.class', 'completed')
        })
      })
    })
  })
})
