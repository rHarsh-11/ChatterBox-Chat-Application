# ChatterBox - Real-Time Chat Application

ChatterBox is a real-time chat application built using the MERN stack. It supports real-time messaging with WebSockets, role-based authentication, and an intuitive UI with DaisyUI and Tailwind CSS.

## Features
- Real-time messaging with **Socket.io**
- User-friendly interface with **DaisyUI** and **Tailwind CSS**
- State management using **Redux**
- Online/offline status indicators

## Tech Stack
- **Frontend:** React, Vite, DaisyUI, Tailwind CSS, Redux
- **Backend:** Node.js, Express.js, MongoDB, Socket.io
- **Authentication:** JWT
- **State Management:** Redux

## Installation & Setup
Follow these steps to set up the project on your local machine.

### 1. Clone the Repository
```sh
git clone https://github.com/rHarsh-11/ChatterBox-Chat-Application
cd chatterbox
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory and define the following variables with your own values:
```env
PORT=
MONGO_URL=
JWT_KEY=
```

### 3. Install Dependencies
#### Backend
```sh
cd server
npm install
```

#### Frontend
```sh
cd ../client
npm install
```

### 4. Start the Application
#### Backend
```sh
cd server
npm run dev
```

#### Frontend
```sh
cd ../client
npm run dev
```

## Folder Structure
### Server Directory
```
server/
│── controllers/
│── config/
│── middleware/
│── models/
│── routes/
│── socket/
│── .gitignore
│── package.json
│── package-lock.json
│── server.js
```

### Client Directory
```
client/
│── public/
│── src/
│── .gitignore
│── index.html
│── package.json
│── package-lock.json
│── vite.config.js
```

## Contributing
Feel free to fork this repository and submit pull requests for improvements or new features.


