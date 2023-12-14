import { Schema, model } from 'mongoose';

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
});

const Location = model('Location', locationSchema);

export default Location;
