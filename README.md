### FIRESTORE RULES

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

      // This rule allows client to only write if the client has the lobby id of an existing lobby
      match /lobbies/{lobby} {
        allow read, write;
      }

  }
}
```

### Steps to configure

Do server steps before client steps

#### Client

-   `npm install` in client directory (to install dependencies)
-   `expo start` to run project
-   `expo build:android` to build apk file
-   Change `SERVER_URL` in firebase.utils.ts to URL provided from after deploying to firebase & in firebase cloud functions
-   Create web app in firebase and copy `firebaseConfig` to `const firebaseConfig` in firebase.utils.ts

#### Server

-   `firebase --init` in server directory
    -   Select functions
    -   Connect project
    -   If asked to merge files say N (no) to any merges (to keep any .json configurations as is)
    -   If asked to install dependencies choose Y (yes)
    -   npm run deploy from server directory
    -   Copy URL when deployment is finished
