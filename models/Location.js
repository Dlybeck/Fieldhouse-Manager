import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const locationSchema = new Schema({
    name: { type: String, required: true },
    openTime: { type: String },
    closeTime: { type: String },
    location: { type: String },
    date: { type: String },
    reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
});

const Location = model('Location', locationSchema);
export default Location;