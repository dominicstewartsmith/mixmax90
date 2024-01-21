import { ITopTracks } from "../../types"
import { useState } from 'react'

interface CollectionListItemProps {
  playlists: ITopTracks[]
}
export default function CollectionListItem({ playlists }: CollectionListItemProps) {

  const [showSongsIndex, setShowSongsIndex] = useState<number>(0);
  const [showSongs, setShowSongs] = useState<boolean>(false);

  return (
    <>
      {playlists.map((playlist, index) => {
        return (
          <div key={index}>
            <button onClick={() => {
              setShowSongsIndex(index);
              setShowSongs(!showSongs);
            }}>
              <h1>Playlist #{index + 1}</h1>
            </button>
            <br />

            {showSongs && showSongsIndex == index &&
              playlist.tracks.map(track => {
                return <p>{track.name}</p>
              })
            }
          </div>
        )
      })}
    </>
  )
}