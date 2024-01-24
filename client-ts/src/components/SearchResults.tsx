export default function SearchResults () {
  const [topTracks, setTopTracks] = useState<ITrack[]>([]);
  const [artistId, setArtistId] = useState<string>("");
  const [heartClicked, setHeartClicked] = useState<boolean>(false);
  const [heartColor, setHeartColor] = useState<string>("#eee");
  const [artistNameForDB, setArtistNameForDB] = useState<string>("");

}