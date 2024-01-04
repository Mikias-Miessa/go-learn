const  {Schema, model, models} = require('mongoose');

const InstructorSchema = new Schema(
  {
    name: {
    type: String,
    required: true
  },
  qualifications: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Assuming each instructor has a unique email address
    trim: true, // Remove leading and trailing whitespaces
    lowercase: true // Store email in lowercase
  },
  phone: {
    type: String,
    required: true
    // You can add additional validation for phone numbers if needed
  }
  },
  {
    timestamps: true,
  }
);

const Instructor = models.instructor || model('instructor', InstructorSchema);

module.exports = Instructor 
