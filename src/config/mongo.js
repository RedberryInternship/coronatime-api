import mongoose from 'mongoose'

const connect = async () => {
    try {
        const connectionURL = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
        await mongoose.connect(connectionURL);
    } catch (e) {
        console.log(e);
    }
}

export default connect
