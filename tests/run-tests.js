#!/usr/bin/env node

/**
 * Node.js Test Runner for Contact Form Script Tests
 * Requirement: FRD-UI-001
 * 
 * This script runs the test suite in a Node.js environment for automated testing
 */

const fs = require('fs');
const path = require('path');

// Read the source files
const scriptPath = path.join(__dirname, '../src/Contact/Forms/Scripts/ContactFormScript.js');
const testPath = path.join(__dirname, '../tests/ContactFormScript.test.js');

console.log('📋 Contact Form Script Test Runner - FRD-UI-001');
console.log('=' * 60);

try {
    // Load the main script
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    eval(scriptContent);

    // Load the test suite
    const testContent = fs.readFileSync(testPath, 'utf8');
    eval(testContent);

    console.log('✅ Scripts loaded successfully\n');

    // Run the tests
    const results = TestSuite.runAllTests();

    // Exit with appropriate code
    if (results.failed === 0 && results.errors === 0) {
        console.log('\n🎉 ALL TESTS PASSED! Implementation meets FRD-UI-001 requirements.');
        process.exit(0);
    } else {
        console.log('\n⚠️  Some tests failed. Please review the implementation.');
        process.exit(1);
    }

} catch (error) {
    console.error('❌ Error running tests:', error.message);
    console.error(error.stack);
    process.exit(1);
}