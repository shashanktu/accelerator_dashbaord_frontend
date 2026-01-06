export const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID", // Replace with your Azure AD app registration client ID
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID", // Replace with your tenant ID
    redirectUri: "http://localhost:3000"
  }
};

export const loginRequest = {
  scopes: ["User.Read"]
};