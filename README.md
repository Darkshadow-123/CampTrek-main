# CampTrek: A camping Website
This project mainly focused on basic structure and layout of a camping website.
The project is under the course of: https://www.udemy.com/course/the-web-developer-bootcamp/?kw=web+developer&src=sac&couponCode=ST21MT121624 of Colt Steele, amazing voice and amazing Teacher !
Definitely check out his course. I have learnt everything there !!

This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication.
## Features
* Users can create, edit, and remove campgrounds
* Users can review campgrounds once, and edit or remove their reviews
* Only logged in users can create their own campgrounds
* A simple cluster map added for better user experience

## Built With

- [Node.js](https://nodejs.org) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [express](https://expressjs.com//) - Fast, unopinionated, minimalist web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - The database for modern applications
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js
- [ejs](https://ejs.co/) - Embedded JavaScript templating

## Run it locally
1. Install [mongodb](https://www.mongodb.com/)
2. Create a cloudinary account to get an API key, Cloud name and secret code
3. Create a MapTiler account to get its API key.

```
cd CampTrek
npm install
```

4. Create a .env file (or just export manually in the terminal) in the root of the project and add the following:  

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
MAPTILER_API_KEY=
```
5. Run seeds/index.js first by using the command for refreshing the pre-defined Campgrounds:
```
node seeds/index.js
```
6. Run the following command to Start on the local side:
```
nodemon app.js
```
7. Then go to [localhost:3000](http://localhost:3000/)

8. To stop the server, just simply press CTRL + C on your keyboard.

The following are the snapshots of this behemoth project: 
![image](https://github.com/user-attachments/assets/d32b7795-ed68-4526-ae13-7696f08a5938)
![image](https://github.com/user-attachments/assets/c8bed86a-9717-4b58-8bb5-3e25174acb3a)
![image](https://github.com/user-attachments/assets/abbad3be-2f8b-45f2-a686-90f9cef6ba50)
![image](https://github.com/user-attachments/assets/e150946c-304d-409c-90d6-45cb3346db26)
![image](https://github.com/user-attachments/assets/a260966c-44bd-418d-9eff-ed6669960f5b)
![image](https://github.com/user-attachments/assets/19434d8f-bb17-49b6-89f3-d18aa1876f39)

