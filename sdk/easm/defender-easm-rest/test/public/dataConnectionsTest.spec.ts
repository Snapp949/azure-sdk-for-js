// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient.js";
import type { EasmClient } from "../../src/index.js";
import EasmDefender, { isUnexpected } from "../../src/index.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Data Connections Test", () => {
  let recorder: Recorder;
  let client: EasmClient;
  let data_connection_name: string;
  let new_data_connection_name: string;
  let cluster_name: string;
  let database_name: string;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    const subscription_id = assertEnvironmentVariable("SUBSCRIPTION_ID");
    const resource_group = assertEnvironmentVariable("RESOURCEGROUPNAME");
    const workspace_name = assertEnvironmentVariable("WORKSPACENAME");
    const endpoint = assertEnvironmentVariable("ENDPOINT");
    const credential = createTestCredential();
    console.log("subscription id is: " + subscription_id);
    client = EasmDefender(
      endpoint +
        "/subscriptions/" +
        subscription_id +
        "/resourceGroups/" +
        resource_group +
        "/workspaces/" +
        workspace_name,
      credential,
      recorder.configureClientOptions({}),
    );
    data_connection_name = "sdktest-connection";
    new_data_connection_name = "sample-dc";
    cluster_name = "sample-cluster";
    database_name = "sample-db";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("Should list data connections", async () => {
    const dataConnectionsResponse = await client.path("/dataConnections").get();
    if (isUnexpected(dataConnectionsResponse)) {
      throw new Error(dataConnectionsResponse.body?.error.message);
    }

    assert.strictEqual(dataConnectionsResponse.status, "200");

    const data_connection = dataConnectionsResponse.body.value[0];

    assert.isNotEmpty(data_connection.name);
  });

  it("Should get a given data connection", async () => {
    const dataConnectionsResponse = await client
      .path("/dataConnections/{dataConnectionName}", data_connection_name)
      .get();

    if (isUnexpected(dataConnectionsResponse)) {
      throw new Error(dataConnectionsResponse.body?.error.message);
    }

    const data_connection = dataConnectionsResponse.body;

    assert.strictEqual(dataConnectionsResponse.status, "200");

    assert.strictEqual(data_connection_name, data_connection.name);
    // assert.strictEqual(data_connection_name, data_connection.displayName);
  });

  it("Should validate a data connection", async () => {
    const dataConnectionValidateResponse = await client.path("/dataConnections:validate").post({
      body: {
        kind: "azureDataExplorer",
        properties: {
          clusterName: cluster_name,
          databaseName: database_name,
          region: "eastus",
        },
        content: "assets",
        frequency: "daily",
        name: data_connection_name,
      },
    });
    if (isUnexpected(dataConnectionValidateResponse)) {
      throw new Error(dataConnectionValidateResponse.body?.error.message);
    }

    const validate_response = dataConnectionValidateResponse.body;

    assert.isNull(validate_response.error);
  });

  it("Should create a new data connection", async () => {
    const dataConnectionResponse = await client
      .path("/dataConnections/{dataConnectionName}", new_data_connection_name)
      .put({
        body: {
          kind: "azureDataExplorer",
          properties: {
            clusterName: cluster_name,
            databaseName: database_name,
            region: "eastus",
          },
          content: "assets",
          frequency: "daily",
          name: new_data_connection_name,
        },
      });
    if (isUnexpected(dataConnectionResponse)) {
      throw new Error(dataConnectionResponse.body?.error.message);
    }

    const data_connection = dataConnectionResponse.body;

    assert.isNotNull(data_connection.name);
  });

  it("Should delete a data connection", async () => {
    const dataConnectionResponse = await client
      .path("/dataConnections/{dataConnectionName}", new_data_connection_name)
      .delete();

    if (isUnexpected(dataConnectionResponse)) {
      throw new Error(dataConnectionResponse.body?.error.message);
    }
  });
});
