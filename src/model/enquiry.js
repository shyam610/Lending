const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    cmpName: {
      type: String,
    },
    industry: {
      type: String,
    },

    cmpType: {
      type: String,
    },
    startDate: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    loanAmount: {
      type: String,
    },
    annualRevenue: {
      type: String,
    },
    creditScore: {
      type: String,
    },
    purposeOfLone: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid!");
        }
      },
    },
    ssn: {
      type: String,
    },
    website: {
      type: String,
    },
    taxId: {
      type: String,
    },

    drivinLicense: {
      type: String,
      default: null,
    },
    voided: {
      type: String,
      default: null,
    },

    bankStatemets: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("enquiry", enquirySchema);
