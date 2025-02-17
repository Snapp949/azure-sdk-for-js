/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { MicrosoftSerialConsoleClient } from "@azure/arm-serialconsole";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Connect to serial port of the target resource
 *
 * @summary Connect to serial port of the target resource
 * x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/SerialPortConnectVMSS.json
 */
async function connectToAScaleSetInstanceSerialPort(): Promise<void> {
  const subscriptionId = "00000000-00000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const resourceProviderNamespace = "Microsoft.Compute";
  const parentResourceType = "virtualMachineScaleSets";
  const parentResource = "myscaleset/virtualMachines/2";
  const serialPort = "0";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSerialConsoleClient(credential, subscriptionId);
  const result = await client.serialPorts.connect(
    resourceGroupName,
    resourceProviderNamespace,
    parentResourceType,
    parentResource,
    serialPort
  );
  console.log(result);
}

connectToAScaleSetInstanceSerialPort().catch(console.error);

/**
 * This sample demonstrates how to Connect to serial port of the target resource
 *
 * @summary Connect to serial port of the target resource
 * x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/SerialPortConnectVM.json
 */
async function connectToAVirtualMachineSerialPort(): Promise<void> {
  const subscriptionId = "00000000-00000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const resourceProviderNamespace = "Microsoft.Compute";
  const parentResourceType = "virtualMachines";
  const parentResource = "myVM";
  const serialPort = "0";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSerialConsoleClient(credential, subscriptionId);
  const result = await client.serialPorts.connect(
    resourceGroupName,
    resourceProviderNamespace,
    parentResourceType,
    parentResource,
    serialPort
  );
  console.log(result);
}

connectToAVirtualMachineSerialPort().catch(console.error);
