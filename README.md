Edtech-Platform by Archit Dasika

How to Run this Locally

Make sure to have Docker installed on your system
https://docs.docker.com/engine/install/

Once Docker is setup, run these two commands
```
docker build -t edtech-platform .
```
```
docker run -p 3000:80 edtech-platform
```
Now on your web browser go to this link -> http://localhost:3000/

Make sure nothing else is running on port 3000 for this to work. This will give you access to the entirety of the application.

The application is also hosted on AWS ECS but due to CORS access restrictions, the app is unable to access the API methods. I was unfortunately unable to successfully reverse proxy a solution to this.




An Overview of the Solution

The Application has 3 pages that the user can navigate between
  - Home.js
  - CreateVideo.js
  - VideoDetail.js


Home.js Features
  - Search Bar(query based on user_id)
  - Search button(onClick => displays a list of videos that the user_id has uploaded)
  - Upload button(onClick => navigates to the CreateVideo page)
  - VideoList.js (utilizes a custom videolist component which calls react-youtube to render videos)

CreateVideo.js Features
  - 4 fields can be entered (user_id, title, description, and video_url)
  - all fields must be entered otherwise the user would be unable to submit
  - Through the use of regex, requires the user to enter a valid Youtube URL
  - On success, utilizes SnackBar(material UI) to show a success message to user
  - Inclusion of a back button to navigate the user back to the Home page


VideoDetail.js
  - Includes the title of the video, the description, and the video itself in larger size. Due to youtube's API call(through the use of react-youtube), full playback functionality as well as fullscreen are included
  - Includes a comment section(CreateComment and CommentList are custom components) that updates and stores comments in real time
  - Also includes an Edit and Back button where the Edit button will bring up a popup, where the user can change the title and/or description of the video. The back button takes the user back to the Home page


This application was containerized using Docker for ease of deployment and for more production level code. Using Github actions, it also automatically pushes the Dockerfile to ECR, which then updates the ECS service/task accordingly.

