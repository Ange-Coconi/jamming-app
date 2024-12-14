// Modules/spotifyAPI.js

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

export const searchTracksByArtist = async (artist, accessToken) => {
  const url = `${SPOTIFY_BASE_URL}/search?q=${encodeURIComponent(artist)}&type=track`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Error fetching tracks: ${response.statusText}`);
  }

  const data = await response.json();
  return data.tracks.items;
};
