import { describe, it, expect, vi, afterEach } from "vitest";
import apiService from "../ApiService";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchResults from "../components/SearchResults";
import userEvent from "@testing-library/user-event";
import { searchResultsData, fakePlaylist } from "./test-data";

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
    const searchResults = searchResultsData;
    
    const fakePlaylistFunction = vi.fn()
    
    render(<SearchResults searchResults={searchResults} handleArtistClick={fakePlaylistFunction}/>);

    const artist = screen.getAllByTestId("artist-search-item");
    await userEvent.click(artist[0]);

    expect(fakePlaylistFunction).toHaveBeenCalled();


    const spy = vi.spyOn(SearchResults, SearchResults.handleArtistClick).mockImplementation(fakePlaylist);
});
});
