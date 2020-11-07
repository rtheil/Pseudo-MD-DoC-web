import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default function JobsPage() {
  return (
    <Container>
      <Row>
        <Col sm={3} className="border-right">
          <div className="font-weight-bold">Job Seekers</div>
          <hr className="mt-1" />
          <Link to="/jobs">State Jobs</Link>
          <br />
          <Link to="/applications">My Applications</Link>
          <br />
          <Link to="/">Update Contact Info</Link>
          <br />
          <Link to="/">Interest Cards</Link>
          <br />
          <Link to="/">Class Specifications</Link>
          <br />
          <Link to="/">Closed Jobs Status</Link>
          <br />
        </Col>
        <Col sm={8} className="mt-2">
          CORR OFFICER | Correctional Officer
          <br />
          Recruitment #20-10101110101-0001
          <Container>
            <Row className="bg-gray">
              <Col className="col-4 text-right font-weight-bold">
                DEPARTMENT
              </Col>
              <Col className="col-8">
                Department of Public Safety and Correctional Svcs
              </Col>
            </Row>

            <Row>
              <Col className="col-4 text-right font-weight-bold">
                DATE OPENED
              </Col>
              <Col className="col-8">4/21/2016 3:35:00 PM</Col>
            </Row>

            <Row className=" bg-gray">
              <Col className="col-4 text-right font-weight-bold">
                FILING DEADLINE
              </Col>
              <Col className="col-8">Open/Continuous</Col>
            </Row>

            <Row>
              <Col className="col-4 text-right font-weight-bold">SALARY</Col>
              <Col className="col-8">$42,000.00 - $60,000.00</Col>
            </Row>

            <Row className="bg-gray">
              <Col className="col-4 text-right font-weight-bold">
                EMPLOYMENT TYPE
              </Col>
              <Col className="col-8">Full Time</Col>
            </Row>

            <Row>
              <Col className="col-4 text-right font-weight-bold">
                HR ANALYST
              </Col>
              <Col className="col-8">Leroyyy Jenkins</Col>
            </Row>

            <Row className="bg-gray">
              <Col className="col-4 text-right font-weight-bold">
                WORK LOCATION
              </Col>
              <Col className="col-8">
                Allegany
                <br />
                Anne Arundel
                <br />
                Baltimore City
                <br />
                Carroll
                <br />
                Charles
                <br />
                Howard
                <br />
                Queen Anne's
                <br />
                Somerset
                <br />
                Washington County
                <br />
                Wicomico
                <br />
              </Col>
            </Row>
            <hr className="border-dark" />
            <Row className="text-center">
              <div className="col">
                <Link to="/" className="btn btn-primary">
                  Go Back
                </Link>
              </div>
              <div className="col">
                <Link to="/applications/new" className="btn btn-success">
                  Apply Now
                </Link>
              </div>
              <div className="col">
                <Link to="/" className="btn btn-primary">
                  Benefits
                </Link>
              </div>
            </Row>
            <hr className="border-dark" />
            <Row className="bg-forest font-weight-bold">GRADE</Row>
            <div>CORR 0003</div>
            <Row className="bg-forest font-weight-bold">PURPOSE OF JOB</Row>
            <div>
              Correctional Officer I is the entry level of work involving the
              custody, security and supervision of adult inmates in a
              correctional facility.
            </div>
            <Row className="bg-forest font-weight-bold">POSITION DUTIES</Row>
            <div>
              <ul>
                <li>
                  Attends an entrance level training program certified by the
                  Maryland Correctional Training Commission
                </li>
                <li>
                  Attends firearms training; Learns specific duties on various
                  security posts through on-the-job training
                </li>
                <li>
                  Maintains control of inmates while escorting individuals or
                  groups within the prison
                </li>
                <li>
                  Keeps accurate head counts of inmates in the assigned security
                  post
                </li>
                <li>
                  Conducts inspections and searches of inmates and inmate access
                  and work areas for drugs, weapons and other unauthorized
                  materials
                </li>
                <li>
                  Enforces rules of conduct among inmates and learns when to
                  prepare reports of infractions
                </li>
                <li>Operates manual and electronic locking systems</li>
                <li>
                  Subdues and restrains inmates during fights, riots and escape
                  attempts
                </li>
                <li>
                  When standing an armed post, learns how to determine the need
                  for using firearms and uses them when necessary
                </li>
                <li>
                  Assists in the search for escapees, their capture and return
                  to the institution
                </li>
                <li>
                  Assists in maintaining the custody of inmates during transport
                  to other institutions or court appearances
                </li>
                <li>
                  Drives motor vehicles when transporting inmates, making
                  outside security rounds, searching for escapees and related
                  activities
                </li>
                <li>May search visitors for contraband</li>
                <li>
                  May place inmates in handcuffs, restraining belts and leg
                  irons
                </li>
                <li>Performs other related duties.</li>
              </ul>
            </div>
            <Row className="bg-forest font-weight-bold">
              MINIMUM REQUIREMENTS
            </Row>
            <div>
              <ul>
                <li>
                  Education: High School diploma or G.E.D. certificate
                  acceptable to the Maryland State Board of Education as
                  described in the Correctional Training Commission regulation.
                </li>
                <li>Experience: None</li>
                <li>
                  Note: The above educational requirement is set by the
                  Correctional Training Commission in accordance with
                  Correctional Services Article, Section 8-209.
                </li>
              </ul>
            </div>
            <Row className="bg-forest font-weight-bold">
              LICENSES, REGISTRATIONS AND CERTIFICATIONS
            </Row>
            <div>
              <ul>
                <li>
                  Employees in this classification may be assigned duties which
                  require the operation of a motor vehicle. Employees assigned
                  such duties will be required to possess a motor vehicle
                  operator's license valid in the State of Maryland.
                </li>
                <li>
                  Employees in this classification may be required to operate
                  busses for the transportation of inmates. Employees assigned
                  such duties will be required to obtain a Class B Commercial
                  Driver's License with passenger and air brakes endorsements
                  valid in the State of Maryland.
                </li>
              </ul>
            </div>

            <Row className="bg-forest font-weight-bold">
              SPECIAL REQUIREMENTS
            </Row>
            <div>
              <ul>
                <li>
                  Employees who have not already done so must meet the selection
                  standards required and successfully complete the training
                  prescribed by the Maryland Correctional Training Commission
                  for a correctional officer during their probationary period,
                  (Correctional Services Article, Section 8-209). Selection
                  standards for correctional officer training are listed in
                  detail in the Code of Maryland Regulations Title 12, Subtitle
                  10, Chapter 01 and include the following:
                </li>
                <ul>
                  <li>U.S. Citizenship or Resident Alien status</li>
                  <li>Must be at least 21 years of age</li>
                  <li>A completed background investigation</li>
                  <li>Oral interview</li>
                  <li>Physical Examination</li>
                  <li>Polygraph Examination</li>
                </ul>
                <li>
                  Employees in this classification will be required to bear
                  firearms, and to demonstrate practical knowledge and
                  proficiency in the safe use and care of firearms on a periodic
                  basis.
                </li>
                <li>
                  Employees are subject to call-in 24 hours a day and,
                  therefore, must provide the employing agency with a telephone
                  number where they can be reached.
                </li>
                <li>
                  4. Employees in this classification are subject to substance
                  abuse testing in accordance with Code of Maryland Regulations
                  17.04.09, Testing for Illegal substances.
                </li>
              </ul>
            </div>
            <Row className="bg-forest font-weight-bold">
              EXAMINATION PROCESS
            </Row>
            <div>
              Candidates who meet the minimum qualifications, successfully
              complete the written examination and hiring process will be placed
              on the employment eligible list. The list will be used by the
              DPSCS to select employees for at least two years.
            </div>
            <Row className="bg-forest font-weight-bold">BENEFITS</Row>
            <div>
              Some vacation, some paternity leave, some insurance, some child
              care discounts, flexible work schedules, student loan forgiveness
            </div>
            <Row className="bg-forest font-weight-bold">HOW TO APPLY</Row>
            <div>
              <Link to="/applications/new" className="btn btn-success mt-2">
                Apply Now
              </Link>
            </div>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
