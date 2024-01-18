const BASE_URL = "http://localhost:3000";

const apiService = {};

apiService.getToken = async () => {
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
};

apiService.getArtistId = async (artistName) => {
  const accessToken = await apiService.getToken();
  const searchUrl = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`;
  const response = await fetch(searchUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + `${accessToken}`,
    },
  })

  const data = await response.json()
  return data
}

apiService.getRelatedArtists = async (artistId) => {
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
}

apiService.getAllTracks = async (data) => {
  const accessToken = await apiService.getToken();

  const topTracks = await Promise.all(data.map(async (artistId) => {
    const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=GB`;
    const response = await fetch(url, {
      method: "Get",
      headers: {
        Authorization: "Bearer " + `${accessToken}`,
      },
    });

    const artistTopTracks = await response.json();
    return artistTopTracks;
  }));

  return topTracks;
}

apiService.addTopTrackstoDB = async (tracks) => {
  await fetch("http://localhost:3000/toptracks", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tracks),
  });
}

apiService.getCurrentTopTracks = async () => {
  try {
    const response = await fetch("http://localhost:3000/toptracks");
    const tracks = await response.json();
    return tracks;     
  } catch (error) {
     console.error(error);
     res.status(500).send("Internal Server Error");  
  }
}

export default apiService;