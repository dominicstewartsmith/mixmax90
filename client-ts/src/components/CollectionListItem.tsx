import { ITopTracks } from "../../types"
import { useState } from 'react'

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
            {/* //TODO Give the buttons a class and some margin left so they are indented */}
            <button onClick={() => {
              setShowSongs(p => {
                let update: boolean[] = [...p]
                update[index] = !update[index]
                return update;
              })
            }}>
              Playlist #{index + 1}
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