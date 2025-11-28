# DevOps Configuration

This document describes the CI/CD configuration, caching strategies, and concurrency settings for this repository.

## Concurrency

All workflows use concurrency groups to avoid duplicate runs:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

This ensures that if a new commit is pushed to a branch while a workflow is running, the in-progress run is cancelled and replaced with the new one.

## Caching

### Node.js Caching

The `sample-ci.yml` workflow uses two levels of caching for Node.js projects:

1. **npm cache** - Built into `actions/setup-node@v4` with `cache: 'npm'`
2. **node_modules cache** - Uses `actions/cache@v4` to cache the entire `node_modules` directory

Example cache configuration:

```yaml
- name: Cache node_modules
  uses: actions/cache@v4
  with:
    path: samples/horizon-ui-pro-nextjs-ts/node_modules
    key: ${{ runner.os }}-node-modules-${{ hashFiles('samples/horizon-ui-pro-nextjs-ts/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-modules-
```

### .NET Caching

For .NET workflows (like `event-processor.yml`), you can add caching with:

```yaml
- name: Cache NuGet packages
  uses: actions/cache@v4
  with:
    path: ~/.nuget/packages
    key: ${{ runner.os }}-nuget-${{ hashFiles('**/*.csproj') }}
    restore-keys: |
      ${{ runner.os }}-nuget-
```

## Secrets Management

### Adding NPM_TOKEN for Private Packages

If your project requires private npm packages:

1. Go to **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Name: `NPM_TOKEN`
4. Value: Your npm access token

Then reference in workflows:

```yaml
- name: Install dependencies
  run: npm ci
  env:
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Codespaces Secrets

For GitHub Codespaces:

1. Go to **Settings** > **Secrets and variables** > **Codespaces**
2. Add secrets that should be available in your development environment
3. These are automatically available as environment variables in Codespaces

**Note:** Never commit tokens or secrets to the repository.

## Running Sample CI Locally

To run the sample CI workflow locally:

```bash
# Navigate to the sample directory
cd samples/horizon-ui-pro-nextjs-ts

# Install dependencies
npm ci

# Build the project
npm run build
```

To test the full workflow locally using [act](https://github.com/nektos/act):

```bash
# Install act (macOS)
brew install act

# Run the sample-ci workflow
act push -W .github/workflows/sample-ci.yml
```

## Devcontainer

The sample includes a devcontainer configuration at `samples/horizon-ui-pro-nextjs-ts/.devcontainer/devcontainer.json`. This:

- Uses Node.js 20
- Forwards port 3000 for the development server
- Automatically runs `npm ci` when the container is created
- Includes VS Code extensions for ESLint and Prettier
