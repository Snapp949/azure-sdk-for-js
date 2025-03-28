/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  AlertOperationGetOptionalParams,
  AlertOperationGetResponse
} from "../models/index.js";

/** Interface representing a AlertOperation. */
export interface AlertOperation {
  /**
   * Get the specified alert operation.
   * @param scope The scope of the alert operation.
   * @param operationId The id of the alert operation.
   * @param options The options parameters.
   */
  get(
    scope: string,
    operationId: string,
    options?: AlertOperationGetOptionalParams
  ): Promise<AlertOperationGetResponse>;
}
