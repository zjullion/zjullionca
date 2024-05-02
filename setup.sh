#!/bin/sh

# install aws-cli
apt-get install -y awscli

# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# install node
nvm install "$(cat ./.nvmrc)"
nvm use

# install pnpm
npm install -g pnpm@9

# install all dependencies
pnpm install:all