/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  BandwidthSchedule,
  BandwidthSchedulesListByDataBoxEdgeDeviceOptionalParams,
  BandwidthSchedulesGetOptionalParams,
  BandwidthSchedulesGetResponse,
  BandwidthSchedulesCreateOrUpdateOptionalParams,
  BandwidthSchedulesCreateOrUpdateResponse,
  BandwidthSchedulesDeleteOptionalParams
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a BandwidthSchedules. */
export interface BandwidthSchedules {
  /**
   * Gets all the bandwidth schedules for a Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  listByDataBoxEdgeDevice(
    deviceName: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesListByDataBoxEdgeDeviceOptionalParams
  ): PagedAsyncIterableIterator<BandwidthSchedule>;
  /**
   * Gets the properties of the specified bandwidth schedule.
   * @param deviceName The device name.
   * @param name The bandwidth schedule name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  get(
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesGetOptionalParams
  ): Promise<BandwidthSchedulesGetResponse>;
  /**
   * Creates or updates a bandwidth schedule.
   * @param deviceName The device name.
   * @param name The bandwidth schedule name which needs to be added/updated.
   * @param resourceGroupName The resource group name.
   * @param parameters The bandwidth schedule to be added or updated.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    deviceName: string,
    name: string,
    resourceGroupName: string,
    parameters: BandwidthSchedule,
    options?: BandwidthSchedulesCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<BandwidthSchedulesCreateOrUpdateResponse>,
      BandwidthSchedulesCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates a bandwidth schedule.
   * @param deviceName The device name.
   * @param name The bandwidth schedule name which needs to be added/updated.
   * @param resourceGroupName The resource group name.
   * @param parameters The bandwidth schedule to be added or updated.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    deviceName: string,
    name: string,
    resourceGroupName: string,
    parameters: BandwidthSchedule,
    options?: BandwidthSchedulesCreateOrUpdateOptionalParams
  ): Promise<BandwidthSchedulesCreateOrUpdateResponse>;
  /**
   * Deletes the specified bandwidth schedule.
   * @param deviceName The device name.
   * @param name The bandwidth schedule name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  beginDelete(
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Deletes the specified bandwidth schedule.
   * @param deviceName The device name.
   * @param name The bandwidth schedule name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: BandwidthSchedulesDeleteOptionalParams
  ): Promise<void>;
}
