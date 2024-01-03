const { Schema, model, models } = require('mongoose');

const ClassSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'course',
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'instructor',
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
    },
    schedule: [
      {
        type: Schema.Types.ObjectId,
        ref: 'schedule'
      }
    ],
    prerequisites: {
      type: String,
    },
    WhyChooseUs: {
      type: String,
    },
    WhatYouWillGain: {
      type: String,
    },
    Curriculum: {
      type: String,
    },
     Modules: [
      {
        type: String,
      },
    ],
    WeeklyCommitment: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    start_date: {
      type: Date,
    },
    remark: {
      type: String,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'student',
      },
    ],
    status: {
      type: String,
      enum: ['running', 'closed', 'pending'],
      default: 'running',
    },
  },
  {
    timestamps: true,
  }
);

const Class = models.class || model('class', ClassSchema);

module.exports = Class;
