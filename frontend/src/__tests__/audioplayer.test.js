import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AudioPlayer from '../components/audioplayer.js';

describe('AudioPlayer Component', () => {
    const mockAudioSrc = 'https://example.com/audio.mp3';
    const mockImageSrc = 'https://example.com/image.jpg';
    const mockId = '123';

    test('renders AudioPlayer component with play button', () => {
        render(<AudioPlayer audioSrc={mockAudioSrc} imageSrc={mockImageSrc} id={mockId} />);

        const audioElement = screen.getByTestId('audio-element');
        const imageElement = screen.getByAltText('album-cover');
        const buttonElement = screen.getByTestId('audio-button');

        expect(audioElement).toBeInTheDocument();
        expect(audioElement.src).toEqual(mockAudioSrc);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement.src).toEqual(mockImageSrc);
        expect(buttonElement).toBeInTheDocument();
    });

    test('calls handlePlay function when play button is clicked', () => {
        const handlePlayMock = jest.fn();
        render(<AudioPlayer audioSrc={mockAudioSrc} imageSrc={mockImageSrc} id={mockId} handlePlay={handlePlayMock} />);

        const buttonElement = screen.getByTestId('audio-button');

        fireEvent.click(buttonElement);

        expect(handlePlayMock).toHaveBeenCalledTimes(1);
        expect(handlePlayMock).toHaveBeenCalledWith(mockId);
    });

    test('displays pause icon when audio is playing', () => {
        render(<AudioPlayer audioSrc={mockAudioSrc} imageSrc={mockImageSrc} id={mockId} handlePlay={() => { }} />);

        const buttonElement = screen.getByTestId('audio-button');
        const audioElement = screen.getByTestId('audio-element');

        fireEvent.play(audioElement); // Manually trigger the 'play' event

        const pauseIconElement = screen.getByTestId('pause-icon');
        const playIconElement = screen.queryByTestId('play-icon');

        expect(pauseIconElement).toBeInTheDocument();
        expect(playIconElement).toBeNull();
    });

    test('displays play icon when audio is paused', () => {
        render(<AudioPlayer audioSrc={mockAudioSrc} imageSrc={mockImageSrc} id={mockId} handlePlay={() => { }} />);

        const buttonElement = screen.getByTestId('audio-button');
        const audioElement = screen.getByTestId('audio-element');

        fireEvent.play(audioElement); // Manually trigger the 'play' event
        fireEvent.pause(audioElement); // Manually trigger the 'pause' event

        const playIconElement = screen.getByTestId('play-icon');
        const pauseIconElement = screen.queryByTestId('pause-icon');

        expect(playIconElement).toBeInTheDocument();
        expect(pauseIconElement).toBeNull();
    });

    test('displays "No Preview" message when audioSrc is empty', () => {
        render(<AudioPlayer audioSrc="" imageSrc={mockImageSrc} id={mockId} handlePlay={() => { }} />);

        const noPreviewElement = screen.getByText('No Preview');
        expect(noPreviewElement).toBeInTheDocument();
    });
});
