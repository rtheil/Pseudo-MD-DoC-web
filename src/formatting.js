class Formatting {
  //FORMAT A PHONE NUMBER FOR INPUT FIELD
  static formatPhoneNumber(phoneNumber, clean) {
    let cleaned = ("" + phoneNumber).replace(/\D/g, "");
    if (cleaned.length > 10) cleaned = cleaned.substring(0, 10);
    if (clean) return cleaned;
    let pattern = /^(\d{1,3})(\d{0,3})(\d{0,4})$/gm;
    let matches = pattern.exec(cleaned);
    if (matches) {
      let out = "(" + matches[1];
      if (matches[2].length >= 1) out += ") " + matches[2];
      if (matches[3].length >= 1) out += "-" + matches[3];
      return out;
    }
    return cleaned;
  }

  //FORMAT A ZULU DATE FROM THE API
  static formatDate(date) {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("en", { month: "numeric" }).format(d);
    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return mo + "/" + da + "/" + ye;
  }

  //FORMAT A SOCIAL SECURITY NUMBER
  static formatSsn(ssn, clean) {
    const cleaned = ("" + ssn).replace(/\D/g, "");
    if (clean) return cleaned;
    const matches = cleaned.match(/^(\d{1,3})(\d{0,2})(\d{0,4})$/);
    if (matches) {
      let out = matches[1];
      if (matches[2].length >= 1) out += "-" + matches[2];
      if (matches[3].length >= 1) out += "-" + matches[3];
      return out;
    }
    return cleaned;
  }

  static formatJoiValidation(schema, item, abortEarly = true) {
    //VALIDATE
    const results = schema.validate(item, {
      abortEarly: abortEarly,
    });

    //IF ERRORS, LOOP
    const errors = {};
    let count = 0;
    if (results.error)
      for (let item of results.error.details) {
        let msg = item.message;
        /*eslint no-useless-escape: "off"*/
        msg = msg.replace(/\"/gm, "");
        msg = msg.replace("is not allowed to", "can't");
        msg = msg.replace("be a boolean", "be chosen");
        errors[item.path[0]] = msg;
        count++;
      }
    errors.count = count;
    // if (errors.confirmPassword !== undefined)
    //   errors.confirmPassword = "Passwords do not match";

    return errors;
  }

  static formatApplicationStatus(applicationStatus) {
    let { id, status } = applicationStatus;
    let returnValue = {
      Id: id,
      status: status,
      color: "success", //primary, secondary, success, danger, warning, info, light, dark, white, transparent
      textColor: "white", //white or dark
    };
    //WARNING
    if (id === 2 || id === 3) {
      returnValue.color = "warning";
      returnValue.textColor = "dark";
    }
    if (id === 4 || id === 6) returnValue.color = "danger";
    if (id === 5) returnValue.color = "success";

    return returnValue;
  }
}

export default Formatting;
