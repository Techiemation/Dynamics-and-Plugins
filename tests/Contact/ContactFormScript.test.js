/**
 * Test Cases for Contact Form Conditional Field Visibility
 * Requirement: FRD-UI-001
 * 
 * AI-Generated Test Cases following GPT + CodiumAI + GitHub Copilot methodology
 */

// Load the ContactFormScript for testing
var fs = require('fs');
var path = require('path');

// Read and execute the ContactFormScript
var scriptPath = path.join(__dirname, '../../src/Contact/FormScripts/ContactFormScript.js');
var scriptContent = fs.readFileSync(scriptPath, 'utf8');
eval(scriptContent);

describe('Contact Form Secondary Email Conditional Visibility Tests', function() {
    let mockFormContext;
    let mockCheckboxField;
    let mockSecondaryEmailField;
    let mockSecondaryEmailControl;

    beforeEach(function() {
        // Mock form context and fields
        mockCheckboxField = {
            getValue: jasmine.createSpy('getValue'),
            addOnChange: jasmine.createSpy('addOnChange')
        };
        
        mockSecondaryEmailField = {
            getValue: jasmine.createSpy('getValue'),
            setValue: jasmine.createSpy('setValue')
        };
        
        mockSecondaryEmailControl = {
            setVisible: jasmine.createSpy('setVisible')
        };
        
        mockFormContext = {
            getAttribute: jasmine.createSpy('getAttribute'),
            getControl: jasmine.createSpy('getControl')
        };
        
        // Setup default returns
        mockFormContext.getAttribute.and.callFake(function(fieldName) {
            if (fieldName === 'new_hassecondaryemail') return mockCheckboxField;
            if (fieldName === 'new_secondaryemail') return mockSecondaryEmailField;
            return null;
        });
        
        mockFormContext.getControl.and.callFake(function(fieldName) {
            if (fieldName === 'new_secondaryemail') return mockSecondaryEmailControl;
            return null;
        });
        
        // Clear console spies
        spyOn(console, 'log');
        spyOn(console, 'warn');
        spyOn(console, 'error');
    });

    describe('GPT-Generated Core Test Cases', function() {
        
        it('should show Secondary Email field when Has Secondary Email checkbox is checked', function() {
            // Arrange
            mockCheckboxField.getValue.and.returnValue(true);
            
            // Act
            ContactFormScript.toggleSecondaryEmailVisibility(mockFormContext);
            
            // Assert
            expect(mockSecondaryEmailControl.setVisible).toHaveBeenCalledWith(true);
            expect(console.log).toHaveBeenCalledWith('ContactFormScript: Checkbox checked - showing secondary email field');
        });

        it('should hide Secondary Email field when Has Secondary Email checkbox is unchecked', function() {
            // Arrange
            mockCheckboxField.getValue.and.returnValue(false);
            mockSecondaryEmailField.getValue.and.returnValue('test@example.com');
            
            // Act
            ContactFormScript.toggleSecondaryEmailVisibility(mockFormContext);
            
            // Assert
            expect(mockSecondaryEmailControl.setVisible).toHaveBeenCalledWith(false);
            expect(mockSecondaryEmailField.setValue).toHaveBeenCalledWith(null);
            expect(console.log).toHaveBeenCalledWith('ContactFormScript: Checkbox unchecked - hiding secondary email field and clearing value');
        });

        it('should properly handle form load with previously stored values - checkbox checked', function() {
            // Arrange
            mockCheckboxField.getValue.and.returnValue(true);
            var mockExecutionContext = {
                getFormContext: function() { return mockFormContext; }
            };
            
            // Act
            ContactFormScript.onLoad(mockExecutionContext);
            
            // Assert
            expect(mockCheckboxField.addOnChange).toHaveBeenCalledWith(ContactFormScript.onHasSecondaryEmailChange);
            expect(mockSecondaryEmailControl.setVisible).toHaveBeenCalledWith(true);
        });

        it('should properly handle form load with previously stored values - checkbox unchecked', function() {
            // Arrange
            mockCheckboxField.getValue.and.returnValue(false);
            var mockExecutionContext = {
                getFormContext: function() { return mockFormContext; }
            };
            
            // Act
            ContactFormScript.onLoad(mockExecutionContext);
            
            // Assert
            expect(mockCheckboxField.addOnChange).toHaveBeenCalledWith(ContactFormScript.onHasSecondaryEmailChange);
            expect(mockSecondaryEmailControl.setVisible).toHaveBeenCalledWith(false);
        });
    });

    describe('CodiumAI Enhanced Edge Cases', function() {
        
        it('should handle null checkbox value gracefully', function() {
            // Arrange
            mockCheckboxField.getValue.and.returnValue(null);
            
            // Act
            ContactFormScript.toggleSecondaryEmailVisibility(mockFormContext);
            
            // Assert
            expect(mockSecondaryEmailControl.setVisible).toHaveBeenCalledWith(false);
            expect(console.log).toHaveBeenCalledWith('ContactFormScript: Checkbox is null/undefined - hiding secondary email field');
        });

        it('should handle undefined checkbox value gracefully', function() {
            // Arrange
            mockCheckboxField.getValue.and.returnValue(undefined);
            
            // Act
            ContactFormScript.toggleSecondaryEmailVisibility(mockFormContext);
            
            // Assert
            expect(mockSecondaryEmailControl.setVisible).toHaveBeenCalledWith(false);
            expect(console.log).toHaveBeenCalledWith('ContactFormScript: Checkbox is null/undefined - hiding secondary email field');
        });

        it('should handle missing checkbox field gracefully', function() {
            // Arrange
            mockFormContext.getAttribute.and.callFake(function(fieldName) {
                if (fieldName === 'new_hassecondaryemail') return null;
                if (fieldName === 'new_secondaryemail') return mockSecondaryEmailField;
                return null;
            });
            
            // Act
            ContactFormScript.toggleSecondaryEmailVisibility(mockFormContext);
            
            // Assert
            expect(console.warn).toHaveBeenCalledWith('ContactFormScript: Required fields not found');
            expect(mockSecondaryEmailControl.setVisible).not.toHaveBeenCalled();
        });

        it('should handle missing secondary email control gracefully', function() {
            // Arrange
            mockFormContext.getControl.and.callFake(function(fieldName) {
                return null; // Return null for all controls
            });
            
            // Act
            ContactFormScript.toggleSecondaryEmailVisibility(mockFormContext);
            
            // Assert
            expect(console.warn).toHaveBeenCalledWith('ContactFormScript: Required fields not found');
        });

        it('should validate when checkbox is checked but secondary email is empty', function() {
            // Arrange
            mockCheckboxField.getValue.and.returnValue(true);
            mockSecondaryEmailField.getValue.and.returnValue('');
            
            // Act
            var result = ContactFormScript.validateSecondaryEmail(mockFormContext);
            
            // Assert
            expect(result).toBe(false);
            expect(console.warn).toHaveBeenCalledWith('ContactFormScript: Checkbox is checked but secondary email is empty');
        });

        it('should validate successfully when checkbox is checked and secondary email has value', function() {
            // Arrange
            mockCheckboxField.getValue.and.returnValue(true);
            mockSecondaryEmailField.getValue.and.returnValue('test@example.com');
            
            // Act
            var result = ContactFormScript.validateSecondaryEmail(mockFormContext);
            
            // Assert
            expect(result).toBe(true);
        });

        it('should validate successfully when checkbox is unchecked regardless of secondary email value', function() {
            // Arrange
            mockCheckboxField.getValue.and.returnValue(false);
            mockSecondaryEmailField.getValue.and.returnValue('test@example.com');
            
            // Act
            var result = ContactFormScript.validateSecondaryEmail(mockFormContext);
            
            // Assert
            expect(result).toBe(true);
        });
    });

    describe('OnChange Event Handler Tests', function() {
        
        it('should call toggleSecondaryEmailVisibility when checkbox changes', function() {
            // Arrange
            var mockExecutionContext = {
                getFormContext: function() { return mockFormContext; }
            };
            spyOn(ContactFormScript, 'toggleSecondaryEmailVisibility');
            
            // Act
            ContactFormScript.onHasSecondaryEmailChange(mockExecutionContext);
            
            // Assert
            expect(ContactFormScript.toggleSecondaryEmailVisibility).toHaveBeenCalledWith(mockFormContext);
        });

        it('should handle errors in onChange event gracefully', function() {
            // Arrange
            var mockExecutionContext = {
                getFormContext: function() { throw new Error('Test error'); }
            };
            
            // Act
            ContactFormScript.onHasSecondaryEmailChange(mockExecutionContext);
            
            // Assert
            expect(console.error).toHaveBeenCalledWith('ContactFormScript.onHasSecondaryEmailChange error: ', jasmine.any(Error));
        });
    });

    describe('Error Handling Tests', function() {
        
        it('should handle errors in onLoad gracefully', function() {
            // Arrange
            var mockExecutionContext = {
                getFormContext: function() { throw new Error('Test error'); }
            };
            
            // Act
            ContactFormScript.onLoad(mockExecutionContext);
            
            // Assert
            expect(console.error).toHaveBeenCalledWith('ContactFormScript.onLoad error: ', jasmine.any(Error));
        });

        it('should handle errors in toggleSecondaryEmailVisibility gracefully', function() {
            // Arrange
            mockFormContext.getAttribute.and.throwError('Test error');
            
            // Act
            ContactFormScript.toggleSecondaryEmailVisibility(mockFormContext);
            
            // Assert
            expect(console.error).toHaveBeenCalledWith('ContactFormScript.toggleSecondaryEmailVisibility error: ', jasmine.any(Error));
        });

        it('should handle errors in validateSecondaryEmail gracefully', function() {
            // Arrange
            mockFormContext.getAttribute.and.throwError('Test error');
            
            // Act
            var result = ContactFormScript.validateSecondaryEmail(mockFormContext);
            
            // Assert
            expect(result).toBe(false);
            expect(console.error).toHaveBeenCalledWith('ContactFormScript.validateSecondaryEmail error: ', jasmine.any(Error));
        });
    });
});