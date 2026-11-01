# SLDHA Board Connect v1.2 — Google Login Setup

## What this build does
- Uses Google Sign-In with Firebase Authentication.
- Checks a Firestore `boardMembers/{firebaseUID}` document with `active: true`.
- Only then reads `boardSettings/resources` and displays dashboard links.
- Uses GitHub Pages for public static files; no private data should be committed to GitHub.
- **This is a pilot; test before handling sensitive Board records.**

## 1. Add Firebase configuration
Firebase Console > Project settings > General > Your apps > SDK setup and configuration > Config. Copy the values into `firebase-config.js`, replacing all `PASTE_...` values. Do not put service account secrets into the repository.

## 2. Create Firestore database
Firebase Console > Databases & Storage > Firestore Database > Create database. Choose a supported location and **production mode**. Before opening access, publish the rules from `firestore.rules` in Firestore > Rules. Do not use permissive test-mode rules for this app.

## 3. Deploy files
Upload the contents of the `sldha-board-connect` folder (not the outer folder) to your GitHub Pages repository. Ensure the domain `sldha-board-connect.github.io` is authorized in Firebase Authentication > Settings > Authorized domains.

## 4. Enroll first Board member
Open the deployed app, sign in with Google, and copy the displayed Firebase UID. Sign-in will initially say not approved; this is expected. In Firebase Console > Firestore Database > Data, create collection `boardMembers` and a document whose ID is that UID, with boolean field `active` set to `true`. Only a trusted Firebase project administrator should add members. Sign out and sign back in (or refresh) to verify.

## 5. Configure links privately
In Firestore Database > Data, create collection `boardSettings`, document ID `resources`, with optional string fields `meetings`, `documents`, `reports`, `announcements`, `fundraising`, `directory`, each containing an approved HTTPS resource URL. Do **not** put these links in public `config.js`. Restrict actual Google Drive documents to the intended Google accounts separately: Firebase approval does not grant Google Drive permissions.

## 6. Test
- An unapproved Google account must be denied and must not read `boardSettings/resources`.
- An approved account should see the Board dashboard and configured links.
- A signed-out user should not see the Board dashboard.
- Test with a fresh/private browser window, and on a phone.

## Notes
The Firebase web `apiKey` is a public configuration identifier, not a service-account secret. Firestore Security Rules are the actual access enforcement. Anyone may still view the public HTML/CSS/JS and image files on GitHub Pages. A member UID is an identifier, not a password. The app does not yet include a full meeting database, file upload system, or administrator management interface.
