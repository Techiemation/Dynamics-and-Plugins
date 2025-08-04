# Dynamics 365 CE Account Credit Limit Plugin

This plugin monitors changes to the credit limit field on Account entities in Dynamics 365 Customer Engagement and creates annotation records to log these changes.

## Features

- **Trigger**: Executes on `Update` message for `account` entity
- **Condition**: Only executes when the `creditlimit` field has changed
- **Action**: Creates an `annotation` record linked to the account with old and new values
- **Error Handling**: Comprehensive try-catch blocks with trace logging
- **Null Safety**: Handles missing pre-images and null values gracefully

## Plugin Registration

### Registration Details
- **Message**: Update
- **Entity**: account
- **Stage**: Post-Operation (40)
- **Execution Mode**: Synchronous
- **Pre-Image**: Optional (plugin will retrieve current record if not available)

### Recommended Pre-Image Configuration
- **Name**: PreImage
- **Entity Alias**: PreImage
- **Attributes**: creditlimit

### Steps to Register

1. **Build the Solution**:
   ```bash
   dotnet build
   ```

2. **Deploy the Assembly**:
   - Upload `DynamicsPlugins.dll` to Dynamics 365 CE
   - Register the assembly in the Plugin Registration Tool

3. **Register the Plugin Step**:
   - Create a new step for the `AccountCreditLimitPlugin` class
   - Configure with the registration details above
   - Optionally configure a pre-image for better performance

## Code Structure

### Main Files
- `AccountCreditLimitPlugin.cs`: Main plugin implementation
- `PluginRegistrationAttribute.cs`: Custom attribute for registration metadata
- `Properties/AssemblyInfo.cs`: Assembly metadata

### Key Components
- **IPluginExecutionContext**: Access to execution context and input parameters
- **ITracingService**: Logging and debugging support
- **IOrganizationService**: CRM operations for creating annotations
- **Error Handling**: Comprehensive exception handling with detailed trace logs

## Annotation Format

When a credit limit change is detected, the plugin creates an annotation with:
- **Subject**: "Credit Limit Change"
- **Note Text**: "Credit limit updated from {old value} to {new value}"
- **Linked to**: The account record being updated

Example: "Credit limit updated from $10,000.00 to $15,000.00"

## Requirements

- Dynamics 365 Customer Engagement
- .NET Framework 4.6.2
- Microsoft.CrmSdk.CoreAssemblies NuGet package

## Error Handling

The plugin includes robust error handling:
- Validates input parameters and entity references
- Handles missing pre-images by retrieving current record
- Provides detailed trace logging for debugging
- Throws meaningful exceptions with context information

## Testing

To test the plugin:
1. Register and deploy the plugin
2. Update an Account record's credit limit field
3. Check that an annotation is created with the change details
4. Verify trace logs for debugging information