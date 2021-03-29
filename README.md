![alt text](./app/assets/medio_logo_outlined.png?raw=true)

## What is it?

Med.io is being built as part of an MEng university project. The app will allow users to identfiy pills using their smartphone camera, as well as store prescription information tied to their specific user account.

### TODO

+ ~~Prescription editing/adding~~
	+ ~~Add optional image to prescriptions~~
	+ ~~Specific prescription updating~~
+ ~~Result page rendering conditional on result of post request~~
	+ Support for multiple prescriptions of same medicine
+ User account creation
	+ Firebase user authentication
+ ~~Back-end~~
	+ ~~Be able to post image to model on local server and obtain result~~
	+ Set up google cloud instance
	+ Update all this using this years model

### Known Issues

+ Result screen text renders weirdly for some medicines (long names?) and content text also looks weird at times
+ You can send multiple post requests by pressing the camera button multiple times
+ You can add multiple prescriptions at the same time by pressing the add prescription button too quickly
+ Prescription list does not automatically refresh when a prescription is removed - a manual refresh by pulling down on the list is required
+ Login Password field glitches out visually on long strings; but validates correctly
