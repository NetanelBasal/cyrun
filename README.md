<p align="center">
 <img width="20%" height="20%" src="./logo.svg">
</p>

<br />

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
[![ngneat](https://img.shields.io/badge/@-ngneat-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngneat/)

> Superhuman Cypress Run Command

`cypress run` that lets you select files or folders to run

## Usage

Select one spec file or folder:

```bash
npx cyrun
```

<img src="demo.gif">

Select multiple specs file or folders:

```bash
npx cyrun -m
```

Forward the original command args:

```bash
npx cyrun --headed
```

Checkout the complete options list in the [official](https://docs.cypress.io/guides/guides/command-line.html#How-to-run-commands) docs.
