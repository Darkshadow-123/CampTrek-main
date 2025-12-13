require('dotenv').config();
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const User = require('../models/user');

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,     // prevents ensureIndex warning
    useFindAndModify: false   // avoids findAndModify warning
})
.then(() => console.log("MONGO CONNECTION OPEN!!!"))
.catch((err) => console.log("MONGO CONNECTION ERROR:", err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    // Find or create admin user
    let adminUser = await User.findOne({ username: 'admin' });
    if (!adminUser) {
        try {
            adminUser = await User.register({username: 'admin', email: 'admin@example.com', isAdmin: true}, 'admin');
            console.log('Admin user created for seeding');
        } catch (err) {
            console.log('Error creating admin user:', err.message);
            // Try to find by email if register fails
            adminUser = await User.findOne({ email: 'admin@example.com' });
            if (!adminUser) {
                console.log('No admin user found. Please create one manually or check your database.');
                mongoose.connection.close();
                return;
            }
        }
    }
    
    console.log('Using admin user:', adminUser.username, 'ID:', adminUser._id);

    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 200);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author:adminUser._id,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitute,
                    cities[random1000].latitute,
                ]
            },
            images: [
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