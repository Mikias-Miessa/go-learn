const { Schema, model, models } = require('mongoose');

const CertificateSchema = new Schema(
  {
  date: {
    type: String,
    required: true,
  },
  pdfFile: {
    type: String,
    required: true,
  },
  certificateId: {
    type: String,
    required: true,
  },
  shareLink: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  },
  {
    timestamps: true,
  }
);

const Certificate =
  models.certificate || model('certificate', CertificateSchema);

module.exports = Certificate;
