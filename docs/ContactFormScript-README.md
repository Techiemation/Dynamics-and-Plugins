# Contact Form Script - Conditional Field Visibility

**Requirement ID**: FRD-UI-001  
**Title**: Show/Hide "Secondary Email" Field Based on "Has Secondary Email?" Option  
**Module**: Contact Entity (Main Form)  

## 📋 Implementation Overview

This implementation provides conditional field visibility functionality for the Contact form in Dynamics 365 CE, where the "Secondary Email" field is dynamically shown or hidden based on the state of the "Has Secondary Email?" checkbox.

## 🧪 Test-Case Driven Development

Following AI-driven methodology, this implementation includes:

### ✅ Comprehensive Test Coverage
- **Basic Functionality**: Checkbox checked/unchecked behavior
- **Form Load Scenarios**: Proper initialization with existing data
- **Edge Cases**: Null, undefined, and missing control handling
- **Dynamic Updates**: Real-time visibility changes
- **Data Integrity**: Automatic clearing of hidden field values

### 🚀 Test Execution

#### Browser Testing
Open `tests/TestRunner.html` in a web browser to run interactive tests with visual results.

#### Command Line Testing
```bash
node tests/run-tests.js
```

## 📁 File Structure

```
src/
└── Contact/
    └── Forms/
        └── Scripts/
            └── ContactFormScript.js    # Main implementation
tests/
├── ContactFormScript.test.js          # Test suite
├── TestRunner.html                     # Browser test runner
└── run-tests.js                        # Node.js test runner
```

## 🔧 Implementation Details

### Field Names
- **Checkbox Field**: `new_hassecondaryemail`
- **Secondary Email Field**: `new_secondaryemail`

### Key Features
1. **Dynamic Visibility**: Field shows only when checkbox is explicitly `true`
2. **Data Integrity**: Secondary email is cleared when field is hidden
3. **Error Handling**: Graceful handling of missing controls
4. **Event Management**: Proper onChange event registration

### Event Handlers
- `ContactFormScript.FormEvents.onLoad()` - Form initialization
- `ContactFormScript.FieldLogic.onHasSecondaryEmailChange()` - Checkbox change handler
- `ContactFormScript.FieldLogic.updateSecondaryEmailVisibility()` - Core visibility logic

## 🎯 Acceptance Criteria Status

- [x] Test cases are auto-generated and reviewed
- [x] Code passes all AI-generated and custom edge tests  
- [x] Implementation provides dynamic behavior for field visibility
- [x] Delivered as per requested requirement (FRD-UI-001)
- [x] Secure, reliable, and maintainable behavior
- [x] Handles null/default states gracefully

## 📊 Test Results

All 10 test cases validate the implementation:

1. ✅ Checkbox checked shows Secondary Email field
2. ✅ Checkbox unchecked hides Secondary Email field
3. ✅ Form load with checkbox checked shows field
4. ✅ Form load with checkbox unchecked hides field
5. ✅ Checkbox null value hides field
6. ✅ Checkbox undefined value hides field
7. ✅ Secondary email cleared when field hidden
8. ✅ onChange event handler registration
9. ✅ Dynamic checkbox change updates visibility
10. ✅ Missing control handles gracefully

## 🔄 Integration Instructions

1. **Upload Script**: Deploy `ContactFormScript.js` to Dynamics 365 CE as a web resource
2. **Form Configuration**: 
   - Add the script to the Contact form's Form Properties
   - Set `ContactFormScript.FormEvents.onLoad` as the OnLoad handler
3. **Field Setup**: Ensure both fields (`new_hassecondaryemail` and `new_secondaryemail`) exist on the form
4. **Test**: Verify functionality in the Dynamics 365 CE environment

## 🛡️ Security & Performance

- No external dependencies
- Minimal DOM manipulation
- Comprehensive error handling
- Optimized for Dynamics 365 CE performance standards