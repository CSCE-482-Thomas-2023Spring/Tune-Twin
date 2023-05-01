import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BlackList } from '../components/index.js';

beforeEach(() => {
    fetch.resetMocks();
});

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

test('Blacklist: Remove only song', async () => {
    const song = [[
        "test-id",
        "Test Song Name",
        "test-song-image"
    ]];

    fetch.mockResponseOnce(JSON.stringify({ status: 200 }));
    render(<BlackList profileData={getTestProfileData(song, [])}/>);

    
    const blacklistButton = screen.getByTestId("bleb-test-test-id");
    fireEvent.click(blacklistButton);
    await waitFor(() => {
        const blacklist = screen.getByTestId("blacklist-elements");
        expect(blacklist).toHaveTextContent("Your blacklist has been updated.");
    })
});