// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the different methods of authentication
 * to make calls to the Azure Tables Service
 *
 * @summary authenticates using different authentication methods
 * @azsdk-weight 40
 */
import {
  TableServiceClient,
  AzureNamedKeyCredential,
  AzureSASCredential,
} from "@azure/data-tables";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

// URL of the tables endpoint
const tablesUrl = process.env["TABLES_URL"] || "";

// You can find your storage account's name, connection strings and keys in the Azure portal.
// Navigate to Settings > Access keys in your storage account's menu blade to see connection strings for both primary and secondary access keys
const accountConnectionString = process.env["ACCOUNT_CONNECTION_STRING"] || "";
const accountName = process.env["ACCOUNT_NAME"] || "";
const accountKey = process.env["ACCOUNT_KEY"] || "";

// You can generate a SAS connection string and token for your storage account in the Azure Portal
// Navigate to Settings > "Shared access signature" in your storage account's menu blade select the Allowed services, resource types, permissions and expiry options
// and generate your SAS and connection string.
const sasConnectionString = process.env["SAS_CONNECTION_STRING"] || "";
const sasToken = process.env["SAS_TOKEN"] || "";

/**
 * Create a TableServiceClient using a SAS connection String
 */
async function tableServiceClientWithSasConnectionString(): Promise<void> {
  const client = TableServiceClient.fromConnectionString(sasConnectionString);
  await countTablesWithClient(client);
}

/**
 * Create a TableServiceClient using a SAS connection String
 */
async function tableServiceClientWithAAD(): Promise<void> {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();
  const client = new TableServiceClient(tablesUrl, credential);
  await countTablesWithClient(client);
}

/**
 * Create a TableServiceClient using a SAS token
 */
async function tableServiceClientWithSasToken(): Promise<void> {
  const client = new TableServiceClient(tablesUrl, new AzureSASCredential(sasToken));
  await countTablesWithClient(client);
}

/**
 * Create a TableServiceClient using an Account connection String.
 * Note that this authentication method is only supported in Node,
 * and it is not available for browsers
 */
async function tableServiceClientWithAccountConnectionString(): Promise<void> {
  const client = TableServiceClient.fromConnectionString(accountConnectionString);
  await countTablesWithClient(client);
}

/**
 * Create a TableServiceClient using account name and account key
 * Note that this authentication method is only supported in Node,
 * and it is not available for browsers
 */
async function tableServiceClientWithAccountKey(): Promise<void> {
  const creds = new AzureNamedKeyCredential(accountName, accountKey);
  const client = new TableServiceClient(tablesUrl, creds);
  await countTablesWithClient(client);
}

async function countTablesWithClient(client: TableServiceClient): Promise<void> {
  const tablesIterator = client.listTables();
  let count = 0;
  for await (const _table of tablesIterator) {
    count++;
  }

  console.log(`Listed ${count} tables`);
}

export async function main(): Promise<void> {
  console.log("== Client Authentication Methods Sample ==");

  await tableServiceClientWithSasConnectionString();
  await tableServiceClientWithSasToken();

  await tableServiceClientWithAccountConnectionString();
  await tableServiceClientWithAccountKey();

  await tableServiceClientWithAAD();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
