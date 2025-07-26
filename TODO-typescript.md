# Migration Plan: JairoJobs API to TypeScript

This plan outlines a gradual migration strategy, which allows you to convert the application file by file, ensuring the app remains functional throughout the process.

---

## Phase 1: Project Setup & Initial Configuration

The first step is to introduce TypeScript and its related tooling into the project without altering any existing JavaScript code.

1.  **Install Dependencies:**
    *   Add TypeScript and the necessary type definitions for your existing libraries as development dependencies.
    ```bash
    npm install --save-dev typescript @types/node @types/express @types/pg @types/cors @types/body-parser @types/js-yaml @types/swagger-ui-express ts-node nodemon
    ```
    *   **`ts-node`** will allow you to run TypeScript files directly during development without a separate compilation step.
    *   **`@types/*`** packages provide type information for libraries that were originally written in JavaScript.

2.  **Create `tsconfig.json`:**
    *   This file is the heart of a TypeScript project. It configures the compiler with rules for how to check and transpile your code.
    *   Create a `tsconfig.json` file in the project root. A good starting configuration for a gradual migration would be:

    ```json
    {
      "compilerOptions": {
        /* Base Options */
        "target": "es2020",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./",

        /* Strictness & Type Checking */
        "strict": true,
        "noImplicitAny": true,

        /* Module Resolution */
        "moduleResolution": "node",
        "esModuleInterop": true,

        /* Migration-Specific Settings */
        "allowJs": true,
        "checkJs": false,

        /* Advanced Options */
        "forceConsistentCasingInFileNames": true,
        "skipLibCheck": true
      },
      "include": [
        "**/*.ts"
      ],
      "exclude": [
        "node_modules",
        "**/*.spec.ts"
      ]
    }
    ```

---

## Phase 2: Define Core Application Types

Before converting logic files, define the core data structures. Your `jairojobs.yaml` provides an excellent schema for this.

1.  **Create a `types` Directory:**
    *   Create a new directory, for instance, `src/types/`.

2.  **Define the `Job` Interface:**
    *   Create a file `src/types/job.types.ts`.
    *   Based on your OpenAPI schema, define a `Job` interface. This creates a single, reusable source of truth for what a "job" object looks like.

    ```typescript
    // src/types/job.types.ts
    export interface Job {
      id: number;
      title: string;
      description: string;
      company: string;
      location: string;
      salary?: number;
      employmentType: 'Full Time' | 'Part Time' | 'Contract' | 'Temporary' | 'Internship';
      // ... add other properties from your YAML schema
    }
    ```

---

## Phase 3: Gradual File Conversion

The strategy is to start from the "leaves" of your application (files with few dependencies) and move toward the "root" (the main `index.js` file).

1.  **Convert `config.js` -> `config/config.ts`**
2.  **Refactor and Convert `database.js` into `services` and `controllers`**
3.  **Create `routes/job.routes.ts`**
4.  **Convert `index.js` -> `index.ts`**

---

## Phase 4: Update Build & Development Workflow

Update `package.json` to handle the new TypeScript workflow.

1.  **Modify `package.json` scripts:**
    ```json
    "scripts": {
      "build": "tsc",
      "start": "node dist/index.js",
      "dev": "nodemon index.ts"
    },
    ```

2.  **Create `nodemon.json`:**
    ```json
    {
      "watch": ["."],
      "ext": "ts,json",
      "ignore": ["node_modules", "dist"],
      "exec": "ts-node index.ts"
    }
    ```

3.  **Update `.gitignore`:**
    *   Add the compiled output directory: `/dist`

---

## Phase 5: Finalization & Stricter Rules

Once all `.js` files have been converted to `.ts`, you can tighten the compiler rules.

1.  **Update `tsconfig.json`:** Set `"allowJs": false`.
2.  **Review and Refactor:** Look for any remaining `any` types and replace them with more specific types.