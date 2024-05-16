/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { SecureScores } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SecurityCenter } from "../securityCenter";
import {
  SecureScoreItem,
  SecureScoresListNextOptionalParams,
  SecureScoresListOptionalParams,
  SecureScoresListResponse,
  SecureScoresGetOptionalParams,
  SecureScoresGetResponse,
  SecureScoresListNextResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing SecureScores operations. */
export class SecureScoresImpl implements SecureScores {
  private readonly client: SecurityCenter;

  /**
   * Initialize a new instance of the class SecureScores class.
   * @param client Reference to the service client
   */
  constructor(client: SecurityCenter) {
    this.client = client;
  }

  /**
   * List secure scores for all your Microsoft Defender for Cloud initiatives within your current scope.
   * @param options The options parameters.
   */
  public list(
    options?: SecureScoresListOptionalParams,
  ): PagedAsyncIterableIterator<SecureScoreItem> {
    const iter = this.listPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listPagingPage(options, settings);
      },
    };
  }

  private async *listPagingPage(
    options?: SecureScoresListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<SecureScoreItem[]> {
    let result: SecureScoresListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    options?: SecureScoresListOptionalParams,
  ): AsyncIterableIterator<SecureScoreItem> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * List secure scores for all your Microsoft Defender for Cloud initiatives within your current scope.
   * @param options The options parameters.
   */
  private _list(
    options?: SecureScoresListOptionalParams,
  ): Promise<SecureScoresListResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }

  /**
   * Get secure score for a specific Microsoft Defender for Cloud initiative within your current scope.
   * For the ASC Default initiative, use 'ascScore'.
   * @param secureScoreName The initiative name. For the ASC Default initiative, use 'ascScore' as in the
   *                        sample request below.
   * @param options The options parameters.
   */
  get(
    secureScoreName: string,
    options?: SecureScoresGetOptionalParams,
  ): Promise<SecureScoresGetResponse> {
    return this.client.sendOperationRequest(
      { secureScoreName, options },
      getOperationSpec,
    );
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    nextLink: string,
    options?: SecureScoresListNextOptionalParams,
  ): Promise<SecureScoresListNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Security/secureScores",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SecureScoresList,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion20],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Security/secureScores/{secureScoreName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SecureScoreItem,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion20],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.secureScoreName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SecureScoresList,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
