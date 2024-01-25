import { describe, it, expect, vi, afterEach } from "vitest";
import apiService from "../ApiService";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchResults from "../components/SearchResults";
import Collection from "../components/Collection";
import userEvent from "@testing-library/user-event";
import { searchResultsData, fakeArtist, fakeCollections, fakeDeletedData } from "./test-data";
import SearchResultItem from "../components/SearchResultItem";
import CollectionListItem from "../components/CollectionListItem";

describe("SearchResults component tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should show a list of artists when the user searches", () => {
    const searchResults = searchResultsData;
    render(<SearchResults searchResults={searchResults} />);
    expect(screen.getByText("Taylor Swift")).toBeDefined();
  });

  it("should show the playlist when an artist is clicked", async () => {
    const fakePlaylistFunction = vi.fn();

    render(
      <SearchResultItem
        handleArtistClick={fakePlaylistFunction}
        artist={fakeArtist}
        index={8}
      />
    );

    const artist = screen.getAllByTestId("artist-search-item");
    await userEvent.click(artist[0]);

    expect(fakePlaylistFunction).toHaveBeenCalled();
  });

  it("should display collections at the bottom", () => {
    render(<Collection collectionsDB={fakeCollections}/>)
    expect(screen.findAllByTestId('playlist-song-name')).toBeDefined();
  })

  it("should delete a playlist", async () => {
    render(<Collection collectionsDB={fakeCollections}/>);
    const fakeDeletePlaylist = () => {
      const fakeData = fakeDeletedData
      return fakeData;
    }
    
    const spy = vi.spyOn(apiService, 'deletePlaylist').mockImplementation(fakeDeletePlaylist);

    const deleteButton = screen.getAllByTestId('collections-playlist-delete');
    await userEvent.click(deleteButton[2]);

    // render(<Collection collectionsDB={fakeDeletedData}/>)

    expect(spy).toHaveBeenCalled()
    expect(screen.getByText('polearm')).toBeUndefined();
  })
});
