### Project structure on Git
- client (code for react native app)
- server (code for firebase cloud functions)
- documentation (contains DocumentationTicTacToeOnlineMobileAppFinal.pdf, firestore_final.pptx, firestore_final.pdf

### Development
-	Developed with React Native and Expo.io to build Android APK
-	Written with TypeScript.
-	Configured with NoSQL database

### Submission

 1. Markdown file 1a-d  - documentation (DocumentationTicTacToeOnlineMobileAppFinal.pdf)
 2. Source code of mobile application and web / backend API. - In this private repository on Github. 
 3. Architecture diagram describing the infrastructure components. -documentation ( firestore_final.pptx, firestore_final.pdf) - Youtube: https://youtu.be/UVOjXCWH298
 4. Android application bundle (APK) file.  - Google Drive :  https://drive.google.com/drive/folders/1VT2PItari5BucA8ux1QjgKKwRFeF-0mx?usp=sharing 
 5. Sample screen capture video walking through how the application works. - Youtube : https://youtu.be/NEfy2yENzxc
 6. Tic Tac Toe Online Video Walk Through Playlist- Youtube: https://www.youtube.com/playlist?list=PLKgIpFsVwR5LNHxMHDZx73OqxpuF5MLME 



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
