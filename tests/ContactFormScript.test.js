/**
 * Test Suite for Contact Form Script - Conditional Field Visibility
 * Requirement: FRD-UI-001
 * 
 * These tests validate the conditional visibility logic for the Secondary Email field
 * based on the Has Secondary Email checkbox value.
 */

// Mock Dynamics 365 CE objects for testing
function createMockFormContext(hasSecondaryEmailValue, secondaryEmailValue) {
    var mockAttribute = {
        value: hasSecondaryEmailValue,
        getValue: function() { return this.value; },
        setValue: function(val) { this.value = val; },
        addOnChange: function(handler) { this.onChangeHandler = handler; },
        triggerOnChange: function(executionContext) {
            if (this.onChangeHandler) {
                this.onChangeHandler(executionContext);
            }
        }
    };

    var mockSecondaryEmailAttribute = {
        value: secondaryEmailValue,
        getValue: function() { return this.value; },
        setValue: function(val) { this.value = val; }
    };

    var mockControl = {
        visible: true,
        setVisible: function(isVisible) { this.visible = isVisible; },
        getVisible: function() { return this.visible; }
    };

    var mockFormContext = {
        getAttribute: function(fieldName) {
            if (fieldName === "new_hassecondaryemail") {
                return mockAttribute;
            } else if (fieldName === "new_secondaryemail") {
                return mockSecondaryEmailAttribute;
            }
            return null;
        },
        getControl: function(fieldName) {
            if (fieldName === "new_secondaryemail") {
                return mockControl;
            }
            return null;
        }
    };

    var mockExecutionContext = {
        getFormContext: function() { return mockFormContext; }
    };

    return {
        formContext: mockFormContext,
        executionContext: mockExecutionContext,
        hasSecondaryEmailAttribute: mockAttribute,
        secondaryEmailAttribute: mockSecondaryEmailAttribute,
        secondaryEmailControl: mockControl
    };
}

