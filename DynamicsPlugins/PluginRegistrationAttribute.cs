using System;

namespace DynamicsPlugins
{
    /// <summary>
    /// Plugin registration attribute for documentation purposes
    /// This attribute provides metadata about how the plugin should be registered
    /// </summary>
    [AttributeUsage(AttributeTargets.Class)]
    public class PluginRegistrationAttribute : Attribute
    {
        public string MessageName { get; set; }
        public string EntityLogicalName { get; set; }
        public StageEnum Stage { get; set; }
        public ExecutionModeEnum ExecutionMode { get; set; }
    }

    /// <summary>
    /// Plugin execution stage
    /// </summary>
    public enum StageEnum
    {
        PreValidation = 10,
        PreOperation = 20,
        PostOperation = 40
    }

    /// <summary>
    /// Plugin execution mode
    /// </summary>
    public enum ExecutionModeEnum
    {
        Synchronous = 0,
        Asynchronous = 1
    }
}