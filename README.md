# Dynamics 365 CE Contact Form - Conditional Field Visibility

## 🎯 Overview

This repository implements **FRD-UI-001**: AI-Driven Test Case Based Development for conditional field visibility in Dynamics 365 CE Contact forms. The solution demonstrates a modern approach to CRM development using GPT, CodiumAI, and GitHub Copilot for test-driven development.

## 📋 Requirement: FRD-UI-001

**Title**: Show/Hide "Secondary Email" Field Based on "Has Secondary Email?" Option  
**Module**: Contact Entity (Main Form)  
**Business Priority**: Medium  

### Functional Behavior
- ✅ When "Has Secondary Email?" checkbox is **checked** → "Secondary Email" field becomes **visible**
- ✅ When "Has Secondary Email?" checkbox is **unchecked** → "Secondary Email" field becomes **hidden** and value is cleared
- ✅ Form loads with correct field visibility based on stored values
- ✅ Handles edge cases: null values, missing fields, validation errors

## 🧪 AI-Driven Testing Methodology

This project follows the AI-driven testing flow shown in the requirement diagram:

1. **GPT Generated Test Cases** ✅
   - Checkbox checked → Secondary Email visible
   - Checkbox unchecked → Secondary Email hidden  
   - Form load with stored values

2. **CodiumAI Enhanced Edge Cases** ✅
   - Null/undefined checkbox states
   - Missing field error handling
   - Validation scenarios

3. **GitHub Copilot Code Suggestions** ✅
   - Form script implementation
   - Error handling patterns
   - Event management

## 📁 Project Structure

```
├── src/
│   └── Contact/
│       └── FormScripts/
│           └── ContactFormScript.js      # Main form script
├── tests/
│   ├── Contact/
│   │   └── ContactFormScript.test.js     # Comprehensive test suite
│   └── helpers/
│       └── testHelper.js                 # Test utilities
├── docs/
│   └── ContactFormConfiguration.md      # Configuration guide
├── package.json                         # Project configuration
└── README.md                           # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Dynamics 365 CE environment
- Node.js (for testing)
- npm (for dependency management)

### Development Setup
```bash
# Clone the repository
git clone https://github.com/Techiemation/Dynamics-and-Plugins.git
cd Dynamics-and-Plugins

# Install dependencies
npm install

# Run tests
npm test

# Run linting
npm run lint
```

## ⚙️ Dynamics 365 Configuration

### 1. Create Custom Fields

**Has Secondary Email Field:**
- Schema Name: `new_hassecondaryemail`
- Type: Two Options (Yes/No)
- Default Value: No

**Secondary Email Field:**
- Schema Name: `new_secondaryemail`
- Type: Single Line of Text
- Format: Email

### 2. Upload JavaScript Web Resource
1. Upload `ContactFormScript.js` as a new Web Resource
2. Set Web Resource type to "Script (JScript)"
3. Save and publish

### 3. Configure Form Events
1. Open Contact main form for editing
2. Add the Web Resource to form libraries
3. Configure events:
   - **Form OnLoad**: `ContactFormScript.onLoad`
   - **Has Secondary Email OnChange**: `ContactFormScript.onHasSecondaryEmailChange`
4. Save and publish form

## 🧪 Testing

### Test Coverage
- **16 test cases** covering all scenarios
- **Core functionality tests** (GPT-generated)
- **Edge case tests** (CodiumAI-enhanced)
- **Error handling tests**
- **Event handler tests**

### Running Tests
```bash
npm test        # Run all tests
npm run lint    # Check code quality
```

### Test Results
```
16 specs, 0 failures
✅ All tests passing
```

## 📊 Test Scenarios Validated

### ✅ Core Test Cases (GPT-Generated)
- [x] Checkbox checked → Secondary Email visible
- [x] Checkbox unchecked → Secondary Email hidden
- [x] Form load with previously stored values (checked)
- [x] Form load with previously stored values (unchecked)

### ✅ Edge Cases (CodiumAI Enhanced)
- [x] Null checkbox value handling
- [x] Undefined checkbox value handling
- [x] Missing checkbox field error handling
- [x] Missing secondary email control error handling
- [x] Validation: checkbox checked but secondary email empty
- [x] Validation: checkbox checked with valid secondary email
- [x] Validation: checkbox unchecked with any secondary email value

### ✅ Event Handler Tests
- [x] OnChange event calls toggle function
- [x] OnChange event error handling

### ✅ Error Handling Tests
- [x] Form load error handling
- [x] Toggle visibility error handling
- [x] Validation error handling

## 🔧 Technical Implementation

### JavaScript Functions
- `onLoad()` - Initializes form and sets up event handlers
- `onHasSecondaryEmailChange()` - Handles checkbox change events
- `toggleSecondaryEmailVisibility()` - Core visibility logic
- `validateSecondaryEmail()` - Validation helper

### Error Handling
- All errors logged to browser console
- Graceful degradation if fields are missing
- Comprehensive validation for edge cases

## 📝 Documentation

- [Configuration Guide](docs/ContactFormConfiguration.md) - Detailed setup instructions
- JSDoc comments throughout codebase
- Test specifications with clear scenarios

## ✅ Acceptance Criteria Status

- [x] Test cases are auto-generated and reviewed
- [x] Code passes all AI-generated and custom edge tests  
- [x] Verified dynamic behavior on the main Contact form
- [x] Delivered as per requested requirement (FRD-UI-001)
- [x] Secure, reliable, and maintainable field visibility logic
- [x] AI-driven tools used: GPT (test generation), CodiumAI (edge cases), GitHub Copilot (code suggestions)

## 🚀 Deployment

1. Create custom fields in target environment
2. Upload JavaScript web resource
3. Configure form events
4. Test in development environment
5. Deploy to production
6. Validate functionality

## 🐛 Troubleshooting

- Check browser console for error messages
- Verify field schema names match configuration
- Ensure proper security roles for form modification
- Validate web resource is properly loaded

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

This project demonstrates AI-driven development practices. Contributions should follow the established testing patterns and maintain the high test coverage standard.

---

**Built with AI-Driven Test Case Based Development** 🤖  
*GPT + CodiumAI + GitHub Copilot = Secure, Reliable, Maintainable Code*
