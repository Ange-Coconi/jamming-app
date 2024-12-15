// Modules/spotifyAPI.js
import { getRefreshToken } from "./AuthService.js";

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

export const searchArtistByName = async (artistName, accessToken) => {
  const url = `${SPOTIFY_BASE_URL}/search?q=${encodeURIComponent(artistName)}&type=artist`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.error.message === "The access token expired") {
        getRefreshToken();
        const response2 = await fetch(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
            });
        const data = await response2.json();
        return data.artists.items[0].id;
    } else {
        throw new Error(`Error fetching tracks: ${response.statusText}`);
    }
    }

  const data = await response.json();
  if (data.artists.items.length === 0) {
    throw new Error('Artist not found');
  }
  return data.artists.items[0].id; // Return the first artist ID
};

export const fetchTopTracks = async (artistId, accessToken) => {
  const url = `${SPOTIFY_BASE_URL}/artists/${artistId}/top-tracks`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Error fetching Top Tracks: ${response.statusText}`)
  };

  const data = await response.json();
  return data.tracks;
};

export const addPlaylistToUser = async (arrayOfMusicId, ids, accessToken) => {
    // Define url
    const url = `${SPOTIFY_BASE_URL}/me/tracks?ids=${encodeURIComponent(ids)}`;
    // POST the playlist
    const response = await fetch(url, {
        method: 'PUT',
        headers : { 
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'  },
        body: {
            "ids": arrayOfMusicId
        }
    });

    if (!response.ok) {
        throw new Error(`Error adding playlist: ${response.statusText}`);
    }

    return "playlist succesfully saved !";
}



