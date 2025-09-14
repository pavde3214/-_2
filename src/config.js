const fs = require('fs');
const path = require('path');
require('dotenv').config();

/**
 * Configuration manager for the project
 * Loads configuration from JSON files in the config directory
 * and merges with environment variables
 */
class Config {
  constructor() {
    this.config = {};
    this.loadConfig();
  }

  /**
   * Load configuration from files and environment
   */
  loadConfig() {
    const env = process.env.NODE_ENV || 'development';
    const configDir = path.join(__dirname, '..', 'config');
    
    // Load default configuration
    this.loadConfigFile(path.join(configDir, 'default.json'));
    
    // Load environment-specific configuration
    const envConfigPath = path.join(configDir, `${env}.json`);
    if (fs.existsSync(envConfigPath)) {
      this.loadConfigFile(envConfigPath);
    }
    
    // Override with environment variables
    this.applyEnvironmentOverrides();
  }

  /**
   * Load configuration from a JSON file
   * @param {string} filePath - Path to the configuration file
   */
  loadConfigFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const fileConfig = JSON.parse(fileContent);
        this.config = this.mergeDeep(this.config, fileConfig);
      }
    } catch (error) {
      console.error(`Error loading configuration from ${filePath}:`, error.message);
    }
  }

  /**
   * Apply environment variable overrides
   */
  applyEnvironmentOverrides() {
    if (process.env.PORT) {
      this.config.port = parseInt(process.env.PORT);
    }
    if (process.env.HOST) {
      this.config.host = process.env.HOST;
    }
    if (process.env.DB_HOST) {
      this.config.database = this.config.database || {};
      this.config.database.host = process.env.DB_HOST;
    }
    if (process.env.DB_PORT) {
      this.config.database = this.config.database || {};
      this.config.database.port = parseInt(process.env.DB_PORT);
    }
    if (process.env.DB_NAME) {
      this.config.database = this.config.database || {};
      this.config.database.name = process.env.DB_NAME;
    }
    if (process.env.LOG_LEVEL) {
      this.config.logging = this.config.logging || {};
      this.config.logging.level = process.env.LOG_LEVEL;
    }
  }

  /**
   * Deep merge two objects
   * @param {Object} target - Target object
   * @param {Object} source - Source object
   * @returns {Object} Merged object
   */
  mergeDeep(target, source) {
    const output = Object.assign({}, target);
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this.mergeDeep(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }

  /**
   * Check if value is an object
   * @param {*} item - Item to check
   * @returns {boolean} True if item is an object
   */
  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  /**
   * Get configuration value
   * @param {string} key - Configuration key (supports dot notation)
   * @param {*} defaultValue - Default value if key not found
   * @returns {*} Configuration value
   */
  get(key, defaultValue = null) {
    const keys = key.split('.');
    let value = this.config;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }
    
    return value;
  }

  /**
   * Get all configuration
   * @returns {Object} Complete configuration object
   */
  getAll() {
    return { ...this.config };
  }

  /**
   * Get current environment
   * @returns {string} Current environment
   */
  getEnvironment() {
    return process.env.NODE_ENV || 'development';
  }
}

// Export singleton instance
module.exports = new Config();