# -_2

A Node.js project with comprehensive configuration management system.

## Где определяется конфигурация для этого проекта? (Where is project configuration defined?)

Project configuration is defined in multiple locations for maximum flexibility:

### 1. Configuration Files (`/config/`)
- **`config/default.json`** - Base configuration for all environments
- **`config/development.json`** - Development-specific overrides
- **`config/production.json`** - Production-specific overrides

### 2. Environment Variables (`.env` file)
- Create `.env` file from `.env.example` template
- Environment variables override JSON configuration
- Supports database connections, API keys, and runtime settings

### 3. Package Configuration (`package.json`)
- Project metadata, dependencies, and scripts
- Node.js and npm version requirements
- Build and development tool configuration

### 4. Build Configuration
- **`webpack.config.js`** - Build and bundling configuration
- **`.gitignore`** - Files and directories to exclude from version control

## Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your specific values
```

## Usage

```bash
# Start the application
npm start

# Run in development mode
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## Configuration Structure

The configuration system supports:

- **Environment-based configs**: Different settings for development, production, etc.
- **Environment variable overrides**: Override any config value with environment variables
- **Nested configuration access**: Use dot notation like `database.host`
- **Default values**: Fallback values when configuration is missing

### Example Configuration Access

```javascript
const config = require('./src/config');

// Get simple values
const port = config.get('port');
const host = config.get('host');

// Get nested values
const dbHost = config.get('database.host');
const logLevel = config.get('logging.level');

// Get with default value
const timeout = config.get('api.timeout', 5000);

// Get all configuration
const allConfig = config.getAll();
```

## Environment Variables

Key environment variables that override configuration:

- `NODE_ENV` - Application environment (development, production)
- `PORT` - Server port
- `HOST` - Server host
- `DB_HOST`, `DB_PORT`, `DB_NAME` - Database connection
- `LOG_LEVEL` - Logging level

## Project Structure

```
-_2/
├── config/                 # Configuration files
│   ├── default.json       # Base configuration
│   ├── development.json   # Development overrides
│   └── production.json    # Production overrides
├── src/                   # Source code
│   ├── config.js         # Configuration manager
│   └── index.js          # Main application
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── package.json         # Project configuration
├── webpack.config.js    # Build configuration
└── README.md           # This file
```

## Features

- ✅ Multi-environment configuration support
- ✅ Environment variable overrides
- ✅ Nested configuration access with dot notation
- ✅ Configuration validation and error handling
- ✅ Deep merging of configuration objects
- ✅ Development and production build configs
- ✅ Comprehensive documentation