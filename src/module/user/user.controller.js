const { sendEmail } = require("../../helper/emailService");
const { messages } = require("../../constants/messages");
const enquiry = require("../../model/enquiry");
const User = require("../../model/User");
const { pdfConverter } = require("../../helper/pdfService");

exports.registeration = async (req, res) => {
  try {
    const {
      fullName,
      cmpName,
      industry,
      cmpType,
      startDate,
      zipCode,
      loanAmount,
      annualRevenue,
      creditScore,
      purposeOfLone,
      phone,
      email,
      ssn,
      website,
      taxId,
    } = req.body;
    const file = req.files;
    const drivinLicense = file?.drivinLicense[0].path;
    const voided = file?.voided[0].path;
    const bankStatemets = file?.bankStatemets[0].path;
    const isCreated = await enquiry.create({
      fullName,
      cmpName,
      industry,
      cmpType,
      startDate,
      zipCode,
      loanAmount,
      annualRevenue,
      creditScore,
      purposeOfLone,
      phone,
      email,
      ssn,
      website,
      taxId,
      drivinLicense,
      voided,
      bankStatemets,
    });
    if (!isCreated) throw new Error(messages.FAILED_TO_FETCH);
    const pdfPath = `./uploads/pdf/${isCreated.email}.pdf`;

    await pdfConverter({ userDetails: isCreated }, pdfPath);

    const attachments = [
      {
        path: pdfPath,
      },
      {
        path: drivinLicense,
      },
      {
        path: voided,
      },
      {
        path: bankStatemets,
      },
    ];

    const options = {
      to: email,
      subject: "Your from successfully submitted",

      attachments: attachments,
    };

    const isSend = await sendEmail(options);

    return res.status(201).json({
      message: messages.DATA_CREATED,
      data: isSend.accepted,
    });
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};
