/**
 * Contact Form Script for Conditional Field Visibility
 * Requirement: FRD-UI-001 - Show/Hide "Secondary Email" field based on "Has Secondary Email?" checkbox
 * 
 * @fileoverview This script handles the conditional visibility of the Secondary Email field
 * based on the "Has Secondary Email?" checkbox value in the Contact form.
 */

var ContactFormScript = ContactFormScript || {};

ContactFormScript = {
    /**
     * Form OnLoad event handler
     * @param {Object} executionContext - The execution context
     */
    onLoad: function(executionContext) {
        try {
            var formContext = executionContext.getFormContext();
            
            // Initialize field visibility based on current checkbox value
            ContactFormScript.toggleSecondaryEmailVisibility(formContext);
            
            // Register onChange event for the checkbox
            var hasSecondaryEmailField = formContext.getAttribute("new_hassecondaryemail");
            if (hasSecondaryEmailField) {
                hasSecondaryEmailField.addOnChange(ContactFormScript.onHasSecondaryEmailChange);
            }
            
            console.log("ContactFormScript: Form loaded successfully");
        } catch (error) {
            console.error("ContactFormScript.onLoad error: ", error);
        }
    },

    /**
     * OnChange event handler for "Has Secondary Email?" checkbox
     * @param {Object} executionContext - The execution context
     */
    onHasSecondaryEmailChange: function(executionContext) {
        try {
            var formContext = executionContext.getFormContext();
            ContactFormScript.toggleSecondaryEmailVisibility(formContext);
        } catch (error) {
            console.error("ContactFormScript.onHasSecondaryEmailChange error: ", error);
        }
    },

    /**
     * Toggles the visibility of the Secondary Email field based on checkbox value
     * @param {Object} formContext - The form context
     */
    toggleSecondaryEmailVisibility: function(formContext) {
        try {
            var hasSecondaryEmailField = formContext.getAttribute("new_hassecondaryemail");
            var secondaryEmailControl = formContext.getControl("new_secondaryemail");
            
            if (!hasSecondaryEmailField || !secondaryEmailControl) {
                console.warn("ContactFormScript: Required fields not found");
                return;
            }

            var hasSecondaryEmail = hasSecondaryEmailField.getValue();
            
            // Handle null/undefined states - default to hidden
            if (hasSecondaryEmail === null || hasSecondaryEmail === undefined) {
                secondaryEmailControl.setVisible(false);
                console.log("ContactFormScript: Checkbox is null/undefined - hiding secondary email field");
            } else if (hasSecondaryEmail === true) {
                // Show secondary email field when checkbox is checked
                secondaryEmailControl.setVisible(true);
                console.log("ContactFormScript: Checkbox checked - showing secondary email field");
            } else {
                // Hide secondary email field when checkbox is unchecked
                secondaryEmailControl.setVisible(false);
                
                // Clear the secondary email value when hiding the field
                var secondaryEmailField = formContext.getAttribute("new_secondaryemail");
                if (secondaryEmailField && secondaryEmailField.getValue()) {
                    secondaryEmailField.setValue(null);
                }
                console.log("ContactFormScript: Checkbox unchecked - hiding secondary email field and clearing value");
            }
        } catch (error) {
            console.error("ContactFormScript.toggleSecondaryEmailVisibility error: ", error);
        }
    },

    /**
     * Validates the secondary email field if it's visible and has a value
     * @param {Object} formContext - The form context
     * @returns {boolean} - True if validation passes, false otherwise
     */
    validateSecondaryEmail: function(formContext) {
        try {
            var hasSecondaryEmailField = formContext.getAttribute("new_hassecondaryemail");
            var secondaryEmailField = formContext.getAttribute("new_secondaryemail");
            var secondaryEmailControl = formContext.getControl("new_secondaryemail");
            
            if (!hasSecondaryEmailField || !secondaryEmailField || !secondaryEmailControl) {
                return true; // Fields not found, skip validation
            }

            var hasSecondaryEmail = hasSecondaryEmailField.getValue();
            var secondaryEmailValue = secondaryEmailField.getValue();
            
            // If checkbox is checked but secondary email is empty, show warning
            if (hasSecondaryEmail === true && (!secondaryEmailValue || secondaryEmailValue.trim() === "")) {
                console.warn("ContactFormScript: Checkbox is checked but secondary email is empty");
                return false;
            }
            
            return true;
        } catch (error) {
            console.error("ContactFormScript.validateSecondaryEmail error: ", error);
            return false;
        }
    }
};