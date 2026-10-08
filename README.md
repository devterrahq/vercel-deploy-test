# IWI

Repository located in BZS GitHub.

### Technologies

- [Next.js](https://nextjs.org/)
- [Storyblok](https://www.storyblok.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Sass](https://sass-lang.com/)
- [Node.js 24.x](https://nodejs.org/en)

## Getting Started

Make sure chocolatey [https://chocolatey.org/](https://chocolatey.org/) is installed.
Make sure MkCert is installed:
```bash
choco install mkcert
```

login to npm to be able to access private repos:
```bash
npm login
```

run npm install --legacy-peer-deps
```bash
npm install --legacy-peer-deps
```

Generate a self-signed certifcate:
```bash
npm run ssl
```

Then run the development server:

```bash
npm run dev
```

Open [https://localhost:3010](http://localhost:3010) with your browser to see the result.

## Environment Variables

During initialization of the project a `.env.local` file is created with the values inputted into the CLI. This file contains the following variables:

```env
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=
STORYBLOK_SPACE_ID=
```

## Explanation of Technologies

## TypeScript

We are using [TypeScript](https://www.typescriptlang.org/) to add typing to our project. A typical workflow is to create a new component on Storyblok and then generate the types for it. We are using [Storyblok Component Types Generator](https://github.com/dohomi/storyblok-generate-ts) to do this. .To generate the types run:

```bash
npm run generate
```

## Bootstrap

We are using [Bootstrap](https://getbootstrap.com/) as a base for our styling. By default we are using the following optional parts:

- Utilities
- Reboot
- Containers
- Grid
- Helpers

## Sass (SCSS)

We are using [Sass](https://sass-lang.com/) as our CSS preprocessor.

## Setting up a new project

1. Environment Variables
   1. Clone the '.env.local.example' file and rename it to '.env.local'
2. Script Adjustments
   1. Package.json Add the storyblok space id in the "generate" command so the component types are generated using the project space and not the starter space.
   2. 'scripts/update-field-options-url.sh' Update the space ids (lines 13 and 21) and published_site URL (line 5)
3. Make sure to use Node.js 24.x for local testing, as this is what the build uses in Vercel.
