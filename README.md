# Swivl Take Home

Thank you for taking a look at my take home assignment!

## Setup and Development

Clone the repo using SSH or HTTPS.
After cloning the repo, make sure to install packages:

```sh
npm install
```

Ensure environment variables are set in a `.env`. Refer to `.env.example`.

After installing dependencies and setting up environment variables, run STH locally:

```sh
npm run dev
```

## Testing

STH uses vitest to handle unit tests.
To run tests:

```sh
npm run test
```

## Features

### Data fetching / Store

[React Query](https://tanstack.com/query/latest/docs/framework/react/overview) and the native fetch API are being used for data fetching, caching, and server state management.
Global client state is handled using [zustand](https://zustand.docs.pmnd.rs/getting-started/introduction).

### Routing

STH leverages [React Router](https://reactrouter.com/start/library/routing) for routing.

## Areas of Improvement

- Configure CI/CD pipeline and pre-commit hook
- Integrate e2e testing using Playwright, Cypress, or another e2e framework
- Leverage Storybook for component documentation and testing
- Write tests for API logic, using MSW
- Write more edge-case tests
- Improve app responsiveness (Create mobile Tabs, Tab)
- Upgrade flexibility of components
- Set up devtools for React Query and zustand
