import { expect } from 'chai'

if (typeof global.expect === 'undefined') {
  global.expect = expect
}

export const mochaHooks = {
  beforeAll: async function () {
    // Nothing to do here at this time.
    /* eslint-disable-next-line @typescript-eslint/no-unused-expressions */
    true
  },

  afterAll: async function () {
    // Nothing to do here at this time.
    /* eslint-disable-next-line @typescript-eslint/no-unused-expressions */
    true
  },

  beforeEach: async function () {
    // Nothing to do here at this time.
    /* eslint-disable-next-line @typescript-eslint/no-unused-expressions */
    true
  },

  afterEach: async function () {
    // Nothing to do here at this time.
    /* eslint-disable-next-line @typescript-eslint/no-unused-expressions */
    true
  },
}
