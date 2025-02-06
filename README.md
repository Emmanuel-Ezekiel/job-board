# JOB BOARD

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Cardtonic-Technologies_Breet-admin-end&metric=alert_status&token=0e06721ebc33e4629376de640da1f87d08203d91)](https://sonarcloud.io/summary/new_code?id=Cardtonic-Technologies_Breet-admin-end) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Cardtonic-Technologies_Breet-admin-end&metric=bugs&token=0e06721ebc33e4629376de640da1f87d08203d91)](https://sonarcloud.io/summary/new_code?id=Cardtonic-Technologies_Breet-admin-end) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Cardtonic-Technologies_Breet-admin-end&metric=code_smells&token=0e06721ebc33e4629376de640da1f87d08203d91)](https://sonarcloud.io/summary/new_code?id=Cardtonic-Technologies_Breet-admin-end) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Cardtonic-Technologies_Breet-admin-end&metric=coverage&token=0e06721ebc33e4629376de640da1f87d08203d91)](https://sonarcloud.io/summary/new_code?id=Cardtonic-Technologies_Breet-admin-end) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Cardtonic-Technologies_Breet-admin-end&metric=duplicated_lines_density&token=0e06721ebc33e4629376de640da1f87d08203d91)](https://sonarcloud.io/summary/new_code?id=Cardtonic-Technologies_Breet-admin-end)


## Prerequisites

**On Windows/Mac, the below commands need to be ran inside [Git Bash](https://gitforwindows.org/) shell.**

Node 20+ and Node Version Manager (NVM) are required in order to use this project in parallel with others that are using lower Node versions.
Yarn version 4+ is also required. To enable this in your environment, (in your terminal) run `corepack enable` and update your yarn package by running `yarn set version stable`.

For local development, the contents of the `.env.example` must be placed in an `.env.local` and adjusted to suit your needs.

**Please note**: Please refer to the [Setting NVM up](#setting-nvm-up) and [`.env` Files](#env-files) sections before running or working on this project.

### Setting NVM up

Follow the [NVM Setup Guide](https://github.com/nvm-sh/nvm?tab=readme-ov-file#intro) to install and configure NVM.

### Code Editor

The recommended code editor is [VS Code](https://code.visualstudio.com/Download) and to run all necessary lint task correctly, **MAC Users** are required to install `node version 18.18.0` and link this node version with eslint runtime runner. To do that, go to your VS Code settings and make sure you are under the **User** tab and not the **Workspace** tab. Type into the search input field `node` and select the `Edit in settings.json` option of **Eslint:: Node Env.**. Add the snippent below to the json file but replace `{{yourMacUsername}}` with your mac username.

```json
"eslint.runtime": "/Users/{{yourMacUsername}}/.nvm/versions/node/v18.18.0/bin/node",
```

Then restart your VS Code.
**Please note**: The above settings/configuration is for **MAC Users** only.

### `.env` Files

The variables stored in the `.env` files are not included in the git remote. These will need to be copied from `.env.example` and populated with the correct values, where appropriate.

## Development

### Installing dependencies

To install the dependencies, run:

```bash
git clone https://github.com/Emmanuel-Ezekiel/job-board.git
cd job-board
npm install
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

##### Running the app

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

##### Building the app

To build the app for production to the `./dist` folder, run:

```bash
npm run build
```

##### Cache busting

Sometimes, Yarn might require clearing the cache in order for the SDK to run properly.

Run the following commands to fully cache bust:

```bash
rm -rf package-lock.json
rm -rf node_modules
```

Then relaunch your shell and run:

```bash
npm install
```

**Recommendation**: If using VS Code, [splitting the terminal](https://code.visualstudio.com/docs/editor/integrated-terminal#_terminal-splitting) provides a nice view of both commands running simultaneously.

## Project structure

- ⚡ Next.js for Server-Side Rendering and Static Site Generation
- ✅ Strict Mode for React 18
- 💎 Integrate with [Tailwind Css](https://tailwindcss.com//)
- 🤖 Yup Object schema validation
- 📑 React Hook Form Flexible form validator
- 🔄 State management using Context API under src/app/context/
- 🚀 Custom API handling with Axios (src/config/axios.config.ts)
- 🌐 API calls and error handling logic for jobs in src/api/jobs.ts and src/api/errorHandler/
- 🎨 Custom reusable UI components located in src/components/ui/
- 📂 Organized helper functions, constants, and types in src/helpers/
- 🛠 Utility functions located in src/lib/utils.ts
- 📦 Static assets like images and icons under src/assets/
- ✨ Global CSS for the app stored in src/app/globals.css
- 🔧 Layout management in src/app/layout.tsx for consistent page structure
- 📄 Page-specific components for job-related features in src/app/jobs/ and saved items in src/app/saved/


### Philosophy

- Minimal code
- Custom components
- Reusable components
- lightweight pkgs (if required)

```shell
.
├── public/                     # Publicly accessible files such as images, fonts, etc.
├── src/                        # Main source folder for the project
│   ├── api/                    # Contains API-related code for making requests
│   │   ├── errorHandler/       # Error handling mechanisms for API requests
│   │   └── jobs.ts             # API calls related to jobs functionality
│   ├── app/                    # Application-related files, including pages and components
│   │   ├── components/         # React components specific to the app
│   │   ├── context/            # Context API-related files for managing global state
│   │   ├── favicon.ico         # Favicon for the application
│   │   ├── globals.css         # Global CSS for the entire application
│   │   ├── hooks/              # Custom React hooks used throughout the application
│   │   ├── jobs/               # Pages or components related to job functionalities
│   │   ├── layout.tsx          # Layout component that wraps the application
│   │   ├── page.tsx            # Main page component for the application
│   │   ├── providers.tsx       # Global providers for state management and other services
│   │   └── saved/              # Pages or components related to saved items
│   ├── assets/                 # Static assets like images and icons
│   ├── components/             # Reusable UI components
│   │   └── ui/                 # UI-specific components (e.g., buttons, forms)
│   ├── config/                 # Configuration files for third-party libraries
│   │   └── axios.config.ts     # Axios configuration for API requests
│   ├── helpers/                # Helper functions, constants, and types
│   │   ├── constants/          # Application-wide constants
│   │   ├── data/               # Data helpers or static data files
│   │   └── types/              # TypeScript type definitions for the app
│   └── lib/                    # Library utilities used across the app
│       └── utils.ts            # Utility functions for general purposes
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration file

```
