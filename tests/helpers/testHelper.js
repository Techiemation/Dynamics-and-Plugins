/**
 * Test Helper - Mock Dynamics 365 Environment
 * Provides mock objects and utilities for testing Dynamics 365 form scripts
 */

// Mock ContactFormScript if not loaded
if (typeof ContactFormScript === 'undefined') {
    // Load the actual script for testing
    var fs = require('fs');
    var path = require('path');
    
    // Read and execute the ContactFormScript
    var scriptPath = path.join(__dirname, '../../src/Contact/FormScripts/ContactFormScript.js');
    if (fs.existsSync(scriptPath)) {
        var scriptContent = fs.readFileSync(scriptPath, 'utf8');
        eval(scriptContent);
    }
}

// Global test utilities
global.TestUtils = {
    /**
     * Creates a mock form context with specified field values
     */
    createMockFormContext: function(fieldValues) {
        var mockFields = {};
        var mockControls = {};
        
        // Create mock fields based on provided values
        Object.keys(fieldValues || {}).forEach(function(fieldName) {
            mockFields[fieldName] = {
                getValue: function() { return fieldValues[fieldName]; },
                setValue: jasmine.createSpy('setValue'),
                addOnChange: jasmine.createSpy('addOnChange')
            };
            
            // Create corresponding control if it's a control field
            if (fieldName.indexOf('control_') === 0) {
                var controlName = fieldName.replace('control_', '');
                mockControls[controlName] = {
                    setVisible: jasmine.createSpy('setVisible')
                };
            }
        });
        
        return {
            getAttribute: function(fieldName) {
                return mockFields[fieldName] || null;
            },
            getControl: function(controlName) {
                return mockControls[controlName] || null;
            }
        };
    },

    /**
     * Creates a mock execution context
     */
    createMockExecutionContext: function(formContext) {
        return {
            getFormContext: function() {
                return formContext;
            }
        };
    }
};