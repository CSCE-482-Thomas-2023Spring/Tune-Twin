import { render, fireEvent, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { BlackList } from '../components/index.js';

const getTestProfileData = (songs, artists) => {
    const profileData = {
        email: 'testemail@gmail.com',
        blacklist_songs: songs,
        blacklist_artists: artists
    };
    return profileData;
};

test('Blacklist: No blacklist elements', () => {
    render(<BlackList profileData={getTestProfileData([], [])}/>);
    const blacklistElements = screen.getByTestId("blacklist-elements");
    expect(blacklistElements).toHaveTextContent("There is nothing on your black list!");
});

test('Blacklist: One blacklist song', () => {
    const song = [[
        "test-id",
        "Test Song Name",
        "test-song-image"
    ]];

    render(<BlackList profileData={getTestProfileData(song, [])}/>);
    const blacklistElements = screen.getByTestId("blacklist-elements");
    expect(blacklistElements).toHaveTextContent("Test Song Name");
});

test('Blacklist: One blacklist artist', () => {
    const artist = [[
        "test-id",
        "Test Artist Name",
        "test-artist-image"
    ]];

    render(<BlackList profileData={getTestProfileData([], artist)}/>);
    const blacklistElements = screen.getByTestId("blacklist-elements");
    expect(blacklistElements).toHaveTextContent("Test Artist Name");
});

test('Blacklist: Blacklist songs & artists', () => {
    const song = [[
        "test-id",
        "Test Song Name",
        "test-song-image"
    ]];
    const artist = [[
        "test-id",
        "Test Artist Name",
        "test-artist-image"
    ]];

    render(<BlackList profileData={getTestProfileData(song, artist)}/>);
    const blacklistElements = screen.getByTestId("blacklist-elements");
    expect(blacklistElements).toHaveTextContent("Test Song Name");
    expect(blacklistElements).toHaveTextContent("Test Artist Name");
});