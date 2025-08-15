/**
 * Contact Form Script for Conditional Field Visibility
 * Requirement: FRD-UI-001 - Show/Hide "Secondary Email" Field Based on "Has Secondary Email?" Option
 * 
 * This script handles the conditional visibility of the Secondary Email field
 * based on the Has Secondary Email checkbox value.
 */

if (typeof ContactFormScript === "undefined") {
    ContactFormScript = {};
}

ContactFormScript.FormEvents = {
    /**
     * Form OnLoad event handler
     * @param {Object} executionContext - The execution context
     */
    onLoad: function(executionContext) {
        try {
            var formContext = executionContext.getFormContext();
            
            // Set up initial visibility based on current checkbox value
            ContactFormScript.FieldLogic.updateSecondaryEmailVisibility(formContext);
            
            // Add event handler for checkbox changes
            var hasSecondaryEmailField = formContext.getAttribute("new_hassecondaryemail");
            if (hasSecondaryEmailField) {
                hasSecondaryEmailField.addOnChange(ContactFormScript.FieldLogic.onHasSecondaryEmailChange);
            }
            
        } catch (error) {
            console.error("Error in ContactFormScript.FormEvents.onLoad: ", error);
        }
    }
};

ContactFormScript.FieldLogic = {
    /**
     * Event handler for Has Secondary Email checkbox change
     * @param {Object} executionContext - The execution context
     */
    onHasSecondaryEmailChange: function(executionContext) {
        try {
            var formContext = executionContext.getFormContext();
            ContactFormScript.FieldLogic.updateSecondaryEmailVisibility(formContext);
        } catch (error) {
            console.error("Error in ContactFormScript.FieldLogic.onHasSecondaryEmailChange: ", error);
        }
    },

    /**
     * Updates the visibility of the Secondary Email field based on checkbox value
     * @param {Object} formContext - The form context
     */
    updateSecondaryEmailVisibility: function(formContext) {
        try {
            var hasSecondaryEmailAttribute = formContext.getAttribute("new_hassecondaryemail");
            var secondaryEmailControl = formContext.getControl("new_secondaryemail");
            
            if (!secondaryEmailControl) {
                console.warn("Secondary Email control not found on the form");
                return;
            }

            var isVisible = false;
            
            // Handle different states of the checkbox
            if (hasSecondaryEmailAttribute) {
                var checkboxValue = hasSecondaryEmailAttribute.getValue();
                
                // Show field only if checkbox is explicitly checked (true)
                // Hide for false, null, or undefined values
                isVisible = checkboxValue === true;
            }

            // Set visibility
            secondaryEmailControl.setVisible(isVisible);
            
            // Clear secondary email value when hiding the field
            if (!isVisible) {
                var secondaryEmailAttribute = formContext.getAttribute("new_secondaryemail");
                if (secondaryEmailAttribute && secondaryEmailAttribute.getValue()) {
                    secondaryEmailAttribute.setValue(null);
                }
            }
            
        } catch (error) {
            console.error("Error in ContactFormScript.FieldLogic.updateSecondaryEmailVisibility: ", error);
        }
    }
};