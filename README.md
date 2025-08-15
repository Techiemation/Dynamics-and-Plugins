# Dynamics-and-Plugins

This repository contains Dynamics 365 CE plugins, form scripts, and related customizations for testing and development purposes.

## 🚀 Current Implementation

### FRD-UI-001: Conditional Field Visibility in Contact Form

**Status**: ✅ **COMPLETED** - All tests passing

Implementation of test-case driven development for conditional field visibility where the "Secondary Email" field is dynamically shown/hidden based on the "Has Secondary Email?" checkbox state.

#### Key Features:
- ✅ 10 comprehensive test cases (all passing)
- ✅ AI-driven test generation and enhancement
- ✅ Robust error handling and edge case coverage
- ✅ Dynamic field visibility with data integrity
- ✅ Production-ready Dynamics 365 CE form script

#### Quick Start:
1. **Run Tests**: Open `tests/TestRunner.html` or run `node tests/run-tests.js`
2. **Review Code**: See `src/Contact/Forms/Scripts/ContactFormScript.js`
3. **Documentation**: Check `docs/ContactFormScript-README.md`

## 📁 Repository Structure

```
├── src/                    # Source code
│   └── Contact/
│       └── Forms/
│           ├── Scripts/    # Form JavaScript files
│           └── ContactFormConfiguration.xml
├── tests/                  # Test suites and runners
│   ├── ContactFormScript.test.js
│   ├── TestRunner.html
│   └── run-tests.js
└── docs/                   # Documentation
    └── ContactFormScript-README.md
```

## 🧪 Testing Approach

Following the AI-driven test methodology shown in the requirements diagram:

1. **Functional Requirement** → FRD-UI-001
2. **Auto-Generated Tests** → 10 comprehensive test cases
3. **Edge Cases Added** → Null/undefined states, missing controls
4. **Code Implementation** → Conditional visibility logic
5. **Validation** → All tests pass ✅

## 🎯 Acceptance Criteria Met

- [x] Test cases auto-generated and reviewed
- [x] Code passes all AI-generated and custom edge tests
- [x] Verified dynamic behavior on Contact form
- [x] Delivered as per FRD-UI-001 requirements
- [x] Secure, reliable, and maintainable implementation

---

*For detailed implementation information, see the documentation in the `docs/` folder.*
