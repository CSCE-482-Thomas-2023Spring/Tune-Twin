import { render, fireEvent, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { ProfileDetails } from '../components/index.js';

const getTestProfileData = (email1, password1, fName, lName) => {
    const profileData = {
        email: email1,
        password: password1,
        first_name: fName,
        last_name: lName
    };
    return profileData;
};

test('Profile Details: Display Profile Details', () => {
    render(<ProfileDetails profileData={getTestProfileData("testemail@email.com", "testpass", "Test", "User")}/>);
    const email = screen.getByTestId("profile-email");
    const password = screen.getByTestId("profile-password");
    const fName = screen.getByTestId("profile-fname");
    const lName = screen.getByTestId("profile-lname");
    expect(email).toHaveTextContent("testemail@email.com");
    expect(password).toHaveTextContent("****");
    expect(fName).toHaveTextContent("Test");
    expect(lName).toHaveTextContent("User");
});

test('Profile Details: Toggle Profile Details', () => {
    render(<ProfileDetails profileData={getTestProfileData("testemail@email.com", "testpass", "Test", "User")}/>);
    let password = screen.getByTestId("profile-password");
    expect(password).toHaveTextContent("****");
    
    let passwordButton = screen.getByTestId("profile-password-toggle");
    fireEvent.click(passwordButton);
    const passwordInput = screen.getByTestId("profile-password-input");
    expect(passwordInput).toHaveProperty("value", "testpass");

    passwordButton = screen.getByTestId("profile-password-toggle");
    fireEvent.click(passwordButton);
    expect(password).toHaveTextContent("****");
});