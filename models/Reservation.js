import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const reservationSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    date: {type: String },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
});

const Reservation = model('Reservation', reservationSchema);
export default Reservation;