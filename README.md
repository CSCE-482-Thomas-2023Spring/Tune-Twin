<a name="br1"></a>Tune Twin

The goal of Tune Twin is to provide users with a powerful, new way to discover a
diverse set of music recommendations based on songs they like. All it takes to get
started is searching for a song on Spotify that you like! Additionally, we have a set of
filters you can utilize to customize your search.

Getting started with Installation

1\. Clone the Tune Twin GitHub Repository

a. Clone the GitHub repository. Instructions for how to clone a GitHub repository
can also be found [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

2\. Activate the Virtual Environment

a. Utilizing the command line, navigate to the cloned repository and activate the
virtual environment with the command ‘source myenv/bin/activate’

To confirm that the activation was successful, confirm that (myenv)
 appears next to the username provided on the command line.

3\. Install appropriate Frontend Packages

a. Navigate to the frontend directory in the same terminal window
b. Download node modules using the ‘npm install’ command

c. Download redux using the ‘npm install redux’ command

4\. Start the frontend by running ‘npm start’. The frontend should run on
[http://localhost:3000](http://localhost:3000/)[/](http://localhost:3000/).




<a name="br2"></a>The frontend has now been compiled and will run in a terminal. We will now
instantiate a new terminal instance to download backend packages and run
backend functions.

5\. Open a new terminal and utilize the command line to navigate to the cloned GitHub
repository.

6\. Activate the virtual environment in this new terminal window using the instructions in
step two.

7\. Navigate to the application folder. This folder contains the endpoints and functions
that comprise the backend of the Tune Twin system.

8\. Navigate to [t](https://drive.google.com/drive/folders/1p2N1FGK4HI-rTArWvTidsVqXJAThJpxx?usp=sharing)[his](https://drive.google.com/drive/folders/1p2N1FGK4HI-rTArWvTidsVqXJAThJpxx?usp=sharing)[ ](https://drive.google.com/drive/folders/1p2N1FGK4HI-rTArWvTidsVqXJAThJpxx?usp=sharing)[link](https://drive.google.com/drive/folders/1p2N1FGK4HI-rTArWvTidsVqXJAThJpxx?usp=sharing)[ ](https://drive.google.com/drive/folders/1p2N1FGK4HI-rTArWvTidsVqXJAThJpxx?usp=sharing)in a web browser and download the files in the Google Drive
Folder. Move them to the application folder in the cloned GitHub repository.




<a name="br3"></a>9. Run the backend of the system using ‘python3 app.py’ while in the application
directory of the cloned GitHub repository.

Everything is now set up to run Tune Twin. Please reference the [user](https://docs.google.com/document/d/1tnoYfIgdO5P5udbo3AkGtmlS8IKGEL8wx324sqhWfYo/edit?usp=sharing)[ ](https://docs.google.com/document/d/1tnoYfIgdO5P5udbo3AkGtmlS8IKGEL8wx324sqhWfYo/edit?usp=sharing)[manual](https://docs.google.com/document/d/1tnoYfIgdO5P5udbo3AkGtmlS8IKGEL8wx324sqhWfYo/edit?usp=sharing)[ ](https://docs.google.com/document/d/1tnoYfIgdO5P5udbo3AkGtmlS8IKGEL8wx324sqhWfYo/edit?usp=sharing)for any
questions regarding using the Tune Twin application.

Running the Backend and viewing Swagger Documentation

● In order to run the backend REST API you must first **cd .\application\** when

you are in the Tune-Twin folder

● Run the command **Python app.py** or **Python3 app.py** to start up the

backend locally

● From there you can follow the link <http://127.0.0.1:8000>[ ](http://127.0.0.1:8000)to reach the backend

homepage




<a name="br4"></a>● In the search bar you must add /swagger to <http://127.0.0.1:8000>[ ](http://127.0.0.1:8000)in order to
 reach the documentation for each route within our rest api the link should be
● <http://127.0.0.1:8000/swagger/>[ ](http://127.0.0.1:8000/swagger/)and it should display

● You can then expand each route to see its parameters, functionality description,
 example usage, and the meaning of its status code

● *Note: any additional dependencies can be installed using*

**Pip install [Enter Dependencies name]**

Running the Frontend

● In order to run the frontend react application you must open a separate terminal
 to be ran alongside the backend

● In this terminal you must change directories to “frontend” from the root folder

“Tune-Twin” : **cd .\frontend\**

● Launch the frontend using: **npm start**

*Note: any additional dependencies can be installed using* **npm install [Enter Dependencies name]**




<a name="br5"></a>Contribution Guide

While we have made our repository public, the following specifications have been made to the
repository’s permissions to ensure only appropriate contributions are made.

Using this framework, users can contribute to the project by forking the repo and making
contributions where they prefer. After they are finished, they must merge into the main branch
via a pull request. This pull request will need to be reviewed by at least one of Tune Twin’s
administrators (anyone from the Capstone group). Additionally, if any new users find bugs in the
application, they can [open](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue)[ ](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue)[an](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue)[ ](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue)[issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue)[ ](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue)that will alert one of the Tune Twin administrators of the
error.
