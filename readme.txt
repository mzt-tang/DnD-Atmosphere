This is a music app designed for DND sessions.
The intention of the app is to play ambient soundtracks during a DND session that matches the themes of the situation during the game. E.g. drinking in a tavern - some tavern soundtrack plays in the background during the session.
The secondary intention of the app is to provide a soundboard that the DM can play to provide in sound effects that match what's going on in game. E.g. flipping a coin to pay for a drink to a bartender - play the flip coin sound effect.

All of the code is within the app/ folder (except for App.tsx)
the folder containing the code are as goes:
components - components to be used for the screen views
constants - variables that is used globally in the app
domainFunctions - async functions that call to the database (firebase)
navigation - navigation components that allow the navigation between the screens
screenControllers - the presenters in MVP of the screens, contains the functions that a screen (View) calls and returns a screen (View)).
screen - the screen views of the app
