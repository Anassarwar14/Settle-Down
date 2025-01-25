# Settle Down - Real Estate Platform  

**Settle Down** is a full-stack real estate web application built using the MERN stack (MongoDB, Express, React, Node.js). It enables users to browse, create, and manage property listings. The platform offers a modern and responsive interface with sturdy backend APIs for secure and efficient operations.  

![image](https://github.com/user-attachments/assets/216f1d17-6c8d-49e9-9074-3673823d22ac) 


## Features  

### General  
- Responsive design using Tailwind CSS  
- Comprehensive real estate listing platform  
- Client-side state management with Redux  
- Optimized image rendering with Cloudinary integration  
- OAuth and custom authentication using Firebase and JWT  

### User Features  
- User authentication (sign up/sign in)  
- View, create, update, and delete property listings
- Search with precise filters
- Contact landlords directly  
- Share property details on social media  
- Personalized user profile management 

![image](https://github.com/user-attachments/assets/c949b202-43c8-4e0a-9637-946de4c20dcb)
![image](https://github.com/user-attachments/assets/5bea7383-632b-47c3-bab9-fc453469ab49)

 
## Tech Stack  

### Frontend  
- **React**: Framework for building the UI  
- **Vite**: Fast bundling and development server  
- **Tailwind CSS**: Utility-first CSS for responsive design  
- **Firebase**: OAuth integration and storage  

### Backend  
- **Node.js**: Server-side runtime  
- **Express**: Framework for handling HTTP requests  
- **MongoDB**: NoSQL database for storing data  
- **Mongoose**: ODM for MongoDB  
- **JWT**: Authentication tokens for secure access  
- **Nodemon**: Development server monitoring  

## API Endpoints  

| **Endpoint**       | **Method** | **Description**                |  
|---------------------|------------|--------------------------------|  
| `/api/auth`         | POST       | Handles user authentication    |  
| `/api/user`         | GET        | Fetches user details           |  
| `/api/listing`      | CRUD       | CRUD operations for property listings |  


## Installation  

### Prerequisites  
- Node.js and npm installed  
- MongoDB instance running locally or in the cloud  
- Environment variables set up in a `.env` file  

### Steps  

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/anassarwar14/settle-down.git
   cd settle-down
   
2. **Install Dependencies**
   ```bash
   npm install
   npm install --prefix client

3. **Setup environment variables: Create a .env file in the api/ and client directory with the following variables:**
   ```bash
   MONGO=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   NODE_VERSION=18.13.0
   
   //client
   VITE_FIREBASE_API_KEY=<your_firebase_key>

4. **Run the app in development mode:**

   ```bash
   npm run dev

5. **Build for production**:

   ```bash
   npm run build

- Built with ❤️ by Anas  
