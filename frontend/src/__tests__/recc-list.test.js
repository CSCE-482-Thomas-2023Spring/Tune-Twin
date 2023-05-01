import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReccList from '../components/recc-list.js';
import fetchMock from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';

fetchMock.enableMocks();

describe('ReccList Component', () => {

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );
  });

  const mockFilters = {
    acoustics: 0.5,
    danceability: 0.5,
    energy: 0.5,
    keys: 0.5,
    liveness: 0.5,
    loudness: 0.5,
    mode: 0.5,
    tempo: 0.5,
    valence: 0.5,
  };

  const mockData = [
    {
      "track id": "123",
      "album name": "Test Album",
      "album image": "https://example.com/album-image.jpg",
      "track name": "Test Track",
      "artist name": "Test Artist",
      "artist id": "456",
      "sample": "https://example.com/sample.mp3",
      "genres": ["pop", "rock"]
    }
  ];


  const mockUserId = "12345";

  // Test if ReccList renders without crashing
  test('renders ReccList component', () => {
    render(
      <MemoryRouter>
        <ReccList filters={mockFilters} userId={mockUserId} />
      </MemoryRouter>
    );
  });

  // Test if the loading indicator is shown while fetching recommendations
  test('shows loading indicator while fetching data', async () => {
    // Mock the global fetch function to simulate a pending Promise
    global.fetch = jest.fn(() => new Promise(() => { }));

    render(
      <MemoryRouter>
        <ReccList filters={mockFilters} userId={mockUserId} />
      </MemoryRouter>
    );
    expect(screen.getByText(/^Loading/i)).toBeInTheDocument();
  });

  // Test if the loading indicator is hidden after recommendations have been fetched
  test('hides loading indicator after fetching data', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <ReccList filters={mockFilters} userId={mockUserId} />
        </MemoryRouter>
      );
    });

    await waitFor(() => expect(screen.queryByText(/^Loading/i)).not.toBeInTheDocument());
  });

  // Test if the fetched recommendations are rendered correctly, including the AudioPlayer component
  test('renders fetched recommendations with AudioPlayer', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <ReccList filters={mockFilters} userId={mockUserId} />
        </MemoryRouter>
      );
    });

    const divs = document.getElementsByClassName('ItemContainer');

    const trackElement = await screen.findByText('Test Track');
    const artistElement = await screen.findByText('Test Artist');
    const audioElement = await screen.getByTestId('audio-element').getAttribute('src');
    const imageElement = await screen.getByAltText('album-cover').getAttribute('src');

    expect(trackElement).toBeInTheDocument();
    expect(artistElement).toBeInTheDocument();
    expect(imageElement).toEqual('https://example.com/album-image.jpg');
    expect(audioElement).toEqual('https://example.com/sample.mp3');
  });

  // Test if block button is displayed when userId is not -1
  test('Displays block button(s) when userId is not -1', async () => {

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <ReccList filters={mockFilters} userId={mockUserId} />
        </MemoryRouter>
      );
    });

    const blockSongElement = screen.queryByRole('button', { name: /Block Song/i });
    const blockArtistElement = screen.queryByRole('button', { name: /Block Artist/i });
    expect(blockSongElement).toBeInTheDocument();
    expect(blockArtistElement).toBeInTheDocument();

  });

  // Test if block button is not displayed when userId is -1
  test('does not display block button when userId is -1', async () => {
    const mockUserId = "-1";

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <ReccList filters={mockFilters} userId={mockUserId} />
        </MemoryRouter>
      );
    });

    const blockSongElement = screen.queryByRole('button', { name: /Block Song/i });
    const blockArtistElement = screen.queryByRole('button', { name: /Block Artist/i });
    expect(blockSongElement).not.toBeInTheDocument();
    expect(blockArtistElement).not.toBeInTheDocument();

  });

});