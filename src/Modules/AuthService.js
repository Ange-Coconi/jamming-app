// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const clientId = 'ce047644b36f47f09dca39b56bbe2a06';
const redirectUri = 'http://localhost:3000/';
const scope = 'user-read-private user-read-email playlist-read-private playlist-modify-private';

const generateCodeVerifier = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => possible[x % possible.length])
    .join('');
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

export const initiateSpotifyAuth = async () => {
  localStorage.clear();
  const codeVerifier = generateCodeVerifier(64);
  localStorage.setItem('code_verifier', codeVerifier);

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.search = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  }).toString();

  window.location.href = authUrl.toString();
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setAccessToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async () => {
    try {
      await initiateSpotifyAuth();
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleCallback = async () => {
    try {
      const token = await handleSpotifyCallback();
      if (token) {
        setAccessToken(token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Callback handling failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      accessToken, 
      setAccessToken, 
      isAuthenticated, 
      login,
      handleCallback 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthService.js (minimal changes)
export const handleSpotifyCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  console.log('callBackspoti run')
  if (code && !localStorage.getItem('access_token')) {
    try {
      const codeVerifier = localStorage.getItem('code_verifier');
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      });

      if (!response.ok) {
        throw new Error('Token exchange failed');
      }
      console.log('get the token');
      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);

      // Clear the URL parameters
      window.history.replaceState({}, document.title, redirectUri);

      return data.access_token;
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  }
  return null;
};

export const getRefreshToken = async () => {

  // refresh token that has been previously stored
  const refreshToken = localStorage.getItem('refresh_token');
  const url = "https://accounts.spotify.com/api/token";

   const payload = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     body: new URLSearchParams({
       grant_type: 'refresh_token',
       refresh_token: refreshToken,
       client_id: clientId
     }),
   }
   const body = await fetch(url, payload);
   const response = await body.json();

   localStorage.setItem('access_token', response.accessToken);
   if (response.refreshToken) {
     localStorage.setItem('refresh_token', response.refreshToken);
   }
 }