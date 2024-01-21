import { ITopTracks } from "../../types"
import { useEffect, useState } from 'react'

interface CollectionListItemProps {
  playlists: ITopTracks[]
}
export default function CollectionListItem({ playlists }: CollectionListItemProps) {

  const [showSongs, setShowSongs] = useState<boolean[]>(
    new Array(playlists.length).fill(false)
    );

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
            }}>
              <h1>Playlist #{index + 1}</h1>
            </button>
            <button onClick={() => {console.log(playlist._id)}}>Delete</button>
            <br />

            {showSongs[index] == true &&
              playlist.tracks.map(track => {
                return (
                  <p>
                    <div className="coll-artist">{track.artists[0].name}</div>
                    <div className="coll-track">{track.name}</div>
                  </p>
                )
              })
            }
          </div>
        )
      })}
    </>
  )
}