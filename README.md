# Chat Web App using 3DES
### Tech Stack: ReactJS, NodeJS, ExpressJS, Python, Flask

_Guides on how to run project after screenshot_
- ### [Frontend Guide](#frontend)
- ### [Backend Guide](#backend)

## Screenshots
### 1. Chat Interface
![image](https://github.com/Aditya-Chandrn/3des-chat-app/assets/103370641/e9a71b3d-6bd2-4fbe-b1c7-3bfc3aaa7f2c)
### 2. Server Logs
![image](https://github.com/Aditya-Chandrn/3des-chat-app/assets/103370641/b42e8787-9a15-4cb3-be8c-26fee92abac1)

## Frontend:
1. Go to client directory: `cd client`
2. Install packages mentioned in package.json: `npm install`
   ### Packages:
   - axios
   - react-router-dom
   - socket.io-client
3. Run the React server: `npm start`
4. Run 2 instances of the web app for 2 users. In each instance, input the name of the user. Due to states being updated asynchronously, it asks the input 2 times. So enter it twice.

  #### The encryption-decryption is run on a Flask server. It is not part of the backend, but needs to be run separately from the client.
1. Go to cipher directory: `cd cipher`. Create a virtual env.
2. Install packages: `pip install -r requirements.txt`
3. Run the Flask server: `python enc_dec.py` or `py enc_dec.py` 

## Backend
1. Go to server directory: `cd server`
2. Install packages mentioned in package.json: `npm install`
   ### Packages:
   - cors
   - express
   - socket.io
3. Run the server: `npm run dev`

_Now the app should work without any issues_
