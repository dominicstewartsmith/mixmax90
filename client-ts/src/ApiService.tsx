import { ICollection } from "../types.ts";

const apiService = {
  getToken: async () => {
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
    return data.access_token;
  },
  getArtistId: async (artistName: string) => {
    const accessToken = await apiService.getToken();
    const searchUrl = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`;
    const response = await fetch(searchUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + `${accessToken}`,
      },
    });

    const data = await response.json();
    return data;
  },
  getRelatedArtists: async (artistId: string) => {
    const accessToken = await apiService.getToken();

    const relatedArtistsUrl = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;
    const relatedArtistsResponse = await fetch(relatedArtistsUrl, {
      method: "Get",
      headers: {
        Authorization: "Bearer " + `${accessToken}`,
      },
    });

    const artistData = await relatedArtistsResponse.json();
    return artistData.artists;
  },
  getAllTracks: async (data: string[]) => {
    const accessToken = await apiService.getToken();

    const topTracks = await Promise.all(
      data.map(async (artistId: string) => {
        const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=GB`;
        const response = await fetch(url, {
          method: "Get",
          headers: {
            Authorization: "Bearer " + `${accessToken}`,
          },
        });

        const artistTopTracks = await response.json();
        return artistTopTracks;
      })
    );

    return topTracks;
  },
  savePlaylist: async (tracks: ICollection) => {
    await fetch("http://localhost:3000/savePlaylist", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tracks),
    });
  },
  deletePlaylist: async (id: string) => {
    await fetch("http://localhost:3000/deletePlaylist", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
  },
  getCollections: async () => {
    try {
      const response = await fetch("http://localhost:3000/getCollections");
      const tracks = await response.json();
      return tracks;
    } catch (error) {
      console.error(error);
    }
  },
};

export default apiService;
