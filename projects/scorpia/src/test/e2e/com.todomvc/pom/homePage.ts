import { BasePage } from './basePage.js'

export class HomePage extends BasePage {
  url = ''

  get heading() {
    return this.page.getByRole('heading', {
      name: 'todos',
      level: 1,
      exact: true,
    })
  }

  get input() {
    return this.page.getByTestId('text-input')
  }

  get todoItems() {
    return this.page.getByTestId('todo-item')
  }
}
