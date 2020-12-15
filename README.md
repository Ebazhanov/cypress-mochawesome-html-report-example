HTML and JSON report with Mochawesome library
-
This is the simple example for integrating Cypress with Mochawesome library to generate HTML and JSON report.

[![mocha](https://img.shields.io/npm/v/mochawesome.svg?style=flat-square)](http://www.npmjs.com/package/mochawesome)
[![npm version](https://badge.fury.io/js/cypress.svg)](https://badge.fury.io/js/cypress)

------------------------------------------
## How to setting up in your project 

 Install
- `$ yarn add mochawesome --dev`
- `$ yarn add mochawesome-merge@2.1.0 --dev`
- `$ yarn add mochawesome-report-generator --dev`

 Add the following code inside your [cypress.json](https://github.com/Ebazhanov/cypress-mochawesome-example/blob/main/cypress.json#L5-L11)

```json
{
  "reporter": "mochawesome",
  "reporterOptions": {
    "reportDir": "cypress/results",
    "overwrite": false,
    "html": false,
    "json": true
  } 
}
```

## How to generate report Locally
- `$ yarn start & cypress run --headless --browser chrome`
- `$ npx mochawesome-merge --reportDir cypress/results > cypress/merged-report.json`
- `$ npx marge cypress/merged-report.json -o cypress/mochawesome-html-report`

Find your HTML report in the `.../cypress/mochawesome-html-report/merged-report.html`

## How to generate report in Circleci

Add this configuration into your [config.yml](https://github.com/Ebazhanov/cypress-mochawesome-example/blob/main/.circleci/config.yml#L69-L69) file 
```yaml
version: 2.1

orbs:
  cypress: cypress-io/cypress@1.26.0

workflows:
  build:
    jobs:
      - cypress/run:
          install-command: yarn install --frozen-lockfile
          start: yarn start
          wait-on: 'http://localhost:3000'
          post-steps:
            - run:
                name: Create merged-report Directory
                command: mkdir cypress/merged-report/
            - run:
                name: Merge mochawesome jsons in one file
                when: always
                command: npx mochawesome-merge --reportDir cypress/results > cypress/merged-report/merged-report.json
            - run:
                name: Generate mochawesome html report
                when: always
                command: npx marge cypress/merged-report/merged-report.json -o cypress/mochawesome-html-report
            - store_artifacts:
                name: Uploading mochawesome-merged-report.json
                path: cypress/merged-report
            - store_artifacts:
                name: Uploading mochawesome-html-report
                path: cypress/mochawesome-html-report

```

## Demo: [![CircleCI](https://circleci.com/gh/Ebazhanov/cypress-mochawesome-html-report-example.svg?style=svg)](https://circleci.com/gh/Ebazhanov/cypress-mochawesome-html-report-example)
<img src="https://monosnap.com/image/lAyFBFUXtn5FNsvmw4gEWfMytTC4ql"/>

## ToDos: 
- [ ] find the way to attach screenshots & video on failure


### P.S. if you want to try something else look at `Allure 2` report [here](https://github.com/Ebazhanov/cypress-allure2-report-example) 
