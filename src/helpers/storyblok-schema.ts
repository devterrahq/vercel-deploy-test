import { z } from 'zod';

/*
 * Event Schema
 * https://www.storyblok.com/docs/guide/in-depth/webhooks
 *
 * Triggers
 * 1. Story
 *    - published
 *    - unpublished
 *    - deleted
 *    - moved
 * 2. Datasource
 *    - entries_updated
 *    - datasource_entry_saved (legacy)
 * 3. Asset
 *    - created
 *    - replaced
 *    - deleted
 *    - restored
 * 4. User management
 *    - added
 *    - removed
 *    - roles_updated
 * 5. Workflow
 *    - stage.changed
 *    - workflow_stage_changed (legacy)
 * 6. Pipeline
 *    - deployed
 *    - branch_deployed (legacy)
 * 7. Releases
 *    - merged
 *    - release_merged (legacy)
 * 8. Tasks
 *    - task_execution (without dialog values)
 *    - task_execution (with dialog values)
 */
const BaseEventSchema = z.object({
  text: z.string(),
  action: z.string(),
  space_id: z.number(),
});

// === Story Triggered Events === //
const StoryPublishedEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('published'),
    story_id: z.number(),
    full_slug: z.string(),
  }),
);
const StoryUnpublishedEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('unpublished'),
    story_id: z.number(),
    full_slug: z.string(),
  }),
);
const StoryDeletedEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('deleted'),
    story_id: z.number(),
    full_slug: z.string(),
  }),
);
const StoryMovedEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('moved'),
    story_id: z.number(),
    full_slug: z.string(),
  }),
);

// === Datasource Triggered Events === //
const DatasourceEntriesUpdatedEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('entries_updated'),
    datasource_slug: z.string(),
  }),
);
const DatasourceEntrySavedEventLegacySchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('datasource_entry_saved'),
    datasource_slug: z.string(),
  }),
);

// === Asset Triggered Events === //
const AssetCreatedEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('created'),
    asset_id: z.number(),
  }),
);
const AssetReplacedEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('replaced'),
    asset_id: z.number(),
  }),
);
const AssetRestoredEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('restored'),
    asset_id: z.number(),
  }),
);
const AssetDeletedEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('deleted'),
    asset_id: z.number(),
  }),
);

// === User Management Triggered Events === //
const UserAddedEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('added'),
    user_id: z.number(),
  }),
);
const UserRemovedEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('removed'),
    user_id: z.number(),
  }),
);
const UserRolesUpdatedEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('roles_updated'),
    user_id: z.number(),
  }),
);

// === Workflow Triggered Events === //
const WorkflowStageChangedEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('stage.changed'),
    story_id: z.number(),
    workflow_name: z.string(),
    workflow_stage_name: z.string(),
  }),
);
const WorkflowStageChangedLegacyEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('workflow_stage_changed'),
    story_id: z.number(),
    workflow_name: z.string(),
    workflow_stage_name: z.string(),
  }),
);

// === Pipeline Triggered Events === //
const PipelineDeployedEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('deployed'),
    branch_id: z.number(),
  }),
);
const PipelineBranchDeployedEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('branch_deployed'),
    branch_id: z.number(),
  }),
);

// === Releases Triggered Events === //
const ReleaseMergedEventSchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('merged'),
    release_id: z.number(),
  }),
);
const ReleaseMergedEventLegacySchema = BaseEventSchema.merge(
  z.object({
    action: z.literal('release_merged'),
    release_id: z.number(),
  }),
);

// === Tasks Triggered Events === //
const TaskSchema = z.object({
  id: z.number(),
  name: z.string(),
});
const DialogValuesSchema = z.object({
  name: z.string().optional(),
  environment: z.string().optional(),
});
const TaskExecutionEventSchemaWithoutDialogValues = BaseEventSchema.merge(
  z.object({
    action: z.literal('task_execution'),
    task: TaskSchema,
    dialog_values: z.null(),
  }),
);
const TaskExecutionEventSchemaWithDialogValues = BaseEventSchema.merge(
  z.object({
    action: z.literal('task_execution'),
    task: TaskSchema,
    dialog_values: DialogValuesSchema,
  }),
);

export const EventSchema = z.union([
  // Story Triggered Events
  StoryPublishedEventSchema,
  StoryUnpublishedEventSchema,
  StoryDeletedEventSchema,
  StoryMovedEventSchema,

  // Datasource Triggered Events
  DatasourceEntriesUpdatedEventSchema,
  DatasourceEntrySavedEventLegacySchema,

  // Asset Triggered Events
  AssetCreatedEventSchema,
  AssetReplacedEventSchema,
  AssetRestoredEventSchema,
  AssetDeletedEventSchema,

  // User Management Triggered Events
  UserAddedEventSchema,
  UserRemovedEventSchema,
  UserRolesUpdatedEventSchema,

  // Workflow Triggered Events
  WorkflowStageChangedEventSchema,
  WorkflowStageChangedLegacyEventSchema,

  // Pipeline Triggered Events
  PipelineDeployedEventSchema,
  PipelineBranchDeployedEventSchema,

  // Releases Triggered Events
  ReleaseMergedEventSchema,
  ReleaseMergedEventLegacySchema,

  // Tasks Triggered Events
  TaskExecutionEventSchemaWithoutDialogValues,
  TaskExecutionEventSchemaWithDialogValues,
]);

/**
 * Storyblok Response Schema
 */
export const StoryblokErrorSchema = z.object({
  message: z.string(),
  status: z.number(),
  response: z.string(),
});
