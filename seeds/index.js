const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/camptrek')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!")
        console.log(err)
    })


const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 200);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6900f5b30456a15964c8ce05',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitute,
                    cities[random1000].latitute,
                ]
            },
            image: [
                {
                    url: 'https://res.cloudinary.com/dgfd3hbt7/image/upload/v1734463641/CampTrek/vv0guyu9mdfqxcsgya1a.jpg',
                    filename: 'CampTrek/vv0guyu9mdfqxcsgya1a'
                },
                {
                    url: 'https://res.cloudinary.com/dgfd3hbt7/image/upload/v1734463643/CampTrek/wno9jc3zkuxovi5xxkzr.jpg',
                    filename: 'CampTrek/wno9jc3zkuxovi5xxkzr'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})