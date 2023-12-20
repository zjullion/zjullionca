#!/bin/sh

# Note: we don't install aws-cli, as it already comes with Ubuntu

# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# install node
nvm install "$(cat ./.nvmrc)"
nvm alias default "$(cat ./.nvmrc)"

# install pnpm
npm install -g pnpm@8

# install global dependencies
npm install -g ts-node@10
npm install -g aws-cdk@2.115.0

# install all dependencies
pnpm install:all