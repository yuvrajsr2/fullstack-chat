# Fullstack Chat App

**Live:** [https://fullstack-chat-0aom.onrender.com](https://fullstack-chat-0aom.onrender.com)

A full-stack real-time chat application built with React, Node.js, Express, and MongoDB.

### Features
- JWT authentication and bcrypt password hashing  
- Cloudinary for image uploads  
- Realtime messaging with Socket.io  
- Tailwind CSS, DaisyUI, and Zustand for state management  

### Tech Stack
React · Node.js · Express · MongoDB · Socket.io · Tailwind CSS · DaisyUI · Zustand · Cloudinary  

### Setup
1. Clone the repository  
   `git clone https://github.com/your-username/fullstack-chat.git && cd fullstack-chat`

2. Install dependencies  
   `cd backend && npm install && cd ../frontend && npm install`

3. Create a `.env` file inside the `backend` folder with the following:  
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret


4. Run the app  
`cd backend && npm run dev`  
`cd frontend && npm run dev`

Then open `http://localhost:5173` in your browser.