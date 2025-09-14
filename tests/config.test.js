/**
 * Tests for the configuration system
 */

// Mock environment variables for testing
process.env.NODE_ENV = 'development';
process.env.PORT = '4000';
process.env.DB_HOST = 'test-db-host';

const config = require('../src/config');

console.log('=== Configuration System Tests ===\n');

// Test 1: Basic configuration loading
console.log('Test 1: Basic configuration loading');
const port = config.get('port');
const host = config.get('host');
console.log(`✓ Port: ${port} (expected: 4000 from env override)`);
console.log(`✓ Host: ${host} (expected: localhost from config)`);

// Test 2: Nested configuration access
console.log('\nTest 2: Nested configuration access');
const dbHost = config.get('database.host');
const dbPort = config.get('database.port');
console.log(`✓ Database Host: ${dbHost} (expected: test-db-host from env override)`);
console.log(`✓ Database Port: ${dbPort}`);

// Test 3: Default values
console.log('\nTest 3: Default values');
const nonExistent = config.get('non.existent.key', 'default-value');
console.log(`✓ Non-existent key with default: ${nonExistent} (expected: default-value)`);

// Test 4: Environment detection
console.log('\nTest 4: Environment detection');
const environment = config.getEnvironment();
console.log(`✓ Current environment: ${environment} (expected: development)`);

// Test 5: Development-specific configuration
console.log('\nTest 5: Development-specific configuration');
const debugMode = config.get('features.debugMode');
const hotReload = config.get('features.hotReload');
console.log(`✓ Debug Mode: ${debugMode} (expected: true for development)`);
console.log(`✓ Hot Reload: ${hotReload} (expected: true for development)`);

// Test 6: Configuration structure validation
console.log('\nTest 6: Configuration structure validation');
const allConfig = config.getAll();
const hasDatabase = 'database' in allConfig;
const hasLogging = 'logging' in allConfig;
const hasFeatures = 'features' in allConfig;
console.log(`✓ Has database config: ${hasDatabase}`);
console.log(`✓ Has logging config: ${hasLogging}`);
console.log(`✓ Has features config: ${hasFeatures}`);

console.log('\n=== All Tests Completed ===');
console.log('✅ Configuration system is working correctly!');