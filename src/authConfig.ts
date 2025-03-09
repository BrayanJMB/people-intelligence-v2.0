import { LogLevel } from "@azure/msal-browser";

export const b2cPolicies = {
  names: {
      signUpSignIn: "<Sign Up Name - in the form of B2C_1_xxx>",
      forgotPassword: "<Forgot Password Name - in the form of B2C_1_xxx>",
      editProfile: "<Edit Profile Name - in the form of B2C_1_xxx>"
  },
  authorities: {
      signUpSignIn: {
          authority: "https://pruebasnewsuite.b2clogin.com/pruebasnewsuite.onmicrosoft.com/B2C_1_sisu",
      },
      forgotPassword: {
          authority: "https://<AAD B2C Name>.b2clogin.com/<AAD B2C Name>.onmicrosoft.com/<Forgot Password Name - in the form of B2C_1_xxx>",
      },
      editProfile: {
          authority: "https://<AAD B2C Name>.b2clogin.com/<AAD B2C Name>.onmicrosoft.com/<Edit Profile Name - in the form of B2C_1_xxx>"
      }
  },
  authorityDomain: "pruebasnewsuite.b2clogin.com"
}

export const msalConfig2 = {
    auth: {
      clientId: "d754ce82-c8b8-45c5-a556-36810253d8e5",  // 📌 Asegúrate de usar el correcto
      authority: "https://pruebasnewsuite.b2clogin.com/pruebasnewsuite.onmicrosoft.com/B2C_1_sisu",
      knownAuthorities: ["pruebasnewsuite.b2clogin.com"],
      redirectUri: "http://localhost:3000",
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true,
    }
  };

  export const msalConfig = {
    auth: {
        clientId: "d754ce82-c8b8-45c5-a556-36810253d8e5", 
        authority: b2cPolicies.authorities.signUpSignIn.authority, 
        knownAuthorities: [b2cPolicies.authorityDomain], 
        redirectUri: "http://localhost:3000",
        postLogoutRedirectUri: "/",
        navigateToLoginRequestUrl: false, 
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {	
      loggerOptions: {	
          loggerCallback: (level: LogLevel, message: string, containsPii: boolean): void => {	
              if (containsPii) {		
                  return;		
              }		
              switch (level) {		
                  case LogLevel.Error:		
                      console.error(message);		
                      return;		
                  case LogLevel.Info:		
                      console.info(message);		
                      return;		
                  case LogLevel.Verbose:		
                      console.debug(message);		
                      return;		
                  case LogLevel.Warning:		
                      console.warn(message);		
                      return;
                  default:
                      return;
              }	
          }	
      }
    }
};
  
  export const loginRequest = {
    scopes: ["openid", "offline_access", "profile"]
  };

  