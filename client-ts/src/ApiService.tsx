import { ICollection, Token } from "../types.ts";
// TODO Only request new API Token if current one is >60m old (use a state hook).

const apiService = {
  validateToken: (token: Token): boolean => {
    const now = Date.now()
    if ((token.time + (3600 * 1000)) < now) {
      console.log('Token expired.')
      //Token has expired
      return false
    } else {
      const issueTimePlusOneHour = token.time + (3600 * 1000)
      const validUntil = Date.now() - issueTimePlusOneHour
      const validUntilAsSeconds = validUntil / 1000
      const validUntilAsMinutes = validUntilAsSeconds / 60

      const timeLeft = Math.floor(validUntilAsMinutes * -1)
      console.log(`Token still valid. Expires in ${timeLeft}m`)
      return true;
    }
  },
  getNewToken: async () => {
    const url = "https://accounts.spotify.com/api/token";
    const client_id = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
    const client_secret = import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    });

    const data = await response.json();
    const now = Date.now();
    console.log(`🟢 New token requested: ${data.access_token}. \nStored at ${new Date(now)}.`)

    return { token: data.access_token, time: now }
  },
  saveToken: async (token: Token) => {
    await fetch('http://127.0.0.1:3000/saveToken', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(token)
    })
    console.log('Token saved.')
  },
  retrieveToken: async () => {
    const response = await fetch('http://127.0.0.1:3000/retrieveToken');
    const data = await response.json();
    return data;
  },
  deleteToken: async () => {
    await fetch('http://127.0.0.1:3000/deleteToken', {
      method: 'DELETE'
    })
  },
  getArtistId: async (artistName: string, token: Token) => {
    const searchUrl = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`;
    const response = await fetch(searchUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + `${token.token}`,
      },
    });

    const data = await response.json();
    return data;
  },
  getRelatedArtists: async (artistId: string, token: Token) => {
    const relatedArtistsUrl = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;
    const relatedArtistsResponse = await fetch(relatedArtistsUrl, {
      method: "Get",
      headers: {
        Authorization: "Bearer " + `${token.token}`,
      },
    });

    const artistData = await relatedArtistsResponse.json();
    return artistData.artists;
  },
  getAllTracks: async (data: string[], token: Token) => {
    const topTracks = await Promise.all(
      data.map(async (artistId: string) => {
        const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=GB`;
        const response = await fetch(url, {
          method: "Get",
          headers: {
            Authorization: "Bearer " + `${token.token}`,
          },
        });

        const artistTopTracks = await response.json();
        return artistTopTracks;
      })
    );

    return topTracks;
  },
  getUserId: async (token: Token) => {
    const url = "https://api.spotify.com/v1/me"
    const response = await fetch(url, {
      method: "Get",
      headers: {
        Authorization: "Bearer " + `${token.token}`,
      },
    });
    const data = await response.json();
    console.log(data)
    return data;
  },
  getUserPlaylists: async (token: Token, user_id: string) => {
    const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
    const response = await fetch(url, {
      method: "Get",
      headers: {
        Authorization: "Bearer " + `${token.token}`,
      },
    });
    const data = await response.json();
    console.log(data)
    return data;
  },
  savePlaylist: async (tracks: ICollection) => {
    await fetch("http://127.0.0.1:3000/savePlaylist", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tracks),
    });
  },
  deletePlaylist: async (parent: string | undefined, playlist: string | undefined) => {
    const payload = JSON.stringify({ parent, playlist })

    await fetch("http://127.0.0.1:3000/deletePlaylist", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    })
  },
  getCollections: async () => {
    const response = await fetch("http://127.0.0.1:3000/getCollections");

    if (!response.ok) throw new Error('Error fetching collections.')

    const tracks = await response.json();
    return tracks;
  },
};

export default apiService;
