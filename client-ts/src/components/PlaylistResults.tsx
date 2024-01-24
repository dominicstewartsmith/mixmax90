import { DataContext } from '../App'
import { useContext, useState } from "react";
import { GoHeart } from "react-icons/go";
import { TbReload } from "react-icons/tb";
import apiService from "../ApiService";
import { getTracksUpToNinetyMinutes } from '../helpers';
import { ICollection, ITopTracks, ITrack, IArtist, Token } from '../../types';

type PlaylistResultsPropType = {
  heartColor: string,
  resetHeartColor: Function,
  currentToken: Token,
  artistNameForDB: string,
  topTracks: ITrack[],
  artistId: string,
  clearSearchResults: () => void
}

export default function PlaylistResults ({heartColor, resetHeartColor, currentToken, artistNameForDB, topTracks, artistId, clearSearchResults}: PlaylistResultsPropType) {
  const [heartClicked, setHeartClicked] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [playingIndex, setPlayingIndex] = useState<number>(0);
  const contextValue = useContext(DataContext)

  if (!contextValue) {
    throw new Error('No context.');
  }

  const {setTopTracks, handleUpdateDB, setShowTopTracks} = contextValue;

  const heartClick = async () => {
    //TODO make heart toggleable
    setHeartClicked(true);
    resetHeartColor("red");

    let payload: ICollection = {
      artistName: artistNameForDB,
      playlists: [{ tracks: topTracks }],
    };

    await apiService.savePlaylist(payload);
    handleUpdateDB();
  };

  async function handleReloadClick() {
    setTopTracks([]);
    resetHeartColor(); //Reset heart colour
    const relatedArtists: IArtist[] = await apiService.getRelatedArtists(
      artistId, currentToken
    );

    const relatedArtistIds: string[] = relatedArtists.map(
      (artist) => artist.id
    );
    const allTracks: ITopTracks[] = await apiService.getAllTracks(
      relatedArtistIds, currentToken
    );
    const randomTracks: ITrack[] = getTracksUpToNinetyMinutes(allTracks);

    setTopTracks(randomTracks);
    clearSearchResults();
    setShowTopTracks(true);
  }

  function handlePlaySong(index: number) {
    if (playing && index != playingIndex) {
      setPlayingIndex(index)
    } else {
      setPlaying(!playing)
      setPlayingIndex(index)
    }
  }

  return (

<>

  <ul className="top-tracks-ul">
          <div className="top-tracks-ul-title-container">
            <div
              className="top-tracks-ul-title-container-icon"
              onClick={handleReloadClick}
              data-cy="reload-button"
            >
              <TbReload />
            </div>
            <div className="top-tracks-title">Click the icons to hear a preview!</div>
            <div
              className="top-tracks-ul-title-container-icon"
              id="heart"
              style={{ color: heartColor }}
              onClick={heartClick}
              data-cy="heart-button"
            >
              <GoHeart />
            </div>
          </div>
          {topTracks.map((track, index) => (
            <li className="top-tracks-li" key={index}>
              <div className="top-tracks-thumb-container">
                {track.album.images[2] && (
                  <>
                    <img
                      onClick={() => handlePlaySong(index)}
                      className="top-tracks-thumb-img"
                      src={track.album.images[2].url}
                      alt=""
                      />
                    </>
                )}
              </div>
              <div className="track-details">
                <div className="track-details-track" data-cy="track-details-track">{`${track.name}`}</div>
                <div className="track-details-artist">{`${track.artists[0].name}`}</div>
                {track.preview_url && playing && (index == playingIndex) &&
                  <audio src={track.preview_url} autoPlay/>
                }
              </div>
            </li>
          ))}
        </ul>

</>
  )
}