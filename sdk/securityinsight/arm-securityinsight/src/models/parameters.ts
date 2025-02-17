/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter
} from "@azure/core-client";
import {
  AlertRule as AlertRuleMapper,
  ActionRequest as ActionRequestMapper,
  AutomationRule as AutomationRuleMapper,
  ManualTriggerRequestBody as ManualTriggerRequestBodyMapper,
  Incident as IncidentMapper,
  TeamProperties as TeamPropertiesMapper,
  Bookmark as BookmarkMapper,
  Relation as RelationMapper,
  BookmarkExpandParameters as BookmarkExpandParametersMapper,
  EntityExpandParameters as EntityExpandParametersMapper,
  EntityGetInsightsParameters as EntityGetInsightsParametersMapper,
  EntityTimelineParameters as EntityTimelineParametersMapper,
  CustomEntityQuery as CustomEntityQueryMapper,
  FileImport as FileImportMapper,
  IncidentComment as IncidentCommentMapper,
  MetadataModel as MetadataModelMapper,
  MetadataPatch as MetadataPatchMapper,
  SentinelOnboardingState as SentinelOnboardingStateMapper,
  SecurityMLAnalyticsSetting as SecurityMLAnalyticsSettingMapper,
  Settings as SettingsMapper,
  SourceControl as SourceControlMapper,
  ThreatIntelligenceIndicatorModel as ThreatIntelligenceIndicatorModelMapper,
  ThreatIntelligenceFilteringCriteria as ThreatIntelligenceFilteringCriteriaMapper,
  ThreatIntelligenceAppendTags as ThreatIntelligenceAppendTagsMapper,
  Watchlist as WatchlistMapper,
  WatchlistItem as WatchlistItemMapper,
  DataConnector as DataConnectorMapper,
  DataConnectorConnectBody as DataConnectorConnectBodyMapper,
  DataConnectorsCheckRequirements as DataConnectorsCheckRequirementsMapper
} from "../models/mappers.js";

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const $host: OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2022-09-01-preview",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};

