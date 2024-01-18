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

apiService.getArtistId = async () => {
  await getToken();
  const searchUrl = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`;
  console.log("SEARCHURL", searchUrl);
  await fetch(searchUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + `${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("in getArtistId", data);
      setSelectArtist(() => data.artists.items);
    });
  setSearch("");
};

apiService.getRelatedArtistData = async (clickedArtistId) => {
  setArtistId(clickedArtistId);
  console.log("ARTISTID", artistId);
  await getToken();

  const relatedArtistsUrl = `https://api.spotify.com/v1/artists/${clickedArtistId}/related-artists`;

  const relatedArtistsResponse = await fetch(relatedArtistsUrl, {
    method: "Get",
    headers: {
      Authorization: "Bearer " + `${accessToken}`,
    },
  });

  const artistData = await relatedArtistsResponse.json();

  const artistIds = getArtistIds(artistData);
  console.log("IDS", artistIds);
  const tracks = await getTopTracks(artistIds);
  console.log("TRACKS", tracks);
  const randomTracks = getRandomTracksByArtist(tracks);
  console.log("topTracks", randomTracks);
  setTopTracks(randomTracks);
  // save to DB
  addTopTrackstoDB(randomTracks);
  setHeartColor("#eee");
};

apiService.getTopTracks = async (data) => {
  const topTracks = [];

  await Promise.all(
    data.map(async (id) => {
      const url = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=GB`;
      const response = await fetch(url, {
        method: "Get",
        headers: {
          Authorization: "Bearer " + `${accessToken}`,
        },
      });

      const artistTopTracks = await response.json();
      topTracks.push(artistTopTracks);
    })
  );
  // console.log('TOPTRAX', topTracks)
  return topTracks;
};

apiService.addTopTrackstoDB = async (tracks) => {
  fetch("http://localhost:3000/toptracks", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tracks),
  });
};

export default apiService;