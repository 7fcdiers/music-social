import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}