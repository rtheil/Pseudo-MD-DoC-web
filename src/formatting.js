class Formatting {
  //FORMAT A PHONE NUMBER FOR INPUT FIELD
  static formatPhoneNumber(phoneNumber, clean) {
    let cleaned = ("" + phoneNumber).replace(/\D/g, "");
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
    console.log("clean SSN:", cleaned);
    const matches = cleaned.match(/^(\d{1,3})(\d{0,2})(\d{0,4})$/);
    console.log(matches);
    if (matches) {
      let out = matches[1];
      if (matches[2].length >= 1) out += "-" + matches[2];
      if (matches[3].length >= 1) out += "-" + matches[3];
      return out;
    }
    return cleaned;
  }
}

export default Formatting;
