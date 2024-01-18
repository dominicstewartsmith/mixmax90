import React from "react";
import { useEffect, useState } from "react";
import { BsSearchHeart } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { TbReload } from "react-icons/tb";

const Search = ({ search, setSearch, currentTracks, setCurrentTracks, getCurrentTopTracks }) => {
  const [topTracks, setTopTracks] = useState([]);
  const [selectArtist, setSelectArtist] = useState([]);
  const [artistId, setArtistId] = useState(null);
  const [showTopTracks, setShowTopTracks] = useState(false);
  const [heartColor, setHeartColor] = useState("#eee");

  useEffect(() => {
    getCurrentTopTracks()
  }, [])

  let accessToken = null;
  
  let artistName = search.replace(/\s+/g, "+");
  // let artistTitle = null
  

  const getToken = async () => {
    const url = "https://accounts.spotify.com/api/token";
    const client_id = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
    const client_secret = import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET;
    // console.log('ID',client_id)
    // console.log('SECRET', client_secret)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    });

    const data = await response.json();
    accessToken = data.access_token;
    // console.log(accessToken, "in getToken");
  };

  const getArtistId = async () => {
    await getToken();
    const searchUrl = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`;
    console.log('SEARCHURL',searchUrl)
    await fetch(searchUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + `${accessToken}`,
      },
    })
    .then((response) => response.json())
      .then((data) => {
        console.log('in getArtistId', data)
        setSelectArtist(()=>data.artists.items)
      })  
    setSearch("");
    
  }

  const getRelatedArtistData = async (clickedArtistId) => {
    setArtistId(clickedArtistId)
    console.log('ARTISTID', artistId)
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
    addTopTrackstoDB(randomTracks)
    setHeartColor("#eee");
  };

  const getArtistIds = (data) => {
    const artistIds = [];

    if (data && data.artists && Array.isArray(data.artists)) {
      data.artists.forEach((artist) => {
        if (artist.name) {
          artistIds.push(artist.id);
          // artistIds.push({id:artist.id, name:artist.name});
        }
      });
    }

    return artistIds;
  };

  const getTopTracks = async (data) => {
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

  function getRandomTracksByArtist(tracks) {
    const uniqueArtists = new Set();
    const result = [];

    tracks.forEach((album) => {
      album.tracks.forEach((track) => {
        const artistId = track.artists[0].id;

        // Check if the artist ID is unique
        if (!uniqueArtists.has(artistId)) {
          // Add the artist ID to the set of unique artists
          uniqueArtists.add(artistId);

          // Randomly select a track for the artist
          const randomIndex = Math.floor(Math.random() * album.tracks.length);
          const randomTrack = album.tracks[randomIndex];

          // Add the random track to the result array
          result.push(randomTrack);
        }
      });
    });

    return result;
  }
  async function addTopTrackstoDB(tracks) {   
     fetch("http://localhost:3000/toptracks", {
       method: "POST",
       mode: "cors",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(tracks),
     });
  }

  const heartClick = () => {
    // Update the color to red when clicked
    setHeartColor("red");

    // Your additional onClick logic goes here
    console.log("Heart clicked!");
  };
  return (
    <div>
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          size="50"
          name=""
          id="search"
          role="searchbox"
          placeholder=" Find music like..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={getArtistId} type="submit" id="submitButton">
          <BsSearchHeart />
        </button>
      </form>

      <ul className="artist-search-ul">
        {selectArtist.map((artist, index) => (
          <li
            className="artist-search-li"
            onClick={() => {
              {
                console.log("in selectArtist.map");
              }
              setTopTracks([]);
              // click creates
              getRelatedArtistData(artist.id);
              setSelectArtist([]);
              setShowTopTracks(true);
            }}
            key={index}
          >
            <div className="artist-search-thumb-container">
              {artist.images[2] && (
                <img
                  className="artist-search-thumb-img"
                  src={artist.images[2].url}
                  alt=""
                />
              )}
            </div>
            <div className="artist-search-name">{artist.name}</div>
            {/* Id: {artist.id} */}
          </li>
        ))}
      </ul>

      {showTopTracks && (
        <ul className="top-tracks-ul">
          <div className="top-tracks-ul-title-container">
            <div
              className="top-tracks-ul-title-container-icon"
              onClick={() => {
                {
                  console.log("in reload");
                }
                setTopTracks([]);
                getRelatedArtistData(artistId);
                setSelectArtist([]);
                setShowTopTracks(true);
              }}
            >
              <TbReload />
            </div>
            <div className="top-tracks-title">Nice work!</div>
            <div
              className="top-tracks-ul-title-container-icon"
              id="heart"
              style={{ color: heartColor }}
              onClick={heartClick}
            >
              <GoHeart />
            </div>
          </div>
          {topTracks.map((track, index) => (
            <li className="top-tracks-li" key={index}>
              {/* { console.log('TRACK STRUCTURE',track)} */}
              <div className="top-tracks-thumb-container">
                {track.album.images[2] && (
                  <img
                    className="top-tracks-thumb-img"
                    src={track.album.images[2].url}
                    alt=""
                  />
                )}
              </div>
              <div className="track-details">
                <div className="track-details-track">{`${track.name}`}</div>
                <div className="track-details-artist">{`${track.artists[0].name}`}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
