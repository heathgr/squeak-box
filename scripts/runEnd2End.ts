#!/usr/bin/env ts-node
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import concurrently from 'concurrently'

concurrently(
  [
    {
      command: 'cypress run',
      name: 'Cypress',
      prefixColor: 'green',
    },
    {
      command: './firestore_manager/index.ts',
      name: 'Firestore Manager',
      prefixColor: 'blue',
    },
  ], {
    successCondition: 'first',
    killOthers: ['success', 'failure'],
  },
).then(
  () => {
    console.log('Test run successful :)')
  },
  () => {
    console.log('Test run failed :(')
  },
)
