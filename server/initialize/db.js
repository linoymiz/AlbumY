import mongoose from 'mongoose'

export default async function connect() {

    try {
        await mongoose.connect('mongodb://localhost:27017/Albums', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connected to database');
    } catch (err) {
        console.log(err);
        console.log('could not manage to connect to database');
    }
}