// Test Suite
var TestSuite = {
    results: [],
    
    /**
     * Runs a single test case
     */
    runTest: function(testName, testFunction) {
        try {
            console.log(`Running test: ${testName}`);
            var result = testFunction();
            if (result.passed) {
                console.log(`✅ PASSED: ${testName}`);
                this.results.push({ name: testName, status: 'PASSED', message: result.message });
            } else {
                console.error(`❌ FAILED: ${testName} - ${result.message}`);
                this.results.push({ name: testName, status: 'FAILED', message: result.message });
            }
        } catch (error) {
            console.error(`❌ ERROR: ${testName} - ${error.message}`);
            this.results.push({ name: testName, status: 'ERROR', message: error.message });
        }
    },

    /**
     * Runs all test cases
     */
    runAllTests: function() {
        console.log('=== Running Contact Form Script Tests ===\n');
        
        // Basic functionality tests
        this.runTest('Test 1: Checkbox checked shows Secondary Email field', this.testCheckboxCheckedShowsField);
        this.runTest('Test 2: Checkbox unchecked hides Secondary Email field', this.testCheckboxUncheckedHidesField);
        this.runTest('Test 3: Form load with checkbox checked shows field', this.testFormLoadCheckedState);
        this.runTest('Test 4: Form load with checkbox unchecked hides field', this.testFormLoadUncheckedState);
        
        // Edge case tests
        this.runTest('Test 5: Checkbox null value hides field', this.testCheckboxNullHidesField);
        this.runTest('Test 6: Checkbox undefined value hides field', this.testCheckboxUndefinedHidesField);
        this.runTest('Test 7: Secondary email cleared when field hidden', this.testSecondaryEmailClearedWhenHidden);
        this.runTest('Test 8: onChange event handler registration', this.testOnChangeHandlerRegistration);
        this.runTest('Test 9: Dynamic checkbox change updates visibility', this.testDynamicCheckboxChange);
        this.runTest('Test 10: Missing control handles gracefully', this.testMissingControlHandling);
        
        // Summary
        console.log('\n=== Test Results Summary ===');
        var passed = this.results.filter(r => r.status === 'PASSED').length;
        var failed = this.results.filter(r => r.status === 'FAILED').length;
        var errors = this.results.filter(r => r.status === 'ERROR').length;
        
        console.log(`Total Tests: ${this.results.length}`);
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`🚨 Errors: ${errors}`);
        
        return {
            total: this.results.length,
            passed: passed,
            failed: failed,
            errors: errors,
            results: this.results
        };
    },

    // Test Case 1: Checkbox checked shows Secondary Email field
    testCheckboxCheckedShowsField: function() {
        var mock = createMockFormContext(true, null);
        ContactFormScript.FieldLogic.updateSecondaryEmailVisibility(mock.formContext);
        
        if (mock.secondaryEmailControl.getVisible() === true) {
            return { passed: true, message: 'Secondary Email field is visible when checkbox is checked' };
        } else {
            return { passed: false, message: 'Secondary Email field should be visible when checkbox is checked' };
        }
    },

    // Test Case 2: Checkbox unchecked hides Secondary Email field
    testCheckboxUncheckedHidesField: function() {
        var mock = createMockFormContext(false, "test@example.com");
        ContactFormScript.FieldLogic.updateSecondaryEmailVisibility(mock.formContext);
        
        if (mock.secondaryEmailControl.getVisible() === false) {
            return { passed: true, message: 'Secondary Email field is hidden when checkbox is unchecked' };
        } else {
            return { passed: false, message: 'Secondary Email field should be hidden when checkbox is unchecked' };
        }
    },

    // Test Case 3: Form load with checkbox checked shows field
    testFormLoadCheckedState: function() {
        var mock = createMockFormContext(true, null);
        ContactFormScript.FormEvents.onLoad(mock.executionContext);
        
        if (mock.secondaryEmailControl.getVisible() === true) {
            return { passed: true, message: 'Field visible on form load when checkbox is checked' };
        } else {
            return { passed: false, message: 'Field should be visible on form load when checkbox is checked' };
        }
    },

    // Test Case 4: Form load with checkbox unchecked hides field
    testFormLoadUncheckedState: function() {
        var mock = createMockFormContext(false, null);
        ContactFormScript.FormEvents.onLoad(mock.executionContext);
        
        if (mock.secondaryEmailControl.getVisible() === false) {
            return { passed: true, message: 'Field hidden on form load when checkbox is unchecked' };
        } else {
            return { passed: false, message: 'Field should be hidden on form load when checkbox is unchecked' };
        }
    },

    // Test Case 5: Checkbox null value hides field
    testCheckboxNullHidesField: function() {
        var mock = createMockFormContext(null, null);
        ContactFormScript.FieldLogic.updateSecondaryEmailVisibility(mock.formContext);
        
        if (mock.secondaryEmailControl.getVisible() === false) {
            return { passed: true, message: 'Secondary Email field is hidden when checkbox is null' };
        } else {
            return { passed: false, message: 'Secondary Email field should be hidden when checkbox is null' };
        }
    },

    // Test Case 6: Checkbox undefined value hides field
    testCheckboxUndefinedHidesField: function() {
        var mock = createMockFormContext(undefined, null);
        ContactFormScript.FieldLogic.updateSecondaryEmailVisibility(mock.formContext);
        
        if (mock.secondaryEmailControl.getVisible() === false) {
            return { passed: true, message: 'Secondary Email field is hidden when checkbox is undefined' };
        } else {
            return { passed: false, message: 'Secondary Email field should be hidden when checkbox is undefined' };
        }
    },

    // Test Case 7: Secondary email cleared when field hidden
    testSecondaryEmailClearedWhenHidden: function() {
        var mock = createMockFormContext(false, "test@example.com");
        ContactFormScript.FieldLogic.updateSecondaryEmailVisibility(mock.formContext);
        
        if (mock.secondaryEmailAttribute.getValue() === null && mock.secondaryEmailControl.getVisible() === false) {
            return { passed: true, message: 'Secondary email value cleared when field is hidden' };
        } else {
            return { passed: false, message: 'Secondary email value should be cleared when field is hidden' };
        }
    },

    // Test Case 8: onChange event handler registration
    testOnChangeHandlerRegistration: function() {
        var mock = createMockFormContext(true, null);
        ContactFormScript.FormEvents.onLoad(mock.executionContext);
        
        if (mock.hasSecondaryEmailAttribute.onChangeHandler) {
            return { passed: true, message: 'onChange handler registered successfully' };
        } else {
            return { passed: false, message: 'onChange handler should be registered' };
        }
    },

    // Test Case 9: Dynamic checkbox change updates visibility
    testDynamicCheckboxChange: function() {
        var mock = createMockFormContext(true, null);
        
        // Set up the form with onChange handler
        ContactFormScript.FormEvents.onLoad(mock.executionContext);
        
        // Initially visible
        var initiallyVisible = mock.secondaryEmailControl.getVisible();
        
        // Change checkbox to false
        mock.hasSecondaryEmailAttribute.setValue(false);
        
        // Trigger the onChange handler directly
        ContactFormScript.FieldLogic.onHasSecondaryEmailChange(mock.executionContext);
        
        var hiddenAfterChange = mock.secondaryEmailControl.getVisible();
        
        if (initiallyVisible === true && hiddenAfterChange === false) {
            return { passed: true, message: 'Field visibility updates dynamically on checkbox change' };
        } else {
            return { passed: false, message: `Field visibility should update dynamically on checkbox change. Initial: ${initiallyVisible}, After: ${hiddenAfterChange}` };
        }
    },

    // Test Case 10: Missing control handles gracefully
    testMissingControlHandling: function() {
        var mockFormContextWithoutControl = {
            getAttribute: function(fieldName) {
                if (fieldName === "new_hassecondaryemail") {
                    return { getValue: function() { return true; } };
                }
                return null;
            },
            getControl: function(fieldName) {
                return null; // No control found
            }
        };
        
        try {
            ContactFormScript.FieldLogic.updateSecondaryEmailVisibility(mockFormContextWithoutControl);
            return { passed: true, message: 'Missing control handled gracefully without errors' };
        } catch (error) {
            return { passed: false, message: 'Should handle missing control gracefully: ' + error.message };
        }
    }
};

// Export for Node.js testing if available
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TestSuite, ContactFormScript };
}