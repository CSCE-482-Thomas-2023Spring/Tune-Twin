import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { ProfileDetails } from '../components/index.js';

beforeEach(() => {
    fetch.resetMocks();
});

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

test('Profile Details: Update Profile ELement', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 200 }));
    render(<ProfileDetails profileData={getTestProfileData("testemail@email.com", "testpass", "Test", "User")}/>);

    let passwordButton = screen.getByTestId("profile-password-toggle");
    fireEvent.click(passwordButton);
    let passwordInput = screen.getByTestId("profile-password-input");
    expect(passwordInput).toHaveProperty("value", "testpass");
    fireEvent.change(passwordInput, { target: { value: "newpass"}});
    expect(passwordInput.value).toBe("newpass");

    passwordButton = screen.getByTestId("profile-password-submit");
    fireEvent.click(passwordButton);
    await waitFor(() => {
        const details = screen.getByTestId("profile-details");
        expect(details).toHaveTextContent("Profile information updated successfully");
    })
});