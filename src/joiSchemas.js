import Joi from "@hapi/joi";

class JoiSchemas {
  //RULE VALUES
  static passwordRegex = /^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*)\S{8,}$/;
  static passwordError =
    "Password must be at least 10 characters long, and have at least one uppercase letter, one lowercase letter, and one number.";
  static phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  static socialSecurityNumberRegex = /^\d{3}-\d{2}-\d{4}$/;

  ///////////////////////////////////////////////////////////
  //standalone rules
  //////////////////////////////////////////////////////////
  static applicationSchema = Joi.object({
    userId: Joi.number().greater(0),
    firstName: Joi.string().required().min(2).label("First Name"),
    middleInitial: Joi.string().max(1).label("MI"),
    lastName: Joi.string().required().min(2).label("Last Name"),
    address: Joi.string().required().min(5).label("Address"),
    city: Joi.string().required().min(2).label("City"),
    state: Joi.string().required().min(2).max(2).label("State"),
    zipCode: Joi.string()
      .regex(/^\d{5}$/)
      .message("Invalid Zip Code")
      .label("Zip Code"), //change to regex \d{5}
    homePhone: Joi.string()
      .regex(this.phoneRegex)
      .message("Invalid Phone Number")
      .label("Home Phone"),
    cellPhone: Joi.string()
      .regex(this.phoneRegex)
      .message("Invalid Phone Number")
      .label("Cell Phone"),
    socialSecurityNumber: Joi.string()
      .regex(this.socialSecurityNumberRegex)
      .message("Invalid SSN")
      .label("SSN"),
    isUsCitizen: Joi.boolean().required().label("US Citizen"),
    hasFelony: Joi.boolean().required().label("Felony Conviction"),
    willDrugTest: Joi.boolean().required().label("Drug Test"),
    employment: Joi.array().min(1).required().label("Employment History"),
    education: Joi.array().min(1).required().label("Education"),
    references: Joi.array().min(1).required().label("References"),
  });

  static employmentSchema = Joi.object({
    employerName: Joi.string().required().min(3).label("Employer Name"),
    employerStartDate: Joi.date().required().label("Start Date"),
    employerEndDate: Joi.date().required().label("End Date"),
    employerPhoneNumber: Joi.string()
      .regex(this.phoneRegex)
      .message("Invalid Phone Number")
      .label("Phone Number"),
    position: Joi.string().required().min(5).label("Job Title"),
  });

  static educationSchema = Joi.object({
    schoolName: Joi.string().required().min(3).label("School Name"),
    schoolStartDate: Joi.date().required().label("Start Date"),
    schoolEndDate: Joi.date().required().label("End Date"),
    degree: Joi.string().required().min(3).label("Degree"),
  });

  static referenceSchema = Joi.object({
    name: Joi.string().required().min(3).label("Name"),
    referencePhoneNumber: Joi.string()
      .regex(this.phoneRegex)
      .message("Invalid Phone Number")
      .label("Phone Number"),
    relation: Joi.string().required().min(3).label("Relation"),
  });

  ///////////////////////////////////////////////////////////
  //DYNAMIC RULESETS
  //////////////////////////////////////////////////////////

  static registerUserSchema() {
    let schema = Joi.object()
      .concat(this.yourNameSchema)
      .concat(this.emailAddress)
      .concat(this.password)
      .concat(this.confirmPassword);
    return schema;
  }

  static updateUserSchema() {
    let schema = Joi.object()
      .concat(this.yourNameSchema)
      .concat(this.emailAddress);
    return schema;
  }

  static resetPasswordSchema() {
    let schema = Joi.object()
      .concat(this.password)
      .concat(this.confirmPassword);
    return schema;
  }

  ////////////////////////////////////////////////////////////
  //Below are individual rules to be added to rulesets above
  ////////////////////////////////////////////////////////////

  //an email address
  static emailAddress = Joi.object({
    emailAddress: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email Address"),
  });

  //a password
  static password = Joi.object({
    password: Joi.string()
      .min(8)
      .regex(this.passwordRegex)
      .message(this.passwordError)
      .label("Password"),
  });

  //a password verification (must be accompanied by password)
  static confirmPassword = Joi.object({
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  });
  //static nnn = Joi.object({});
  //static nnn = Joi.object({});

  //a user's first and last name
  static yourNameSchema = Joi.object({
    name: Joi.string().min(5).max(30).required().label("Your Name"),
  });
}

export default JoiSchemas;
