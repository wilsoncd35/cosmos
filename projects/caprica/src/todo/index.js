/** A simple todo manager. For demonstrable tests. */
class Todo {
  constructor() {
    /** All the todos. */
    this.todos = []
  }

  /** Create a new todo item. */
  create(item) {
    this.todos.push(item)
  }

  /** Read a todo item(s). */
  read(id) {
    if (id) {
      return this.todos.find((item) => item.id === id)
    }

    return this.todos
  }

  /** Update a todo item by ID. */
  update(id, updatedItem) {
    const index = this.todos.findIndex((item) => item.id === id)

    if (index !== -1) {
      this.todos[index] = { ...this.todos[index], ...updatedItem }
    }

    return this.todos[index]
  }

  /** Delete a todo item by ID. */
  delete(id) {
    const index = this.todos.findIndex((item) => item.id === id)

    if (index !== -1) {
      this.todos.splice(index, 1)
      return true
    }

    return false
  }
}

export { Todo as default, Todo }
