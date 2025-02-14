# cyrealworld

[Cypress.io real world web application](https://github.com/cypress-io/cypress-realworld-app). Mainly for test demonstration.

While we are using a Cypress.io project we can still use it for demonstrating test tools other than Cypress itself, e.g., playwright, selenium.

## Requirements

- Node.js 20.12.0 (see `.node_version` at the root of the app clone).

## Start

1. Ensure that Node.js 20.12.0 is on PATH.
1. yarn classic: `npm install -g yarn@latest`
1. `bin/start` will clone the app into `tmp` if it does not already exist, install dependencies, and start the app. The frontend is accessible at port 3000 and the backend at 3001.
