# Dynamics 365 CE Plugins

This repository contains Dynamics 365 Customer Engagement (CE) plugins for tracking and logging business process changes.

## Account Credit Limit Plugin

A plugin that monitors changes to the credit limit field on Account entities and automatically creates annotation records to log these changes.

### Features

- **Trigger**: Executes on `Update` message for `account` entity
- **Condition**: Only executes when the `creditlimit` field has changed
- **Action**: Creates an `annotation` record linked to the account with old and new values
- **Error Handling**: Comprehensive try-catch blocks with trace logging
- **Null Safety**: Handles missing pre-images and null values gracefully

### Getting Started

1. **Build the Project**:
   ```bash
   dotnet build
   ```

2. **Deploy the Assembly**:
   - Upload `DynamicsPlugins.dll` from `DynamicsPlugins/bin/Debug/net462/` to Dynamics 365 CE
   - Register the assembly using the Plugin Registration Tool

3. **Register the Plugin Step**:
   - Create a new step for the `AccountCreditLimitPlugin` class
   - Configure for Update message on account entity in Post-Operation stage
   - Optionally configure a pre-image named "PreImage" with creditlimit attribute

### Plugin Registration Details

- **Message**: Update
- **Entity**: account  
- **Stage**: Post-Operation (40)
- **Execution Mode**: Synchronous
- **Pre-Image**: Optional (recommended for performance)
  - **Name**: PreImage
  - **Entity Alias**: PreImage  
  - **Attributes**: creditlimit

### Example Output

When a credit limit is changed, the plugin creates an annotation with:
- **Subject**: "Credit Limit Change"
- **Note Text**: "Credit limit updated from $10,000.00 to $15,000.00"
- **Linked to**: The account record being updated

## Project Structure

```
├── DynamicsPlugins/
│   ├── AccountCreditLimitPlugin.cs          # Main plugin implementation
│   ├── PluginRegistrationAttribute.cs       # Registration metadata attribute
│   ├── Properties/
│   │   └── AssemblyInfo.cs                  # Assembly metadata
│   ├── DynamicsPlugins.csproj               # Project file
│   └── README.md                            # Detailed plugin documentation
├── DynamicsPlugins.sln                      # Solution file
├── .gitignore                               # Git ignore rules
└── README.md                                # This file
```

## Requirements

- Dynamics 365 Customer Engagement
- .NET Framework 4.6.2
- Microsoft.CrmSdk.CoreAssemblies NuGet package (9.0.2.46)

## Development

This project uses:
- **Visual Studio** or **Visual Studio Code** for development
- **.NET Framework 4.6.2** for compatibility with Dynamics 365 CE
- **Microsoft CRM SDK** for Dynamics 365 integration

## Contributing

When contributing to this repository:
1. Follow existing code patterns and naming conventions
2. Include proper error handling and trace logging
3. Update documentation for any new plugins
4. Test thoroughly in a Dynamics 365 CE environment
