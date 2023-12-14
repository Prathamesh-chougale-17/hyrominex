import mongoose, { Schema, model } from 'mongoose';

const locationSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

const Location = mongoose.models.Location || model('Location', locationSchema);

export default Location;
