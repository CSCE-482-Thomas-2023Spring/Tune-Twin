import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import Searchbar from '../components/searchbar.js';

fetchMock.enableMocks();

describe('Searchbar', () => {

    beforeEach(() => {
        fetchMock.resetMocks();

        // Set up the global mock response for each test
        const mockResponse = JSON.stringify({
            tracks: {
                items: [
                    {
                        name: 'Sample Song',
                        id: '12345',
                        artists: [{ name: 'Sample Artist' }],
                        external_urls: {},
                        album: {
                            images: [{}, {}],
                            release_date: '2023-04-29',
                        },
                    },
                ],
            },
        });

        fetchMock.mockResponse(mockResponse);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders Searchbar component', () => {
        render(
            <Router>
                <Searchbar searchString="" />
            </Router>
        );
        expect(screen.getByPlaceholderText('Type Song to Search')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('displays search results when typing', async () => {
        render(
            <Router>
                <Searchbar searchString="" />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Type Song to Search'), {
            target: { value: 'Sample' },
        });

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/Autocomplete?query=Sample');
        });

        const targetText = '(2023) Sample Song - Sample Artist';

        const customMatcher = (content, element) => {
            if (element.textContent === targetText) {
                return true;
            }
            return Array.from(element.children).some(
                (child) => child.textContent && targetText.includes(child.textContent)
            );
        };

        // Wait for the search result to be present in the document
        await waitFor(() => {
            const foundResults = screen.getAllByText(customMatcher);
            expect(foundResults.length).toBeGreaterThan(0);
        });
    });

    test('handles clicking outside of search results', async () => {
        render(
            <Router>
                <Searchbar searchString="" />
            </Router>
        );
        fireEvent.change(screen.getByPlaceholderText('Type Song to Search'), {
            target: { value: 'Sample' },
        });

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/Autocomplete?query=Sample');
        });

        const targetText = '(2023) Sample Song - Sample Artist';

        const customMatcher = (content, element) => {
            if (element.textContent === targetText) {
                return true;
            }
            return Array.from(element.children).some(
                (child) => child.textContent && targetText.includes(child.textContent)
            );
        };

        fireEvent.mouseDown(document.body);
        expect(screen.queryByText(customMatcher)).not.toBeInTheDocument();

    });

    test('does not make server request when typing only blank space', async () => {
        render(
            <Router>
                <Searchbar searchString="" />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Type Song to Search'), {
            target: { value: '   ' }, // Blank spaces
        });

        await waitFor(() => {
            expect(fetch).not.toHaveBeenCalled();
        });
    });

    test('does not make server request when there is nothing in search bar', async () => {
        render(
            <Router>
                <Searchbar searchString="" />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Type Song to Search'), {
            target: { value: '' }, // Empty space
        });

        await waitFor(() => {
            expect(fetch).not.toHaveBeenCalled();
        });
    });

});
