import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  reservations: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }
  ]
});

const User = model('User', userSchema);
export default User;