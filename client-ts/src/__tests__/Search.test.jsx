import { describe, it, expect, vi, afterEach } from 'vitest';
import apiService from '../ApiService';
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import Search from '../components/Search'
import userEvent from '@testing-library/user-event'
import {searchData} from './test-data'

describe('Search component tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  })

  it('should render the search bar on the page', () => {
    render(<Search />)
    expect(screen.findByTestId("search-bar")).toBeDefined()
  });

  it('should show a list of artists when the user searches', async () => {
    const fake_getArtistId = () => {
      const fake_response = searchData
      return fake_response
    }

    const fake_token = {token: 'fake', time: 12345}
    const spy = vi.spyOn(apiService, 'getArtistId').mockImplementation(fake_getArtistId)

    render(<Search currentToken={fake_token}/>)
    const searchBar = screen.getByTestId('search-bar');
    const searchButton = screen.getByTestId('search-button');
    const searchValue = 'ABBA'
    await userEvent.type(searchBar, searchValue);
    await userEvent.click(searchButton);

    expect(spy).toHaveBeenCalledWith(searchValue, fake_token);
    expect(screen.findByText('Taylor Swift')).toBeDefined();
  })
});