export const subscriptionId: OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    constraints: {
      MinLength: 1
    },
    serializedName: "subscriptionId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const resourceGroupName: OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    constraints: {
      MaxLength: 90,
      MinLength: 1
    },
    serializedName: "resourceGroupName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const workspaceName: OperationURLParameter = {
  parameterPath: "workspaceName",
  mapper: {
    constraints: {
      MaxLength: 90,
      MinLength: 1
    },
    serializedName: "workspaceName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const ruleId: OperationURLParameter = {
  parameterPath: "ruleId",
  mapper: {
    serializedName: "ruleId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const alertRule: OperationParameter = {
  parameterPath: "alertRule",
  mapper: AlertRuleMapper
};

export const nextLink: OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const actionId: OperationURLParameter = {
  parameterPath: "actionId",
  mapper: {
    serializedName: "actionId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const action: OperationParameter = {
  parameterPath: "action",
  mapper: ActionRequestMapper
};

export const alertRuleTemplateId: OperationURLParameter = {
  parameterPath: "alertRuleTemplateId",
  mapper: {
    serializedName: "alertRuleTemplateId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const automationRuleId: OperationURLParameter = {
  parameterPath: "automationRuleId",
  mapper: {
    serializedName: "automationRuleId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const automationRuleToUpsert: OperationParameter = {
  parameterPath: ["options", "automationRuleToUpsert"],
  mapper: AutomationRuleMapper
};

export const requestBody: OperationParameter = {
  parameterPath: ["options", "requestBody"],
  mapper: ManualTriggerRequestBodyMapper
};

export const incidentIdentifier: OperationURLParameter = {
  parameterPath: "incidentIdentifier",
  mapper: {
    serializedName: "incidentIdentifier",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const filter: OperationQueryParameter = {
  parameterPath: ["options", "filter"],
  mapper: {
    serializedName: "$filter",
    type: {
      name: "String"
    }
  }
};

export const orderby: OperationQueryParameter = {
  parameterPath: ["options", "orderby"],
  mapper: {
    serializedName: "$orderby",
    type: {
      name: "String"
    }
  }
};

export const top: OperationQueryParameter = {
  parameterPath: ["options", "top"],
  mapper: {
    serializedName: "$top",
    type: {
      name: "Number"
    }
  }
};

export const skipToken: OperationQueryParameter = {
  parameterPath: ["options", "skipToken"],
  mapper: {
    serializedName: "$skipToken",
    type: {
      name: "String"
    }
  }
};

export const incidentId: OperationURLParameter = {
  parameterPath: "incidentId",
  mapper: {
    serializedName: "incidentId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const incident: OperationParameter = {
  parameterPath: "incident",
  mapper: IncidentMapper
};

export const teamProperties: OperationParameter = {
  parameterPath: "teamProperties",
  mapper: TeamPropertiesMapper
};

export const bookmarkId: OperationURLParameter = {
  parameterPath: "bookmarkId",
  mapper: {
    serializedName: "bookmarkId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const bookmark: OperationParameter = {
  parameterPath: "bookmark",
  mapper: BookmarkMapper
};

export const relationName: OperationURLParameter = {
  parameterPath: "relationName",
  mapper: {
    serializedName: "relationName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const relation: OperationParameter = {
  parameterPath: "relation",
  mapper: RelationMapper
};

export const parameters: OperationParameter = {
  parameterPath: "parameters",
  mapper: BookmarkExpandParametersMapper
};

export const ipAddress: OperationQueryParameter = {
  parameterPath: "ipAddress",
  mapper: {
    serializedName: "ipAddress",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const domain: OperationQueryParameter = {
  parameterPath: "domain",
  mapper: {
    serializedName: "domain",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const entityId: OperationURLParameter = {
  parameterPath: "entityId",
  mapper: {
    serializedName: "entityId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters1: OperationParameter = {
  parameterPath: "parameters",
  mapper: EntityExpandParametersMapper
};

export const kind: OperationQueryParameter = {
  parameterPath: "kind",
  mapper: {
    serializedName: "kind",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters2: OperationParameter = {
  parameterPath: "parameters",
  mapper: EntityGetInsightsParametersMapper
};

export const parameters3: OperationParameter = {
  parameterPath: "parameters",
  mapper: EntityTimelineParametersMapper
};

export const kind1: OperationQueryParameter = {
  parameterPath: ["options", "kind"],
  mapper: {
    serializedName: "kind",
    type: {
      name: "String"
    }
  }
};

export const entityQueryId: OperationURLParameter = {
  parameterPath: "entityQueryId",
  mapper: {
    serializedName: "entityQueryId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const entityQuery: OperationParameter = {
  parameterPath: "entityQuery",
  mapper: CustomEntityQueryMapper
};

export const kind2: OperationQueryParameter = {
  parameterPath: ["options", "kind"],
  mapper: {
    defaultValue: "Activity",
    isConstant: true,
    serializedName: "kind",
    type: {
      name: "String"
    }
  }
};

export const entityQueryTemplateId: OperationURLParameter = {
  parameterPath: "entityQueryTemplateId",
  mapper: {
    serializedName: "entityQueryTemplateId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const fileImportId: OperationURLParameter = {
  parameterPath: "fileImportId",
  mapper: {
    serializedName: "fileImportId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const fileImport: OperationParameter = {
  parameterPath: "fileImport",
  mapper: FileImportMapper
};

export const incidentCommentId: OperationURLParameter = {
  parameterPath: "incidentCommentId",
  mapper: {
    serializedName: "incidentCommentId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const incidentComment: OperationParameter = {
  parameterPath: "incidentComment",
  mapper: IncidentCommentMapper
};

export const skip: OperationQueryParameter = {
  parameterPath: ["options", "skip"],
  mapper: {
    serializedName: "$skip",
    type: {
      name: "Number"
    }
  }
};

export const metadataName: OperationURLParameter = {
  parameterPath: "metadataName",
  mapper: {
    serializedName: "metadataName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const metadata: OperationParameter = {
  parameterPath: "metadata",
  mapper: MetadataModelMapper
};

export const metadataPatch: OperationParameter = {
  parameterPath: "metadataPatch",
  mapper: MetadataPatchMapper
};

export const consentId: OperationURLParameter = {
  parameterPath: "consentId",
  mapper: {
    serializedName: "consentId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const sentinelOnboardingStateName: OperationURLParameter = {
  parameterPath: "sentinelOnboardingStateName",
  mapper: {
    serializedName: "sentinelOnboardingStateName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const sentinelOnboardingStateParameter: OperationParameter = {
  parameterPath: ["options", "sentinelOnboardingStateParameter"],
  mapper: SentinelOnboardingStateMapper
};

export const settingsResourceName: OperationURLParameter = {
  parameterPath: "settingsResourceName",
  mapper: {
    serializedName: "settingsResourceName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const securityMLAnalyticsSetting: OperationParameter = {
  parameterPath: "securityMLAnalyticsSetting",
  mapper: SecurityMLAnalyticsSettingMapper
};

export const settingsName: OperationURLParameter = {
  parameterPath: "settingsName",
  mapper: {
    serializedName: "settingsName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const settings: OperationParameter = {
  parameterPath: "settings",
  mapper: SettingsMapper
};

export const repoType: OperationParameter = {
  parameterPath: "repoType",
  mapper: {
    serializedName: "repoType",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const sourceControlId: OperationURLParameter = {
  parameterPath: "sourceControlId",
  mapper: {
    serializedName: "sourceControlId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const sourceControl: OperationParameter = {
  parameterPath: "sourceControl",
  mapper: SourceControlMapper
};

export const threatIntelligenceProperties: OperationParameter = {
  parameterPath: "threatIntelligenceProperties",
  mapper: ThreatIntelligenceIndicatorModelMapper
};

export const name: OperationURLParameter = {
  parameterPath: "name",
  mapper: {
    serializedName: "name",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const threatIntelligenceFilteringCriteria: OperationParameter = {
  parameterPath: "threatIntelligenceFilteringCriteria",
  mapper: ThreatIntelligenceFilteringCriteriaMapper
};

export const threatIntelligenceAppendTags: OperationParameter = {
  parameterPath: "threatIntelligenceAppendTags",
  mapper: ThreatIntelligenceAppendTagsMapper
};

export const threatIntelligenceReplaceTags: OperationParameter = {
  parameterPath: "threatIntelligenceReplaceTags",
  mapper: ThreatIntelligenceIndicatorModelMapper
};

export const watchlistAlias: OperationURLParameter = {
  parameterPath: "watchlistAlias",
  mapper: {
    serializedName: "watchlistAlias",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const watchlist: OperationParameter = {
  parameterPath: "watchlist",
  mapper: WatchlistMapper
};

export const watchlistItemId: OperationURLParameter = {
  parameterPath: "watchlistItemId",
  mapper: {
    serializedName: "watchlistItemId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const watchlistItem: OperationParameter = {
  parameterPath: "watchlistItem",
  mapper: WatchlistItemMapper
};

export const dataConnectorId: OperationURLParameter = {
  parameterPath: "dataConnectorId",
  mapper: {
    serializedName: "dataConnectorId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const dataConnector: OperationParameter = {
  parameterPath: "dataConnector",
  mapper: DataConnectorMapper
};

export const connectBody: OperationParameter = {
  parameterPath: "connectBody",
  mapper: DataConnectorConnectBodyMapper
};

export const dataConnectorsCheckRequirements: OperationParameter = {
  parameterPath: "dataConnectorsCheckRequirements",
  mapper: DataConnectorsCheckRequirementsMapper
};
