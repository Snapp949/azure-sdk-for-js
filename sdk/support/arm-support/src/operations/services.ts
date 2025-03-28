/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { Services } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { MicrosoftSupport } from "../microsoftSupport.js";
import {
  Service,
  ServicesListOptionalParams,
  ServicesListResponse,
  ServicesGetOptionalParams,
  ServicesGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Services operations. */
export class ServicesImpl implements Services {
  private readonly client: MicrosoftSupport;

  /**
   * Initialize a new instance of the class Services class.
   * @param client Reference to the service client
   */
  constructor(client: MicrosoftSupport) {
    this.client = client;
  }

  /**
   * Lists all the Azure services available for support ticket creation. For **Technical** issues, select
   * the Service Id that maps to the Azure service/product as displayed in the **Services** drop-down
   * list on the Azure portal's [New support
   * request](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade/overview) page.
   * Always use the service and its corresponding problem classification(s) obtained programmatically for
   * support ticket creation. This practice ensures that you always have the most recent set of service
   * and problem classification Ids.
   * @param options The options parameters.
   */
  public list(
    options?: ServicesListOptionalParams,
  ): PagedAsyncIterableIterator<Service> {
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
    options?: ServicesListOptionalParams,
    _settings?: PageSettings,
  ): AsyncIterableIterator<Service[]> {
    let result: ServicesListResponse;
    result = await this._list(options);
    yield result.value || [];
  }

  private async *listPagingAll(
    options?: ServicesListOptionalParams,
  ): AsyncIterableIterator<Service> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists all the Azure services available for support ticket creation. For **Technical** issues, select
   * the Service Id that maps to the Azure service/product as displayed in the **Services** drop-down
   * list on the Azure portal's [New support
   * request](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade/overview) page.
   * Always use the service and its corresponding problem classification(s) obtained programmatically for
   * support ticket creation. This practice ensures that you always have the most recent set of service
   * and problem classification Ids.
   * @param options The options parameters.
   */
  private _list(
    options?: ServicesListOptionalParams,
  ): Promise<ServicesListResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }

  /**
   * Gets a specific Azure service for support ticket creation.
   * @param serviceName Name of the Azure service.
   * @param options The options parameters.
   */
  get(
    serviceName: string,
    options?: ServicesGetOptionalParams,
  ): Promise<ServicesGetResponse> {
    return this.client.sendOperationRequest(
      { serviceName, options },
      getOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Support/services",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ServicesListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Support/services/{serviceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Service,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.serviceName],
  headerParameters: [Parameters.accept],
  serializer,
};
