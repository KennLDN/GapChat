# GapChat

GapChat is a real-time chat application that creates a physical gap between messages relative to the time difference between them. Built using HTML, CSS, JavaScript, and Socket.IO, it allows users to set their display names, choose the color of their messages, and adjust the gap between messages based on the time difference.

## Build and Run the Docker Image

To build and run the Docker image, follow these steps:

1. Make sure Docker is installed on your system. If not, [install Docker](https://docs.docker.com/get-docker/).
2. Open a terminal in the project directory and run the following command to build the Docker image:

   docker build -t gapchat .

   This will create a Docker image named `gapchat`.

3. To run the Docker container, execute the following command in the terminal:

   docker run -p 3000:3000 -d gapchat

Now, GapChat will be running on port 3000. Open your browser and navigate to http://localhost:3000 to access the chat application.

## Roadmap

- **Live Gap**: Update the gap between messages in real-time as new messages are received, without needing to send a message.
- **Homepage**: Display a list of chat rooms the user has been active in on the homepage, allowing users to quickly access previous conversations.
