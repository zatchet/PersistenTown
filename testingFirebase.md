# Manually Testing Firebase

Firebase functionality does not need to be directly tested, but its integration with our app does. However, Firebase emulators, which are used for local testing, were incompatible with our project due to its requirement of a higher node version and its usage of Mocha instead of Jest.

To test our usage of Firebase, we had to manually test creating and signing into an account, and displaying that account's information.
This document details the steps we followed to test that Firebase accurately creates and stores user accounts, then displays that data.

## Preliminary Steps

This project runs on Node.js version 16.20.2, and npm version 8.19.4. `npm install` should be run on the base directory, as well as in the `\frontend` and `\townService` directories. Additionally, the appropriate inputs should be placed in `.env` files in the frontend and townService directories. Following this, tests can be ran locally by running `npm start` in these two directories. Instructions for all of these steps are outlined in the README.md located in the base directory. With both services running, a local version can be ran on a browser tab at URL localhost `http://localhost:3000/`

In order to access Firebase Console (which contains user authentication info and stored user account info) a gmail account with access and editing permissions has been prepared, with email address "cs4530group110@gmail.com" and password "CS4530group110!!!", with apostrophes removed.

Some resources to use for generating credentials to test with:

- [LastPass random username generator](https://www.lastpass.com/features/username-generator)
- [LastPass random password generator](https://www.lastpass.com/features/password-generator)
- [Temporary mail address generator](temp-mail.org/en/)

## Creating an account

We tested out various cases, both the happy and sad path:

Happy Path:

1. When given a unique username, an email that hasn't been registered, and a password of 6 characters or more, an account is successfully created, the user is automatically signed in, and they are redirected to the TownSelection screen.

Sad Path (Error cases):
1. Display name is not unique
2. Email is already registered
3. Password is less than 6 characters long
4. Any field is empty (all are required)

### Test Happy Path
1. Generate a random display name, email, and password using the resources listed above
    1. Ensure the password length is 6 characters or more
1. Navigate to local instance of PersistenTown
2. Scroll to the 'Create Account' section
3. Enter in display name, email, and password into the fields labeled as such
4. Click the 'Create Account' button below the form
5. __Verify the following:__
    1. The page rerenders, displaying the TownSelection screen
    1. A green toast appears at the bottom saying the account was successfully created
    1. The 'Select a username' box shows the display name registered with in an uneditable text box
    1. Towns are able to be created
    1. Towns are able to be joined
    1. Further below, the profile component is rendered with the display name, email, and no game history
    1. A sign out button appears below the profile component
    1. Clicking on sign out returns you to the original login page
    1. Navigate to Firebase console, click on the Authentication tab on the lefthand side, and verify the email appears in the list of users
        1. [Link here](console.firebase.google.com/project/persistentown/authentication/users) to see list of users
6. For good measure, attempt to sign in using the same credentials to ensure the account is maintained in the database

### Test Error Cases

__1 - Display name is not unique__

1. Following the steps above to create an account, record the display name (A.K.A., duplicate display name) used to register
2. Generate new credentials for the email and/or password
    1. An email address can only have one account associated with it
2. Fill out the Create Account form using the newly generated email address, a password with more than 6 characters, and the duplicate display name
3. Click on the Create Account button
4. __Verify the following:__
    1. A red toast appears at the bottom titled 'Error creating account', with description 'Display name is taken. Please choose a different display name.'
    2. The form values remain
    3. The screen remains in the original home screen
    1. Navigate to Firebase console, click on the Authentication tab on the lefthand side, and verify the email does NOT in the list of users
        1. [Link here](console.firebase.google.com/project/persistentown/authentication/users) to see list of users

__2 - Email is already registered__
1. Following the steps above to create an account, record the email used to register (A.K.A., duplicate email address) 
2. Generate new credentials for the display name and/or password
2. Fill out the Create Account form using the newly generated display name, the duplicate email address, and the password
3. Click on the Create Account button
4. __Verify the following:__
    1. A red toast appears at the bottom titled 'Error creating account', with description 'Email address is already in use. Please use a different email address.
    2. The form is completely reset
    3. The screen remains in the original home screen
    1. Navigate to Firebase console, click on the Authentication tab on the lefthand side, and verify the email does NOT in the list of users
        1. [Link here](console.firebase.google.com/project/persistentown/authentication/users) to see list of users

__3 - Password is less than 6 characters__
1. Generate a display name and temporary email address using the credentials above
2. Fill out the Create Account form using those credentials, with password having a length less than 6
    1. For good measure, attempt with different lengths of passwords (2 characters, 5 characters, etc.)
3. Click on the Create Account button
4. __Verify the following:__
    1. A red toast appears at the bottom titled 'Error creating account', with description 'Password must be at least 6 characters.'
    2. The form is completely reset
    3. The screen remains in the original home screen
    1. Navigate to Firebase console, click on the Authentication tab on the lefthand side, and verify the email does NOT in the list of users
        1. [Link here](console.firebase.google.com/project/persistentown/authentication/users) to see list of users

__4 - Any field is left empty__

** Test different combinations of empty fields — all are empty, just the display name, just the email, just the password — as many as are needed to ensure confidence.

1. Ensure the form starts off with no error messages
2. Leave at least one field empty (see note above)
3. __Verify the following (all cases should have this behavior):__
    1. A red toast appears at the bottom titled 'Error creating account', with description 'All fields are required.'
    1. The form is completely reset
    1. Navigate to Firebase console, click on the Authentication tab on the lefthand side, and verify the email does NOT in the list of users
        1. [Link here](console.firebase.google.com/project/persistentown/authentication/users) to see list of users

This component should also highlight empty textboxes show red text saying 'All fields are required.' whenever the user types into a field(s) and then deletes all of it.



## Signing into an account

0. Prior to all steps
    1. Log into the "cs4530..." google account.
        1. Navigate to the Firebase console for this project
            * console.firebase.google.com/project/persistentown
        2. Navigate to the Authentication tab, then Users. Remove any user with identifier that is this email address
            * console.firebase.google.com/project/persistentown/authentication/users
            * This is necessary to test account creation upon signin using a google account with no Persistentown account associated
    2. Navigate to temp-mail.org/en/
        1. Create a temporary email
        2. Create an account on Persistentown using this email, record the Display Name and Password used to create the account
            * persistentown.onrender.com
        3. Sign out of the account on Persistentown, leaving you on the front login page of the website
1. To test:
    1. Signing in using an email account:
        1. When the signin credentials are incorrect and the Sign In button is selected:
            1. If neither the email or password field is populated
                * A toast should pop up stating an invalid email address
            2. If an invalid email address is provided (no @)
                * A toast should pop up stating an invalid email address
            3. If a valid email address is provided, with no password
                * A toast should pop up stating password is required
            4. If a valid email address is provided with a password, and if the email is not associated with an account
                * A toast should pop up stating invalid credentials
            5. If an email associated with an account is provided with an invalid password
                * A toast should pop up stating invalid credentials
        2. Input the temporary email and password of the account registered earlier to the respective fields of the sign in
            1. With valid account credentials inputted and the sign in button selected
                * The front page should redirect you to the town selection screen. 
                * The uneditable Select a Username field should reflect the account display name selected during account creation
                * The account information window at the bottom of the page should show the account information associated with the email
                * A town can be created from this page, with username in the town being the display name
                * A town can be joined from this page, with username in the town being the display name
                * The Sign Out button at the bottom of the page can be selected to log the account out, redirecting the user back to the login splash
    2. Signing in using a Google account:
        1. On Firebase Console, within the authentication tab
            * No account with Identifier as "cs4530group110@gmail.com" should exist
        2. When the Sign In with Google button is selected, and the "cs4530..." account credentials/already-logged-in google account are used to log in on the popup
            1. On the Persistentown page
                * The front page should redirect you to the town selection screen. 
                * The uneditable Select a Username field should read "CS4530 Grouponeten"
                * The account information window at the bottom of the page should show "CS4530 Grouponeten", and "Email: cs4530group110@gmail.com"
                * A town can be created from this page, with username in the town being the display name
                * A town can be joined from this page, with username in the town being the display name
                * The Sign Out button at the bottom of the page can be selected to log the account out, redirecting the user back to the login splash
            2. On Firebase Console, within the authentication tab
                * An account with Identifier as "cs4530group110@gmail.com" should exist, created and signed in on the current date
        3. After signing in for the first time using this google account, the sign out button at the bottom of the page is selected
            1. A new instance of Persistentown is opened, and the Sign In with Google button is selected.
                1. On the Persistentown page
                * The front page should redirect you to the town selection screen. 
                * The uneditable Select a Username field should read "CS4530 Grouponeten"
                * The account information window at the bottom of the page should show "CS4530 Grouponeten", and "Email: cs4530group110@gmail.com"
                * A town can be created from this page, with username in the town being the display name
                * A town can be joined from this page, with username in the town being the display name
                * The Sign Out button at the bottom of the page can be selected to log the account out, redirecting the user back to the login splash
            2. On Firebase Console, within the authentication tab
                * A single account eith Identifier as "cs4530group110@gmail.com" should exist, as the same account created earlier, without any new account having been created
    3. To test the Forgot Password? button
        1. A separate email should be created on temp-mail.org, and the tab left open
            1. This email should be entered into the email field of the Sign In, and the Forgot Password button selected
                * No password reset email should be recieved in the inbox of the temp-mail tab (waiting ~10 seconds is sufficient)
        2. The "cs4530..." email address should be entered into the email field of the Sign In, and the Forgot Password button selected
            1. In the "cs4530..." inbox
                1. A password reset email should be recieved with a link inside, and the linked clicked
                2. A new password should be entered and submitted, and recorded on the side.
            2. In the Persistentown website, with the "cs4530..." email in the Sign In area
                1. The old password should be entered into the password box, and the Sign In button selected
                    * A toast should appear stating invalid credentials were provided
                2. The new password should be entered into the password box, and the Sign In button selected
                    * A successful login will occur, and the user will be redirected to the town selection screen




## Displaying account information
0. Prior to all steps
    1. Navigate to temp-mail.org/en/
        1. Create two temporary emails
        2. For each email, create an account on Persistentown, record the Display Name and Password used to create the account
            * persistentown.onrender.com
            * These accounts will be referred to as Account 1 and Account 2 
        3. On browser of choice, open Persistentown, and log in using Account 1
        4. Using a separate browser instance, or an incognito tab, open Persistentown and log in using Account 2
1. To Test:
    1. In the town selection screen of Account 1
        1. Viewing My Account Information 
            * At the bottom of the page, a box with title My Account Information should be visible
            * The display name of Account 1 should be visible
            * Text stating "Email: " then Account 1's email should be visible
            * Text stating "No game history yet" should be visible
            * A Sign Out button should be visible
            * When the Sign Out button is clicked, the user is redirected back to the login screen
        2. Following this, input the Account 1 credentials to log back in
    2. Account 1 should create a town, and Account 2 should join the created town.
    3. In the newly created town
        1. Accounts 1 and 2 should navigate to a Connect Four area, and play a game in which Account 1 is victorious.
        2. Both accounts will then leave the game and game area
        3. Account 1 will scroll down and disconnect
        4. In Account 1's town selection screen
            1. In the My Account Information area
                * Display name and email of the user will be visible
                * A display for the number of wins, losses, and ties for all implemented games will be displayed
                * The only WLT record which is not all zero values for these games will be for Connect Four
                * The WLT record for Connect Four will read "1 - 0 - 0"
                * An object containing a list of Account 1's match history is visible
                * A single row is on this list, containing the current date, "Connect Four" representing the game type, a "Win" result, and the display name of Account 2 (representing the opponent), is visible.
            2. Account 1 will rejoin the created town
        5. In Account 2's town selection screen
            1. In the My Account Information area
                * Display name and email of the user will be visible
                * A display for the number of wins, losses, and ties for all implemented games will be displayed
                * The only WLT record which is not all zero values for these games will be for Connect Four
                * The WLT record for Connect Four will read "0 - 1 - 0"
                * An object containing a list of Account 2's match history is visible
                * A single row is on this list, containing the current date, "Connect Four" representing the game type, a "Lose" result, and the display name of Account 1, is visible.
            2. Account 1 will rejoin the created town
        6. Accounts 1 and 2 should navigate to a TicTacToe area, and play two games, the first in which is a tie, the second in which Account 1 will leave after making a move, causing Account 2 to win the game
        7. Both accounts will then leave the game and game area
        8. Account 1 will scroll down and disconnect
        9. In Account 1's town selection screen
            1. In the My Account Information area
                * The WLT record for Connect Four will read "1 - 0 - 0"
                * The WLT record for TicTacToe will read "0 - 1 - 1"
                * An object containing a list of Account 1's match history is visible
                * Three rows are on this list
                * The top row contains the current date, Connect Four, Win, and Account 2's display name
                * The second row contains the current date, TicTacToe, Tie, and Account 2's display name
                * The third row contains the current date, TicTacToe, Lose, and Account 2's display name
                8. Account 1 will scroll down and disconnect
        10. Account 2 will scroll down and disconnect
        11. In Account 2's town selection screen
            1. In the My Account Information area
                * The WLT record for Connect Four will read "0 - 1 - 0"
                * The WLT record for TicTacToe will read "1 - 1 - 0"
                * An object containing a list of Account 1's match history is visible
                * Three rows are on this list
                * The top row contains the current date, Connect Four, Lose, and Account 1's display name
                * The second row contains the current date, TicTacToe, Tie, and Account 1's display name
                * The third row contains the current date, TicTacToe, Win, and Account 1's display name
