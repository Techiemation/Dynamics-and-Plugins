using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace DynamicsPlugins
{
    /// <summary>
    /// Plugin that logs credit limit changes on Account entity updates
    /// </summary>
    [PluginRegistration(
        MessageName = "Update",
        EntityLogicalName = "account",
        Stage = StageEnum.PostOperation,
        ExecutionMode = ExecutionModeEnum.Synchronous)]
    public class AccountCreditLimitPlugin : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            // Get the execution context from the service provider
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            
            // Get the tracing service
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            
            // Get the organization service factory
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            
            // Get the organization service
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            try
            {
                tracingService.Trace("AccountCreditLimitPlugin: Started execution");

                // Validate context inputs
                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {
                    Entity target = (Entity)context.InputParameters["Target"];
                    
                    tracingService.Trace("AccountCreditLimitPlugin: Target entity retrieved");

                    // Check if creditlimit field is being updated
                    if (target.Contains("creditlimit"))
                    {
                        tracingService.Trace("AccountCreditLimitPlugin: Credit limit field is being updated");

                        // Get the pre-image to compare old value
                        Entity preImage = null;
                        if (context.PreEntityImages.Contains("PreImage"))
                        {
                            preImage = context.PreEntityImages["PreImage"];
                            tracingService.Trace("AccountCreditLimitPlugin: Pre-image retrieved");
                        }
                        else
                        {
                            tracingService.Trace("AccountCreditLimitPlugin: No pre-image available, retrieving current record");
                            // If no pre-image, retrieve the current record
                            preImage = service.Retrieve("account", target.Id, new ColumnSet("creditlimit"));
                        }

                        // Get old and new credit limit values
                        Money oldCreditLimit = preImage?.GetAttributeValue<Money>("creditlimit");
                        Money newCreditLimit = target.GetAttributeValue<Money>("creditlimit");

                        // Format values for display (handle null values)
                        string oldValue = oldCreditLimit?.Value.ToString("C") ?? "Not Set";
                        string newValue = newCreditLimit?.Value.ToString("C") ?? "Not Set";

                        tracingService.Trace($"AccountCreditLimitPlugin: Old value: {oldValue}, New value: {newValue}");

                        // Only create annotation if values are different
                        if ((oldCreditLimit?.Value ?? 0) != (newCreditLimit?.Value ?? 0))
                        {
                            // Create annotation (note) record
                            Entity annotation = new Entity("annotation");
                            annotation["objectid"] = new EntityReference("account", target.Id);
                            annotation["objecttypecode"] = "account";
                            annotation["subject"] = "Credit Limit Change";
                            annotation["notetext"] = $"Credit limit updated from {oldValue} to {newValue}";
                            annotation["filename"] = "Credit Limit Change Log";
                            
                            Guid annotationId = service.Create(annotation);
                            
                            tracingService.Trace($"AccountCreditLimitPlugin: Annotation created with ID: {annotationId}");
                        }
                        else
                        {
                            tracingService.Trace("AccountCreditLimitPlugin: Credit limit values are the same, no annotation created");
                        }
                    }
                    else
                    {
                        tracingService.Trace("AccountCreditLimitPlugin: Credit limit field is not being updated");
                    }
                }
                else
                {
                    tracingService.Trace("AccountCreditLimitPlugin: Target entity is not available or invalid");
                    throw new InvalidPluginExecutionException("Target entity is required for this plugin");
                }

                tracingService.Trace("AccountCreditLimitPlugin: Execution completed successfully");
            }
            catch (Exception ex)
            {
                tracingService.Trace($"AccountCreditLimitPlugin: Error occurred - {ex.Message}");
                tracingService.Trace($"AccountCreditLimitPlugin: Stack trace - {ex.StackTrace}");
                
                throw new InvalidPluginExecutionException($"An error occurred in AccountCreditLimitPlugin: {ex.Message}", ex);
            }
        }
    }
}