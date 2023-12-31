const  {Schema, model, models} = require('mongoose');

const StudentSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'class',
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: 'payment',
    },
    status:{
      type: String,
      enum: ['registered','enrolled','certified'],
      default: 'registered'
    },
    registered_online:{
      type: Boolean,
      default: true
    },
    contacted:{
      type: Boolean,
      default: false
    },
    remark:{
      type: String
    },
    registered_by:{
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    certificate:{
      type: Schema.Types.ObjectId,
      ref: 'certificate',
    },
    schedule: {
      type: Schema.Types.ObjectId,
      ref: 'schedule',
    }
  },
  {
    timestamps: true,
  }
);



const Student = models.student || model('student', StudentSchema);

module.exports = Student 
