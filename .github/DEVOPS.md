# DevOps Guide

## Caching

### Node.js Dependencies
Use `actions/cache` to cache `node_modules` based on `package-lock.json`:
```yaml
- uses: actions/cache@v4
  with:
    path: node_modules
    key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-modules-
```

### .NET Dependencies
Use `actions/cache` to cache NuGet packages:
```yaml
- uses: actions/cache@v4
  with:
    path: ~/.nuget/packages
    key: ${{ runner.os }}-nuget-${{ hashFiles('**/*.csproj') }}
    restore-keys: |
      ${{ runner.os }}-nuget-
```

## Concurrency

To prevent redundant CI runs and save resources, add concurrency settings:
```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

This cancels in-progress runs when a new commit is pushed to the same branch.

## Adding Secrets Safely

### NPM_TOKEN
For private npm packages:
1. Go to repository Settings > Secrets and variables > Actions
2. Create a new repository secret named `NPM_TOKEN`
3. Reference in workflows using `${{ secrets.NPM_TOKEN }}`
4. Configure `.npmrc` in your workflow:
   ```yaml
   - run: echo "//registry.npmjs.org/:_authToken=${{ secrets.NPM_TOKEN }}" >> ~/.npmrc
   ```

### ZILLOW_API_KEY
For Zillow API access:
1. Go to repository Settings > Secrets and variables > Actions
2. Create a new repository secret named `ZILLOW_API_KEY`
3. Reference in workflows using `${{ secrets.ZILLOW_API_KEY }}`

**Never commit secrets or tokens directly to code.**

## Running Sample CI Locally

To run the sample CI workflow locally using [act](https://github.com/nektos/act):

```bash
# Install act (if not already installed)
brew install act  # macOS
# or see https://github.com/nektos/act#installation

# Run the sample-ci workflow
act push -W .github/workflows/sample-ci.yml

# Run with secrets
act push -W .github/workflows/sample-ci.yml -s NPM_TOKEN=your_token
```

Alternatively, run the build steps manually:
```bash
cd samples/horizon-ui-pro-nextjs-ts
npm ci
npm run build
```
