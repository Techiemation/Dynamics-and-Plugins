# Contact Form Configuration Guide

## FRD-UI-001: Secondary Email Field Conditional Visibility

### Overview
This solution implements conditional field visibility in the Dynamics 365 CE Contact form. The "Secondary Email" field is shown/hidden based on the "Has Secondary Email?" checkbox value.

### Field Schema
- **Checkbox Field**: `new_hassecondaryemail` (Two Options)
  - Display Name: "Has Secondary Email?"
  - Required Level: Optional
  - Default Value: No

- **Secondary Email Field**: `new_secondaryemail` (Single Line of Text)
  - Display Name: "Secondary Email"
  - Format: Email
  - Required Level: Optional
  - Initial Visibility: Hidden (controlled by script)

### Form Configuration Steps

#### 1. Add Custom Fields to Contact Entity
```javascript
// Field: Has Secondary Email? (Two Options)
Schema Name: new_hassecondaryemail
Display Name: Has Secondary Email?
Type: Two Options (Yes/No)
Default Value: No

// Field: Secondary Email (Single Line of Text)
Schema Name: new_secondaryemail
Display Name: Secondary Email
Format: Email
Maximum Length: 100
```

#### 2. Form Layout
1. Place "Has Secondary Email?" checkbox in appropriate section
2. Place "Secondary Email" field directly below the checkbox
3. Ensure both fields are in the same section for better UX

#### 3. JavaScript Configuration
1. Upload `ContactFormScript.js` as a Web Resource
2. Add the Web Resource to the Contact form
3. Configure form events:
   - **OnLoad**: `ContactFormScript.onLoad`
   - **Has Secondary Email OnChange**: `ContactFormScript.onHasSecondaryEmailChange`

### Event Configuration
```
Form Events:
├── OnLoad
│   └── Function: ContactFormScript.onLoad
│   └── Enabled: Yes
│   └── Pass execution context: Yes
└── Field Events
    └── new_hassecondaryemail (Has Secondary Email?)
        └── OnChange
            └── Function: ContactFormScript.onHasSecondaryEmailChange
            └── Enabled: Yes
            └── Pass execution context: Yes
```

### Business Logic Rules

#### Primary Rules
1. **Checkbox Checked** → Secondary Email field becomes visible
2. **Checkbox Unchecked** → Secondary Email field becomes hidden and value is cleared
3. **Form Load** → Field visibility set based on stored checkbox value

#### Edge Case Handling
1. **Null/Undefined Checkbox** → Secondary Email field remains hidden
2. **Missing Fields** → Script logs warning and continues safely
3. **Script Errors** → Errors logged to console, form remains functional

### Testing Scenarios

#### Core Test Cases (GPT-Generated)
- [x] Checkbox checked → Secondary Email visible
- [x] Checkbox unchecked → Secondary Email hidden
- [x] Form load with stored values behaves correctly

#### Edge Cases (CodiumAI Enhanced)
- [x] Null checkbox value handling
- [x] Undefined checkbox value handling
- [x] Missing field error handling
- [x] Validation for empty secondary email when checkbox is checked

### Implementation Status
- [x] JavaScript form script created
- [x] Comprehensive test suite implemented
- [x] Error handling and logging added
- [x] Documentation completed
- [x] Field schema defined

### Deployment Checklist
- [ ] Create custom fields in target environment
- [ ] Upload JavaScript web resource
- [ ] Configure form events
- [ ] Test all scenarios in development environment
- [ ] Deploy to production environment
- [ ] Validate functionality in production

### Support and Troubleshooting
- All script actions are logged to browser console
- Check browser console for error messages if issues occur
- Verify field schema names match the script configuration
- Ensure proper security roles for form modification