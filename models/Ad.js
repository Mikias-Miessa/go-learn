const { Schema, models, model } = require('mongoose');

const AdSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            requierd: true,
        },
        title: {
            type: String,
            requierd: true,
        },
        status: {
            type: String,
            requierd: true,
        }
    },
     {
    timestamps: true,
  }
);
const Ad =
  models.ad || model('ad', AdSchema);

module.exports = Ad;