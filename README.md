# Stacks 2.0 Explorer


![An image of the Stacks Explorer](/explorer-image.png 'Stacks Explorer')
![CI/CD](https://github.com/blockstack/explorer/actions/workflows/ci.yml/badge.svg)

| Environment | Status                                                                                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prod        | [![Prod App Status](https://argocd.blockstack.xyz/api/badge?name=prod.explorer&revision=true)](https://argocd.blockstack.xyz/applications/prod.explorer)          |
| Staging     | [![Staging App Status](https://argocd.blockstack.xyz/api/badge?name=staging.explorer&revision=true)](https://argocd.blockstack.xyz/applications/staging.explorer) |

### Getting started

The Stacks Explorer is built with [React](https://reactjs.org/), [next.js](https://github.com/zeit/next.js) and [@stacks/ui](https://github.com/blockstack/ui).

To run the explorer locally, first [clone this repo](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).

Next let's make sure you have the tools to install the projects dependencies:

1. Install [NodeJS](https://nodejs.dev/) that includes `npm`
1. Install [Pnpm](https://pnpm.io/installation)

We highly recommend using [Homebrew](https://brew.sh/).

Now open your Terminal, and make sure you are in the `/explorer` folder to run `pnpm i` to install the dependencies:

```sh
pnpm i
```

### Env variables

The application needs a couple of env variables to work properly:

```
NEXT_PUBLIC_MAINNET_API_SERVER=https://api.hiro.so
NEXT_PUBLIC_TESTNET_API_SERVER=https://api.testnet.hiro.so
NEXT_PUBLIC_LEGACY_EXPLORER_API_SERVER=https://explorer-api.legacy.blockstack.org
NEXT_PUBLIC_DEPLOYMENT_URL=https://explorer.hiro.so
NEXT_PUBLIC_MAINNET_ENABLED="true"
NEXT_PUBLIC_DEFAULT_POLLING_INTERVAL="10000"
```

If you are in a mac, you'll need to add this to `/etc/paths`

### Run in development mode

To build and run the application locally, you can run this pnpm task which will launch the application at http://localhost:3000.

```sh
pnpm dev
```

### Building for production

To build for production, run `pnpm build` which will run the default next.js build task.
