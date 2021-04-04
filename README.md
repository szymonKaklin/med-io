![alt text](./app/assets/medio_logo_outlined.png?raw=true)

## What is it?

Med.io is being built as part of an MEng university project. The app will allow users to identfiy pills using their smartphone camera, as well as store prescription information tied to their specific user account.

### TODO

- ~~Prescription editing/adding~~
  - ~~Add optional image to prescriptions~~
  - ~~Specific prescription updating~~
- ~~Result page rendering conditional on result of post request~~
  - Support for multiple prescriptions of same medicine
- ~~Back-end~~
  - ~~Be able to post image to model on local server and obtain result~~
  - ~~Set up google cloud instance~~
  - ~~Can post 1 or 9 images to server~~
  - Update all this using this years model
- ~~Firebase~~
  - ~~User account creation~~ + Handle errors, display messages
    - User login
    - User sign-out
    - Firestore

### Bugs

- Android
  - Flash doesn't turn on
  - ~~Prescription Add screen doesnt render the medicine name after choosing a medicine from the drop down picker~~
  - ~~Prescription directions box/submit button looks weird in the scroll view~~

### General Issues

- Result screen text font size is too small for medicines with long names
  - ~~content text also looks weird at times~~
- You can send multiple post requests by pressing the camera button multiple times
- You can add multiple prescriptions at the same time by pressing the add prescription button too quickly
- Prescription list does not automatically refresh when a prescription is removed - a manual refresh by pulling down on the list is required
- Login Password field glitches out visually on long strings; but validates correctly
