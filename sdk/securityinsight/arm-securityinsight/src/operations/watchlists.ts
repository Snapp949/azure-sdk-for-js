/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Watchlists } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { SecurityInsights } from "../securityInsights.js";
import {
  Watchlist,
  WatchlistsListNextOptionalParams,
  WatchlistsListOptionalParams,
  WatchlistsListResponse,
  WatchlistsGetOptionalParams,
  WatchlistsGetResponse,
  WatchlistsDeleteOptionalParams,
  WatchlistsDeleteResponse,
  WatchlistsCreateOrUpdateOptionalParams,
  WatchlistsCreateOrUpdateResponse,
  WatchlistsListNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Watchlists operations. */
export class WatchlistsImpl implements Watchlists {
  private readonly client: SecurityInsights;

  /**
   * Initialize a new instance of the class Watchlists class.
   * @param client Reference to the service client
   */
  constructor(client: SecurityInsights) {
    this.client = client;
  }

  /**
   * Gets all watchlists, without watchlist items.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    workspaceName: string,
    options?: WatchlistsListOptionalParams
  ): PagedAsyncIterableIterator<Watchlist> {
    const iter = this.listPagingAll(resourceGroupName, workspaceName, options);
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
        return this.listPagingPage(
          resourceGroupName,
          workspaceName,
          options,
          settings
        );
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    workspaceName: string,
    options?: WatchlistsListOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<Watchlist[]> {
    let result: WatchlistsListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(resourceGroupName, workspaceName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        workspaceName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    workspaceName: string,
    options?: WatchlistsListOptionalParams
  ): AsyncIterableIterator<Watchlist> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      workspaceName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets all watchlists, without watchlist items.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    workspaceName: string,
    options?: WatchlistsListOptionalParams
  ): Promise<WatchlistsListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, options },
      listOperationSpec
    );
  }

  /**
   * Gets a watchlist, without its watchlist items.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param watchlistAlias Watchlist Alias
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    options?: WatchlistsGetOptionalParams
  ): Promise<WatchlistsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, watchlistAlias, options },
      getOperationSpec
    );
  }

  /**
   * Delete a watchlist.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param watchlistAlias Watchlist Alias
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    options?: WatchlistsDeleteOptionalParams
  ): Promise<WatchlistsDeleteResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, watchlistAlias, options },
      deleteOperationSpec
    );
  }

  /**
   * Create or update a Watchlist and its Watchlist Items (bulk creation, e.g. through text/csv content
   * type). To create a Watchlist and its Items, we should call this endpoint with either rawContent or a
   * valid SAR URI and contentType properties. The rawContent is mainly used for small watchlist (content
   * size below 3.8 MB). The SAS URI enables the creation of large watchlist, where the content size can
   * go up to 500 MB. The status of processing such large file can be polled through the URL returned in
   * Azure-AsyncOperation header.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param watchlistAlias Watchlist Alias
   * @param watchlist The watchlist
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    watchlist: Watchlist,
    options?: WatchlistsCreateOrUpdateOptionalParams
  ): Promise<WatchlistsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, watchlistAlias, watchlist, options },
      createOrUpdateOperationSpec
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    workspaceName: string,
    nextLink: string,
    options?: WatchlistsListNextOptionalParams
  ): Promise<WatchlistsListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.WatchlistList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.skipToken],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists/{watchlistAlias}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Watchlist
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.watchlistAlias
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists/{watchlistAlias}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.WatchlistsDeleteHeaders
    },
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.watchlistAlias
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists/{watchlistAlias}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Watchlist
    },
    201: {
      bodyMapper: Mappers.Watchlist,
      headersMapper: Mappers.WatchlistsCreateOrUpdateHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.watchlist,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.watchlistAlias
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.WatchlistList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
