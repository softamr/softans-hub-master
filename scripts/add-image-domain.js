#!/usr/bin/env node

/**
 * Script to automatically add image domains to next.config.ts
 * Usage: node scripts/add-image-domain.js <domain>
 * Example: node scripts/add-image-domain.js images.example.com
 */

const fs = require('fs');
const path = require('path');

function addImageDomain(domain) {
  const configPath = path.join(process.cwd(), 'next.config.ts');
  
  if (!fs.existsSync(configPath)) {
    console.error('❌ next.config.ts not found');
    process.exit(1);
  }
  
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Check if domain already exists
  if (configContent.includes(`hostname: '${domain}'`)) {
    console.log(`✅ Domain "${domain}" already exists in config`);
    return;
  }
  
  // Create new domain entry
  const newEntry = `      {
        protocol: 'https',
        hostname: '${domain}',
        port: '',
        pathname: '/**',
      },`;
  
  // Find the last domain entry and add after it
  const lastDomainIndex = configContent.lastIndexOf('pathname: \'/**\',\n      },');
  
  if (lastDomainIndex === -1) {
    console.error('❌ Could not find insertion point in config');
    process.exit(1);
  }
  
  const insertionPoint = lastDomainIndex + 'pathname: \'/**\',\n      },'.length;
  
  const newContent = 
    configContent.slice(0, insertionPoint) + 
    '\n' + newEntry + 
    configContent.slice(insertionPoint);
  
  // Write back to file
  fs.writeFileSync(configPath, newContent);
  
  console.log(`✅ Added domain "${domain}" to next.config.ts`);
  console.log('🔄 Restart your development server to apply changes');
}

// Get domain from command line arguments
const domain = process.argv[2];

if (!domain) {
  console.log('Usage: node scripts/add-image-domain.js <domain>');
  console.log('Example: node scripts/add-image-domain.js images.example.com');
  process.exit(1);
}

// Validate domain format
const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/;

if (!domainRegex.test(domain)) {
  console.error('❌ Invalid domain format');
  process.exit(1);
}

addImageDomain(domain);
