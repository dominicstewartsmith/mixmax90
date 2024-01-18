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

export default apiService;