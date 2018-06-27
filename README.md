# Desktop Client


### Linux Setup
#### Prerequisites
- Install Git and add it to System path
- Install Node v4.9.1
#### Instructions
- Fork and clone the zvi-desktop-wallet repository
  - `git clone https://github.com/zvi-io/zvi-desktop-wallet.git`
- In the zvi-desktop-wallet directory, make a copy of the `config_example.js` file and name it `config.js`
- Run `npm install`
- Since npm install generally fails in middle of first run, run `npm install` a second time to complete the installation process 
#### Dev Mode
- Run `gulp` in root directory to start up dev mode
#### Build
- Run `gulp packages` in your command line to compile the production ready client executable
- Your desktop client is in the `packages/ZviDesktopWallet` directory
- Modify the `platforms` array in gulpfile.js (~line 350) to set the platforms targeted for compilation
