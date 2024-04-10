# Manually Testing Firebase

To test our usage of Firebase, we had to manually test creating and signing into an account, and displaying that account's information.
This document details the steps we followed to test that Firebase accurately creates and stores user accounts, then displays that data.

## Preliminary Steps

This project runs on Node.js version 16.20.2, and npm version 8.19.4. `npm install` should be run on the base directory, as well as in the `\frontend` and `\townService` directories. Additionally, the appropriate inputs should be placed in `.env` files in the frontend and townService directories. Following this, tests can be ran locally by running `npm start` in these two directories. Instructions for all of these steps are outlined in the README.md located in the base directory. With both services running, a local version can be ran on a browser tab at URL localhost `http://localhost:3000/`

In order to access Firebase Console (which contains user authentication info and stored user account info) a gmail account with access and editing permissions has been prepared, with email address "cs4530group110@gmail.com" and password "CS4530group110!!!", with apostrophes removed.

## Creating an account

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

