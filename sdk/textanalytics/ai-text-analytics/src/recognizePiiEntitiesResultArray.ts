// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PiiResult,
  TextDocumentBatchStatistics,
  TextDocumentInput,
} from "./generated/models/index.js";
import type { RecognizePiiEntitiesResult } from "./recognizePiiEntitiesResult.js";
import {
  makeRecognizePiiEntitiesErrorResult,
  makeRecognizePiiEntitiesResult,
} from "./recognizePiiEntitiesResult.js";
import { combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion } from "./textAnalyticsResult.js";

/**
 * Collection of `RecognizePiiEntitiesResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface RecognizePiiEntitiesResultArray extends Array<RecognizePiiEntitiesResult> {
  /**
   * Statistics about the input document batch and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
  /**
   * The version of the text analytics model used by this operation on this
   * batch of input documents.
   */
  modelVersion: string;
}

/**
 * @internal
 */
export function makeRecognizePiiEntitiesResultArray(
  input: TextDocumentInput[],
  response: PiiResult,
): RecognizePiiEntitiesResultArray {
  return combineSuccessfulAndErroneousDocumentsWithStatisticsAndModelVersion(
    input,
    response,
    makeRecognizePiiEntitiesResult,
    makeRecognizePiiEntitiesErrorResult,
  );
}
