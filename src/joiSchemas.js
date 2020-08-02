import Joi from "@hapi/joi";

class JoiSchemas {
  //RULE VALUES
  static passwordRegex = /^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])\S{8,}$/;
  static passwordError =
    "Password must be at least 8 characters long, and have at least one uppercase letter, one lowercase letter, one number, and one special character.";

  //RULESETS

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
