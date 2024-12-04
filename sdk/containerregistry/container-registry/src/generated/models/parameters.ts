/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter
} from "@azure/core-client";
import {
  RepositoryWriteableProperties as RepositoryWriteablePropertiesMapper,
  TagWriteableProperties as TagWriteablePropertiesMapper,
  ManifestWriteableProperties as ManifestWriteablePropertiesMapper
} from "../models/mappers.js";

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const url: OperationURLParameter = {
  parameterPath: "url",
  mapper: {
    serializedName: "url",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const name: OperationURLParameter = {
  parameterPath: "name",
  mapper: {
    serializedName: "name",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const reference: OperationURLParameter = {
  parameterPath: "reference",
  mapper: {
    serializedName: "reference",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const accept1: OperationParameter = {
  parameterPath: ["options", "accept"],
  mapper: {
    serializedName: "accept",
    type: {
      name: "String"
    }
  }
};

export const payload: OperationParameter = {
  parameterPath: "payload",
  mapper: {
    serializedName: "payload",
    required: true,
    type: {
      name: "Stream"
    }
  }
};

export const accept2: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const last: OperationQueryParameter = {
  parameterPath: ["options", "last"],
  mapper: {
    serializedName: "last",
    type: {
      name: "String"
    }
  }
};

export const n: OperationQueryParameter = {
  parameterPath: ["options", "n"],
  mapper: {
    serializedName: "n",
    type: {
      name: "Number"
    }
  }
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    serializedName: "api-version",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const contentType1: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const value: OperationParameter = {
  parameterPath: ["options", "value"],
  mapper: RepositoryWriteablePropertiesMapper
};

export const orderby: OperationQueryParameter = {
  parameterPath: ["options", "orderby"],
  mapper: {
    serializedName: "orderby",
    type: {
      name: "String"
    }
  }
};

export const digest: OperationQueryParameter = {
  parameterPath: ["options", "digest"],
  mapper: {
    serializedName: "digest",
    type: {
      name: "String"
    }
  }
};

export const value1: OperationParameter = {
  parameterPath: ["options", "value"],
  mapper: TagWriteablePropertiesMapper
};

export const digest1: OperationURLParameter = {
  parameterPath: "digest",
  mapper: {
    serializedName: "digest",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const value2: OperationParameter = {
  parameterPath: ["options", "value"],
  mapper: ManifestWriteablePropertiesMapper
};

export const nextLink: OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const accept3: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/octet-stream",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const fromParam: OperationQueryParameter = {
  parameterPath: "fromParam",
  mapper: {
    serializedName: "from",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const mount: OperationQueryParameter = {
  parameterPath: "mount",
  mapper: {
    serializedName: "mount",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const nextLink1: OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextBlobUuidLink",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const contentType2: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/octet-stream",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const value3: OperationParameter = {
  parameterPath: "value",
  mapper: {
    serializedName: "value",
    required: true,
    type: {
      name: "Stream"
    }
  }
};

export const value4: OperationParameter = {
  parameterPath: ["options", "value"],
  mapper: {
    serializedName: "value",
    type: {
      name: "Stream"
    }
  }
};

export const digest2: OperationQueryParameter = {
  parameterPath: "digest",
  mapper: {
    serializedName: "digest",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const range: OperationParameter = {
  parameterPath: "range",
  mapper: {
    serializedName: "Range",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const contentType3: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/x-www-form-urlencoded",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const grantType: OperationParameter = {
  parameterPath: "grantType",
  mapper: {
    serializedName: "grant_type",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const service: OperationParameter = {
  parameterPath: "service",
  mapper: {
    serializedName: "service",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const tenant: OperationParameter = {
  parameterPath: ["options", "tenant"],
  mapper: {
    serializedName: "tenant",
    type: {
      name: "String"
    }
  }
};

export const refreshToken: OperationParameter = {
  parameterPath: ["options", "refreshToken"],
  mapper: {
    serializedName: "refresh_token",
    type: {
      name: "String"
    }
  }
};

export const accessToken: OperationParameter = {
  parameterPath: ["options", "accessToken"],
  mapper: {
    serializedName: "access_token",
    type: {
      name: "String"
    }
  }
};

export const accept4: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const scope: OperationParameter = {
  parameterPath: "scope",
  mapper: {
    serializedName: "scope",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const refreshToken1: OperationParameter = {
  parameterPath: "refreshToken",
  mapper: {
    serializedName: "refresh_token",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const grantType1: OperationParameter = {
  parameterPath: "grantType",
  mapper: {
    serializedName: "grant_type",
    required: true,
    type: {
      name: "Enum",
      allowedValues: ["refresh_token", "password"]
    }
  }
};
