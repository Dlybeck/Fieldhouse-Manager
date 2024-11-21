import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Use a hashed password
  reservations: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }
  ]
});

const User = model('User', userSchema);
export default User;