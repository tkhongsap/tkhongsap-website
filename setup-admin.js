#!/usr/bin/env node

/**
 * Setup Admin Script
 * 
 * This script helps you create an initial admin user for the application.
 * Run it with: node setup-admin.js
 */

const readline = require('readline');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BASE_URL = process.env.SITE_URL || 'http://localhost:5000';

console.log('===== Admin User Setup =====');
console.log('This script will help you create an initial admin user.');
console.log('The user will have full access to the admin functionalities.');
console.log('');

function validateUsername(username) {
  if (!username || username.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  return null;
}

function validatePassword(password) {
  if (!password || password.length < 10) {
    return 'Password must be at least 10 characters long';
  }
  
  // Check for mixed case
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return 'Password must include both uppercase and lowercase letters';
  }
  
  // Check for numbers
  if (!/[0-9]/.test(password)) {
    return 'Password must include at least one number';
  }
  
  // Check for special characters
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return 'Password must include at least one special character';
  }
  
  return null;
}

function askUsername() {
  return new Promise((resolve) => {
    rl.question('Username (min 3 characters): ', (username) => {
      const error = validateUsername(username);
      if (error) {
        console.log(`Error: ${error}`);
        return resolve(askUsername());
      }
      resolve(username);
    });
  });
}

function askPassword() {
  return new Promise((resolve) => {
    rl.question('Password (min 10 characters, with mixed case, numbers and special chars): ', (password) => {
      const error = validatePassword(password);
      if (error) {
        console.log(`Error: ${error}`);
        return resolve(askPassword());
      }
      
      rl.question('Confirm password: ', (confirmPassword) => {
        if (password !== confirmPassword) {
          console.log('Error: Passwords do not match');
          return resolve(askPassword());
        }
        resolve(password);
      });
    });
  });
}

function makeRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const parsedUrl = new URL(url);
    
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const req = client.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve({ statusCode: res.statusCode, data: parsedData });
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: responseData });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function createAdminUser() {
  try {
    const username = await askUsername();
    const password = await askPassword();
    
    console.log('\nCreating admin user...');
    
    const response = await makeRequest(
      `${BASE_URL}/api/setup/admin`,
      'POST',
      { username, password }
    );
    
    if (response.statusCode === 201) {
      console.log('\n✅ Success! Admin user created successfully.');
      console.log(`Username: ${username}`);
      console.log('\nYou can now log in to the admin interface using these credentials.');
    } else if (response.statusCode === 403) {
      console.log('\n⚠️ Admin user already exists.');
      console.log('If you need to reset your password, please contact your system administrator.');
    } else {
      console.log('\n❌ Error creating admin user:');
      console.log(response.data);
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('Make sure the server is running and accessible.');
  } finally {
    rl.close();
  }
}

createAdminUser(); 