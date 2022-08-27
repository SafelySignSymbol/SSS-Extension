# SSS Extension

<img src="./images/logo_type_c.png" alt="SSS Extension Logo"/>

Symbol Blockchain SSS Extension is a browser extension that works with web applications that use the Symbol blockchain.

This SSS application is designed to sign transactions on the Symbol blockchain, without the need to process a private key.

# Installation

SSS Extension available for Chromium Browser

Please install from the link below

<https://chrome.google.com/webstore/detail/sss-extension/llildiojemakefgnhhkmiiffonembcan>

## Links

- [SSS DEMO](https://inatatsu-tatsuhiro.github.io/SSS-Demo/)
- [SSS Wiki](https://github.com/inatatsu-tatsuhiro/SSS-Extension/wiki)
- [SSS Docs](https://docs.sss-symbol.com)

# Build

1. Clone this project

```
$ git clone https://github.com/inatatsu-tatsuhiro/SSS-Extension.git
```

2. Install the dependencies

```
$ cd SSS-Extension
$ yarn
```

3. Create Environment file

```
$ mv .env.sample .env
```

4. Build SSS Extension

```
$ yarn build
```

## Environment

environment sample (docker)

docker-compose.yml

```
version: "3"

services:
  extension:
    image: node:16
    working_dir: /app
    volumes:
      - ./extension:/app
    ports:
      - 6006:6006
    command: yarn storybook

```

# Licence

Copyright 2022 inatatsu

Licensed under the [Apache License 2.0](LICENSE)
