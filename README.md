![alt text](./app/assets/medio_logo_outlined.png?raw=true)

## What is it?

Med.io is a React Native, iOS/Android app being built as part of an MEng university project. The app allows users to identfiy a selection of pills using their smartphone camera, as well as store prescription information on these pills, all tied to their specific user account.

Note: this is a proof of concept project, pill identification results are not always accurate and should not be used to as a guide.

## Demo

<p align="center">
    <img src="./app/assets/medio-demo.gif" width="240" height="427">
</p>

## Core Features

- Take a picture of a pill (or upload one from your image library) to post it to a CNN model hosted on Google Cloud for identification.
- If the pill is present in our database and has been identified you can:
  - Add it to your prescriptions OR see the prescription for this medicine if one is already present in your saved prescriptions
- Add prescriptions for a medicine and select an image to represent the prescription
- Create a user account (using Firebase) and store your prescriptions on the cloud, enabling acess to your saved prescriptions across devices.

### To-do list

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
  - ~~User account creation~~
    - ~~Handle errors, display messages~~
  - ~~User login~~
  - ~~User sign-out~~
  - ~~Firestore~~
    - ~~Save/load/update prescriptions to/from firestore~~

### Identified Bugs

- Android
  - Flash doesn't turn on
  - ~~Prescription Add screen doesnt render the medicine name after choosing a medicine from the drop down picker~~
  - ~~Prescription directions box/submit button looks weird in the scroll view~~

### General Issues

- Result screen text font size is too small for medicines with long names
  - ~~content text also looks weird at times~~
- ~~You can send multiple post requests by pressing the camera button multiple times~~
- ~~You can add multiple prescriptions at the same time by pressing the add prescription button too quickly~~
- Prescription list does not automatically refresh when a prescription is removed - a manual refresh by pulling down on the list is required
  - This affects updating prescriptions in firestore as well
- ~~Login Password field glitches out visually on long strings; but validates correctly~~
