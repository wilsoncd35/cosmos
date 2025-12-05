import { type Page } from '@playwright/test'

export class BasePage {
  page: Page
  url = ''

  constructor(page: Page) {
    this.page = page
  }

  async close() {
    await this.page.close()
  }

  async goto() {
    await this.page.goto(this.url)
  }
}
