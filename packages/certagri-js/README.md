# certagri-js

Certagri-js is a custom JavaScript library that provides a set of functions to interact with the Certificate Agrigator Module.

## Installation

```bash
pnpm add @project-p/certagri-js
```

## Usage

```javascript
import { Certagri } from '@project-p/certagri-js';

const certagri = Certagri;

const user_1_pgp = await certAgri.newEntity({
    email: 'hi@b68web.dev',
    name: 'jyotirmoy',
    passphrase: '12345678'
});

const user_1 = await certAgri.generateKeyPairC();
```