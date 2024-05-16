/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  SecurityOperatorsListOptionalParams,
  SecurityOperatorsListResponse,
  SecurityOperatorsGetOptionalParams,
  SecurityOperatorsGetResponse,
  SecurityOperatorsCreateOrUpdateOptionalParams,
  SecurityOperatorsCreateOrUpdateResponse,
  SecurityOperatorsDeleteOptionalParams,
} from "../models";

/** Interface representing a SecurityOperators. */
export interface SecurityOperators {
  /**
   * Lists Microsoft Defender for Cloud securityOperators in the subscription.
   * @param pricingName name of the pricing configuration
   * @param options The options parameters.
   */
  list(
    pricingName: string,
    options?: SecurityOperatorsListOptionalParams,
  ): Promise<SecurityOperatorsListResponse>;
  /**
   * Get a specific security operator for the requested scope.
   * @param pricingName name of the pricing configuration
   * @param securityOperatorName name of the securityOperator
   * @param options The options parameters.
   */
  get(
    pricingName: string,
    securityOperatorName: string,
    options?: SecurityOperatorsGetOptionalParams,
  ): Promise<SecurityOperatorsGetResponse>;
  /**
   * Creates Microsoft Defender for Cloud security operator on the given scope.
   * @param pricingName name of the pricing configuration
   * @param securityOperatorName name of the securityOperator
   * @param options The options parameters.
   */
  createOrUpdate(
    pricingName: string,
    securityOperatorName: string,
    options?: SecurityOperatorsCreateOrUpdateOptionalParams,
  ): Promise<SecurityOperatorsCreateOrUpdateResponse>;
  /**
   * Delete Microsoft Defender for Cloud securityOperator in the subscription.
   * @param pricingName name of the pricing configuration
   * @param securityOperatorName name of the securityOperator
   * @param options The options parameters.
   */
  delete(
    pricingName: string,
    securityOperatorName: string,
    options?: SecurityOperatorsDeleteOptionalParams,
  ): Promise<void>;
}
