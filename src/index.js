const config = require('./config');

/**
 * Main application entry point
 * Demonstrates how to use the configuration system
 */
function main() {
  console.log('=== Project Configuration System ===\n');
  
  // Display current environment
  console.log(`Environment: ${config.getEnvironment()}\n`);
  
  // Display configuration values
  console.log('Configuration Values:');
  console.log(`- Port: ${config.get('port')}`);
  console.log(`- Host: ${config.get('host')}`);
  console.log(`- Database Host: ${config.get('database.host')}`);
  console.log(`- Database Port: ${config.get('database.port')}`);
  console.log(`- Database Name: ${config.get('database.name')}`);
  console.log(`- Logging Level: ${config.get('logging.level')}`);
  console.log(`- Logging Format: ${config.get('logging.format')}`);
  console.log(`- Debug Mode: ${config.get('features.debugMode')}`);
  console.log(`- Hot Reload: ${config.get('features.hotReload')}`);
  console.log(`- API Version: ${config.get('api.version')}`);
  console.log(`- API Timeout: ${config.get('api.timeout')}`);
  
  // Display full configuration (optional)
  if (config.get('features.debugMode')) {
    console.log('\n=== Full Configuration (Debug Mode) ===');
    console.log(JSON.stringify(config.getAll(), null, 2));
  }
  
  console.log('\n=== Application Started ===');
  console.log(`Server would start on ${config.get('host')}:${config.get('port')}`);
}

// Start the application
if (require.main === module) {
  main();
}

module.exports = { main };