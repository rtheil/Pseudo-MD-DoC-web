import React, { Component } from "react";
import { Link } from "react-router-dom";

class Jobs extends Component {
  state = {};
  render() {
    return (
      <div className="container-lg">
        <div className="row">
          <div className="col-3 ">
            Job Seekers
            <hr className="mt-1" />
            <Link to="/jobs">State Jobs</Link>
            <br />
            <Link to="/">My Applications</Link>
            <br />
            <Link to="/">Update Contact Info</Link>
            <br />
            <Link to="/">Interest Cards</Link>
            <br />
            <Link to="/">Class Specifications</Link>
            <br />
            <Link to="/">Closed Jobs Status</Link>
            <br />
          </div>
          <div className="col-8 mt-2">
            CORR OFFICER | Correctional Officer
            <br />
            Recruitment #20-10101110101-0001
            <div className="container">
              <div className="row bg-gray">
                <div className="col-4 text-right font-weight-bold">
                  DEPARTMENT
                </div>
                <div className="col-8">
                  Department of Public Safety and Correctional Svcs
                </div>
              </div>

              <div className="row">
                <div className="col-4 text-right font-weight-bold">
                  DATE OPENED
                </div>
                <div className="col-8">4/21/2016 3:35:00 PM</div>
              </div>

              <div className="row bg-gray">
                <div className="col-4 text-right font-weight-bold">
                  FILING DEADLINE
                </div>
                <div className="col-8">Open/Continuous</div>
              </div>

              <div className="row">
                <div className="col-4 text-right font-weight-bold">SALARY</div>
                <div className="col-8">$42,000.00 - $60,000.00</div>
              </div>

              <div className="row bg-gray">
                <div className="col-4 text-right font-weight-bold">
                  EMPLOYMENT TYPE
                </div>
                <div className="col-8">Full Time</div>
              </div>

              <div className="row">
                <div className="col-4 text-right font-weight-bold">
                  HR ANALYST
                </div>
                <div className="col-8">Leroyyy Jenkins</div>
              </div>

              <div className="row bg-gray">
                <div className="col-4 text-right font-weight-bold">
                  WORK LOCATION
                </div>
                <div className="col-8">
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
                </div>
              </div>
              <hr className="border-dark" />
              <div className="row text-center">
                <div className="col">
                  <Link to="/">Go Back</Link>
                </div>
                <div className="col">
                  <Link to="/applications/new">Apply</Link>
                </div>
                <div className="col">
                  <Link to="/">Benefits</Link>
                </div>
              </div>
              <hr className="border-dark" />
              <div className="row bg-forest font-weight-bold">GRADE</div>
              <div>CORR 0003</div>
              <div className="row bg-forest font-weight-bold">
                PURPOSE OF JOB
              </div>
              <div>
                Correctional Officer I is the entry level of work involving the
                custody, security and supervision of adult inmates in a
                correctional facility.
              </div>
              <div className="row bg-forest font-weight-bold">
                POSITION DUTIES
              </div>
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
                    Keeps accurate head counts of inmates in the assigned
                    security post
                  </li>
                  <li>
                    Conducts inspections and searches of inmates and inmate
                    access and work areas for drugs, weapons and other
                    unauthorized materials
                  </li>
                  <li>
                    Enforces rules of conduct among inmates and learns when to
                    prepare reports of infractions
                  </li>
                  <li>Operates manual and electronic locking systems</li>
                  <li>
                    Subdues and restrains inmates during fights, riots and
                    escape attempts
                  </li>
                  <li>
                    When standing an armed post, learns how to determine the
                    need for using firearms and uses them when necessary
                  </li>
                  <li>
                    Assists in the search for escapees, their capture and return
                    to the institution
                  </li>
                  <li>
                    Assists in maintaining the custody of inmates during
                    transport to other institutions or court appearances
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
              <div className="row bg-forest font-weight-bold">
                MINIMUM REQUIREMENTS
              </div>
              <div>
                <ul>
                  <li>
                    Education: High School diploma or G.E.D. certificate
                    acceptable to the Maryland State Board of Education as
                    described in the Correctional Training Commission
                    regulation.
                  </li>
                  <li>Experience: None</li>
                  <li>
                    Note: The above educational requirement is set by the
                    Correctional Training Commission in accordance with
                    Correctional Services Article, Section 8-209.
                  </li>
                </ul>
              </div>
              <div className="row bg-forest font-weight-bold">
                LICENSES, REGISTRATIONS AND CERTIFICATIONS
              </div>
              <div>
                <ul>
                  <li>
                    Employees in this classification may be assigned duties
                    which require the operation of a motor vehicle. Employees
                    assigned such duties will be required to possess a motor
                    vehicle operator's license valid in the State of Maryland.
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

              <div className="row bg-forest font-weight-bold">
                SPECIAL REQUIREMENTS
              </div>
              <div>
                <ul>
                  <li>
                    Employees who have not already done so must meet the
                    selection standards required and successfully complete the
                    training prescribed by the Maryland Correctional Training
                    Commission for a correctional officer during their
                    probationary period, (Correctional Services Article, Section
                    8-209). Selection standards for correctional officer
                    training are listed in detail in the Code of Maryland
                    Regulations Title 12, Subtitle 10, Chapter 01 and include
                    the following:
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
                    proficiency in the safe use and care of firearms on a
                    periodic basis.
                  </li>
                  <li>
                    Employees are subject to call-in 24 hours a day and,
                    therefore, must provide the employing agency with a
                    telephone number where they can be reached.
                  </li>
                  <li>
                    4. Employees in this classification are subject to substance
                    abuse testing in accordance with Code of Maryland
                    Regulations 17.04.09, Testing for Illegal substances.
                  </li>
                </ul>
              </div>
              <div className="row bg-forest font-weight-bold">
                EXAMINATION PROCESS
              </div>
              <div>
                Candidates who meet the minimum qualifications, successfully
                complete the written examination and hiring process will be
                placed on the employment eligible list. The list will be used by
                the DPSCS to select employees for at least two years.
              </div>
              <div className="row bg-forest font-weight-bold">BENEFITS</div>
              <div>
                Some vacation, some paternity leave, some insurance, some child
                care discounts, flexible work schedules, student loan
                forgiveness
              </div>
              <div className="row bg-forest font-weight-bold">HOW TO APPLY</div>
              <div>
                <Link to="/applications/new">Apply Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Jobs;
