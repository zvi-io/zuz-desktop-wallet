# Desktop Client

## Install Dependencies
#### Windows Setup Instructions
- Fork and clone the zvi-desktop-wallet repository
- In the zvi-desktop-wallet repository, make a copy of the `config_example.js` file and name it `config.js`
- Install Git and add it to System path
- Install Nodejs 6.14
- npm install -g --production windows-build-tools
- Run `npm install`
- Run `node_modules\.bin\nw` to make sure nw.js gets installed correctly
- Run `node_modules\.bin\gulp` to compile and start Dev environment

## Build

- The production build process is currently not working in Windows
- Run `gulp packages` in your command line for the production ready client
- Your desktop client is in the `packages/ZviDesktopWallet` directory

