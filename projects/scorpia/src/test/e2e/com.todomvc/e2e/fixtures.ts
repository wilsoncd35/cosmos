import AxeBuilder from '@axe-core/playwright'
import { test as base, type Locator, type TestInfo } from '@playwright/test'

import { HomePage } from '../pom/homePage.js'

type Fixtures = {
  attachScreenshot: (
    name: string,
    locator: Locator,
    testInfo: TestInfo,
  ) => Promise<void>

  homePage: HomePage
  makeAxeBuilder: () => AxeBuilder
}

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },

  /** Attach a screenshot of an element to the test report. */
  /* eslint-disable-next-line no-empty-pattern */
  attachScreenshot: async ({}, use) => {
    await use(async (name, locator, testInfo) => {
      const screenshotBuffer = await locator.screenshot()
      await testInfo.attach(name, {
        body: screenshotBuffer,
        contentType: 'image/png',
      })
    })
  },

  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page }).withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
      ])

    await use(makeAxeBuilder)
  },
})

export { expect } from '@playwright/test'
