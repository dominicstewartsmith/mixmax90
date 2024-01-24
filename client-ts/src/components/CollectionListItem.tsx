import { ITopTracks } from "../../types"
import { useState, useContext } from 'react'
import apiService from "../ApiService"
import { DataContext } from "../App"

interface CollectionListItemProps {
  playlists: ITopTracks[],
  parentID: string | undefined
}
export default function CollectionListItem({ playlists, parentID }: CollectionListItemProps) {
  const [showSongs, setShowSongs] = useState<boolean[]>(
    new Array(playlists.length).fill(false)
  );

  const contextValue = useContext(DataContext)

  if (!contextValue) {
    throw new Error('No context.');
  }

  const {handleUpdateDB} = contextValue;

  return (
    <>
      {playlists.map((playlist, index) => {
        return (
          <div key={index}>
            <button onClick={() => {
              setShowSongs(p => {
                let update: boolean[] = [...p]
                update[index] = !update[index]
                return update;
              })
            }} className="collections-playlist-toggle" data-cy="collections-playlist-toggle">
              Playlist #{index + 1}
            </button>
            <button onClick={async () => {
              await apiService.deletePlaylist(parentID, playlist._id);
              handleUpdateDB();
              }} className="collections-playlist-delete" data-cy="collections-playlist-delete">Delete</button>
            <br />

            {showSongs[index] == true &&
              playlist.tracks.map(track => {
                return (
                  <div className="playlist-container" key={track.id}>
                    <div className="playlist-artist-name">{track.artists[0].name}</div>
                    <div className="playlist-song-name" data-cy="playlist-song-name">{track.name}</div>
                  </div>
                )
              })
            }
          </div>
        )
      })}
    </>
  )
}