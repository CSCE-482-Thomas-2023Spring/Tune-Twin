import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { NavBar } from '../components/index.js';

test('Navigation Bar: Not Logged in', () => {
    render(<MemoryRouter initialEntries={['/']}><NavBar userId="-1" /></MemoryRouter>);
    const navbar = screen.getByTestId("navbar-test");

    expect(navbar).toHaveTextContent("Login");
});

test('Navigation Bar: Logged in', () => {
    render(<MemoryRouter initialEntries={['/']}><NavBar userId="testuser@email.com" /></MemoryRouter>);
    const navbar = screen.getByTestId("navbar-test");

    expect(navbar).toHaveTextContent("Profile");
});