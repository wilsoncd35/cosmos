class HomePage {
  get heading() {
    return cy.get('h1').should('have.text', 'todos')
  }

  get input() {
    return cy.get('[data-testid="text-input"]')
  }

  get todoList() {
    return cy.get('[data-testid="todo-list"]')
  }

  get todoListItems() {
    return this.todoList.find('[data-testid="todo-item"]')
  }

  // todoItemAt(index) {
  //   return this.todoListItems.eq(index)
  // }
  // get todoItems() {
  //   return cy.get('[data-testid="todo-item"]')
  // }
}

export { HomePage as default, HomePage }
