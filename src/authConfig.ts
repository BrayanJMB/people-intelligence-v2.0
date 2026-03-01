
/**
 * Microsoft Entra External ID (Customer)
 * People Intelligence TEST
 */
/*
import { LogLevel } from "@azure/msal-browser";
export const b2cPolicies = {};
const tenantDomain = "peopleintelligencetest.ciamlogin.com";
const tenantId = "d0725c1a-f3f1-4b94-a364-c224f94808f1";
const userFlow = "sisu";

const frontendClientId = "2bdd867c-f915-458c-bc6b-3daab7af7f62";
const apiClientId = "ae9d9515-64ad-4b76-bd43-7daee655870a";

export const msalConfig = {
  auth: {
    clientId: frontendClientId,
    authority: `https://${tenantDomain}/${tenantId}`,
    knownAuthorities: [tenantDomain],
    redirectUri: "http://localhost:5173",
    postLogoutRedirectUri: "http://localhost:5173",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean
      ): void => {
        if (containsPii) return;

        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    `api://${apiClientId}/access_as_user`,
  ],
};*/

import { LogLevel } from "@azure/msal-browser";
import { ENV } from "./config/env";
export const b2cPolicies = {};
const currentOrigin = window.location.origin;
export const msalConfig = {
  auth: {
    clientId: ENV.FRONTEND_CLIENT_ID,
    authority: ENV.AUTHORITY,
    knownAuthorities: [ENV.TENANT_DOMAIN],
    redirectUri: currentOrigin,
    postLogoutRedirectUri: currentOrigin,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean
      ): void => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: [import.meta.env.VITE_SCOPE],
};