import { Todo } from '../../../src/todo/index.js'

describe('Todo', function () {
  beforeEach(function () {
    this.todoManager = new Todo()
  })

  describe('#constructor', function () {
    it('then it should initialize with an empty todo list.', function () {
      expect(this.todoManager.todos.length).to.equal(0)
    })
  })

  describe('#create', function () {
    describe('a todo item', function () {
      beforeEach(function () {
        this.todoItem01 = { id: 1, title: 'Test Todo' }
        this.todoManager.create(this.todoItem01)
      })

      it('then a single todo item should be in the list.', function () {
        expect(this.todoManager.todos.length).to.equal(1)
        expect(this.todoManager.todos[0]).to.deep.equal(this.todoItem01)
      })

      describe('a second todo item', function () {
        beforeEach(function () {
          this.todoItem02 = { id: 2, title: 'Second Test Todo' }
          this.todoManager.create(this.todoItem02)
        })

        it('then two todo items should be in the list.', function () {
          expect(this.todoManager.todos.length).to.equal(2)
          expect(this.todoManager.todos[1]).to.deep.equal(this.todoItem02)
        })

        describe('#read', function () {
          it('then reading all items should return both items.', function () {
            const allItems = this.todoManager.read()
            expect(allItems.length).to.equal(2)
          })

          it('then reading by ID should return the correct item.', function () {
            const item = this.todoManager.read(1)
            expect(item).to.deep.equal(this.todoItem01)
          })
        })

        describe('#delete', function () {
          it('then deleting an item by ID should remove it from the list.', function () {
            const result = this.todoManager.delete(1)
            expect(result).to.equal(true)
            expect(this.todoManager.todos.length).to.equal(1)
            expect(this.todoManager.todos[0]).to.deep.equal(this.todoItem02)
          })
        })

        describe('#update', function () {
          it('then updating an item by ID should modify it in the list.', function () {
            const updatedItem = { id: 1, title: 'Updated Test Todo' }
            const result = this.todoManager.update(1, updatedItem)
            expect(result).to.deep.equal(updatedItem)
            expect(this.todoManager.todos[0]).to.deep.equal(updatedItem)
          })
        })
      })
    })
  })

  describe('#delete', function () {
    it('then attempting to delete a non-existent item should return false.', function () {
      const result = this.todoManager.delete(999)
      expect(result).to.equal(false)
    })
  })
})
