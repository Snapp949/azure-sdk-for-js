# DevOps Guide

This document describes CI/CD optimizations and developer experience improvements for the repository.

## Sample CI Workflow

A dedicated CI workflow (`sample-ci.yml`) has been added for the `horizon-ui-pro-nextjs-ts` sample:

- **Trigger**: Runs on push to any branch and on `workflow_dispatch` (manual trigger)
- **Concurrency**: Uses concurrency groups to cancel in-progress runs for the same branch
- **Caching**: Caches `node_modules` based on `package-lock.json` hash for faster builds
- **Graceful Failure**: Exits gracefully if `npm ci` fails due to private packages

## Concurrency Guards

Both `event-processor.yml` and `scheduled-event-processor.yml` now include concurrency blocks:

```yaml
concurrency:
  group: ${{ github.workflow }}
  cancel-in-progress: true
```

This prevents multiple runs of the same workflow from executing simultaneously.

## Caching Guidance

### Node.js Projects

Use `actions/cache@v4` to cache `node_modules`:

```yaml
- name: Cache node_modules
  uses: actions/cache@v4
  with:
    path: node_modules
    key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-modules-
```

### .NET Projects

For dotnet tools, cache the `~/.dotnet/tools` directory:

```yaml
- name: Cache dotnet tools
  uses: actions/cache@v4
  with:
    path: ~/.dotnet/tools
    key: ${{ runner.os }}-dotnet-tools-${{ hashFiles('**/*.csproj') }}
    restore-keys: |
      ${{ runner.os }}-dotnet-tools-
```

## Secrets Configuration

### NPM_TOKEN for Private Packages

If the sample uses private npm packages, configure `NPM_TOKEN` as a GitHub repository secret:

1. Go to **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Name: `NPM_TOKEN`, Value: your npm access token
4. In your workflow, create `.npmrc` dynamically:
   ```yaml
   - name: Configure npm
     run: echo "//registry.npmjs.org/:_authToken=${{ secrets.NPM_TOKEN }}" > .npmrc
   ```

Alternatively, create a `.npmrc.template` file in the sample directory (without the actual token):

```
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

### ZILLOW_API_KEY for External APIs

If the sample requires external API keys:

1. Add them as GitHub repository secrets (as described above)
2. Create a `.env.template` file listing required variables:
   ```
   ZILLOW_API_KEY=your_api_key_here
   ```
3. Document how developers should copy this to `.env.local` and fill in their own keys

**Important**: Never commit actual secrets or API keys to the repository.

## Running the Sample CI Locally

To test the sample build locally:

```bash
cd samples/horizon-ui-pro-nextjs-ts

# Install dependencies
npm ci

# Build the project
npm run build
```

To simulate the full CI workflow using [act](https://github.com/nektos/act):

```bash
# Install act (if not already installed)
brew install act  # macOS
# or: curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Run the sample-ci workflow
act push -W .github/workflows/sample-ci.yml
```

## Devcontainer

A devcontainer configuration is provided at `samples/horizon-ui-pro-nextjs-ts/.devcontainer/devcontainer.json`:

- Automatically runs `npm ci` after container creation
- Forwards port 3000 for the Next.js dev server
- Pre-installs ESLint and Prettier VS Code extensions

To use it in GitHub Codespaces or VS Code with the Dev Containers extension, open the repository and select "Reopen in Container".
