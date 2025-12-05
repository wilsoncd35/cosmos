import { expect, test } from './fixtures.js'

test.describe('Todos should function.', () => {
  test.describe('Given the home page', () => {
    test.beforeEach(async ({ homePage }) => {
      await homePage.goto()
      await homePage.page.waitForLoadState('domcontentloaded')
    })

    test('then I should see the todos page.', async ({ homePage }) => {
      await expect(homePage.heading).toBeVisible()
      await expect(homePage.input).toBeVisible()
      await expect(homePage.input).toBeEnabled()
    })

    test.describe('when I add a todo item', () => {
      test.beforeEach(async ({ homePage }) => {
        // Not your urual input, cannot use fill().
        await homePage.input.click()
        await homePage.input.pressSequentially('Test todo 01.', { delay: 250 })
        await homePage.input.press('Enter')
      })

      test('then the todo item should be added to the list.', async ({ homePage }) => {
        await expect(homePage.todoItems).toHaveCount(1)
      })

      test.describe('and I add another todo item', () => {
        test.beforeEach(async ({ homePage }) => {
          await homePage.input.click()
          await homePage.input.pressSequentially('Test todo 02.', {
            delay: 250,
          })
          await homePage.input.press('Enter')
        })

        test('then both todo items should be added to the list.', async ({ homePage }) => {
          await expect(homePage.todoItems).toHaveCount(2)
        })

        test.describe('and I complete the first todo item', () => {
          test.beforeEach(async ({ homePage }) => {
            const firstTodoItemToggle = homePage.todoItems.nth(0).getByTestId('todo-item-toggle')
            await firstTodoItemToggle.check()
          })

          test('then the first todo item should be marked as completed.', async ({ homePage }) => {
            const firstTodoItem = homePage.todoItems.nth(0)
            await expect(firstTodoItem).toHaveClass(/completed/)
          })
        })
      })
    })
  })
})
