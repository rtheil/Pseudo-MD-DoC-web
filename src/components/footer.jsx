import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="d-flex content-align-center mt-3 pt-2">
        <div>
          <a
            href="/fake"
            className="footer-link"
            style={{ borderRight: "thin solid white" }}
          >
            Contact Us
          </a>
        </div>
        <div>
          <a
            href="/fake"
            className="footer-link"
            style={{ borderRight: "thin solid white" }}
          >
            Privacy
          </a>
        </div>
        <div>
          <a href="/fake" className="footer-link">
            Accessibility
          </a>
        </div>
      </div>
      <div className="pt-3 pl-3">
        420 Not Even a Real Place Street
        <br />
        Towson, Maryland 21286
        <br />
        <br />
        (410) 555-1234 | (899) 555-0123
      </div>
    </div>
  );
}
