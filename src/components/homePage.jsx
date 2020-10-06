import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Pellentesque elit eget gravida cum sociis natoque penatibus. Faucibus purus in massa tempor nec. Cras tincidunt lobortis feugiat vivamus at. Ut diam quam nulla porttitor. Nec nam aliquam sem et tortor consequat id. Praesent semper feugiat nibh sed. Ultrices in iaculis nunc sed augue lacus. Tortor consequat id porta nibh venenatis cras sed. Sollicitudin tempor id eu nisl. Pharetra et ultrices neque ornare aenean euismod elementum nisi. Tellus rutrum tellus pellentesque eu tincidunt tortor. Interdum velit laoreet id donec ultrices tincidunt arcu non. Ultrices neque ornare aenean euismod elementum nisi quis eleifend quam. Diam sollicitudin tempor id eu nisl nunc. Leo vel orci porta non pulvinar neque laoreet suspendisse. Fermentum iaculis eu non diam phasellus vestibulum lorem. Ridiculus mus mauris vitae ultricies.";
const loremIpsum2 =
  "Tincidunt augue interdum velit euismod in pellentesque. Leo in vitae turpis massa. Auctor urna nunc id cursus metus aliquam eleifend mi. Volutpat ac tincidunt vitae semper quis lectus nulla at volutpat. Cursus risus at ultrices mi. Felis donec et odio pellentesque diam volutpat commodo sed egestas. Ultrices in iaculis nunc sed. Lectus nulla at volutpat diam ut venenatis tellus in. Dictumst vestibulum rhoncus est pellentesque. Et netus et malesuada fames ac turpis egestas. Odio eu feugiat pretium nibh ipsum. Risus nec feugiat in fermentum. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. Proin nibh nisl condimentum id venenatis. Suspendisse faucibus interdum posuere lorem ipsum dolor sit. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Bibendum neque egestas congue quisque egestas diam.";
const loremIpsum3 =
  "Mauris ultrices eros in cursus. Lacus vel facilisis volutpat est velit. Facilisis magna etiam tempor orci eu lobortis elementum. Nam aliquam sem et tortor. Varius sit amet mattis vulputate enim. Neque aliquam vestibulum morbi blandit cursus risus at ultrices mi. Eu lobortis elementum nibh tellus molestie nunc non. Risus pretium quam vulputate dignissim. Libero enim sed faucibus turpis. Pharetra convallis posuere morbi leo urna molestie at. Aliquam malesuada bibendum arcu vitae elementum. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi.";

export default function HomePage() {
  return (
    <Container className="container-lg">
      <Row>
        <Col sm={5} lg={3} className="border-right pl-1">
          <div className="font-weight-bold">Top Links</div>
          <ul>
            <li>
              <Link to="/jobs" className="btn-sm">
                Becoming a Correctional Officer
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="btn-sm">
                Careers at Public Safety
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                Find a Facility
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                Find an Inmate
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                Sex Offender Registry
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                Fingerprinting
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                Public Safety Units
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                Volunteers
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                Public Information Act
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                Policies and Procedures
              </Link>
            </li>
          </ul>

          <div className="font-weight-bold">Data and Reports</div>
          <ul>
            <li>
              <Link to="/fake" className="btn-sm">
                DPSCS Annual Data Dashboard
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                DPSCS Community Releases
              </Link>
            </li>
          </ul>

          <div className="font-weight-bold">Services For:</div>
          <ul>
            <li>
              <Link to="/fake" className="btn-sm">
                Public
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                Offender Families
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                Victims
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                Criminal Justice Partners
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                Research & Statistics
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                Employees
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                Veterans
              </Link>
            </li>
            <li>
              <Link to="/fake" className="btn-sm">
                Publications
              </Link>
            </li>
          </ul>
        </Col>

        <Col>
          <hr className="border-dark" />
          <div className="font-weight-bold">
            Rivers Look Blue, but They Aren't
          </div>
          <div className="" style={{ fontSize: 16 }}>
            <img
              src="/images/rivers.jpg"
              alt=""
              className="float-left mr-3 mb-2"
            />
            {loremIpsum2}
          </div>
          <hr className="border-dark" />
          <div className="font-weight-bold">
            Trees are Green, Rocks are gray
          </div>
          <div className="" style={{ fontSize: 16 }}>
            <img
              src="/images/trees.jpg"
              alt=""
              className="float-left mr-3 mb-2"
            />
            {loremIpsum}
          </div>
          <hr className="border-dark" />
          <div className="font-weight-bold">Jellyfish: Do they wear pants?</div>
          <div className="" style={{ fontSize: 16 }}>
            <img
              src="/images/jellyfish.jpg"
              alt=""
              className="float-left mr-3 mb-2"
            />
            {loremIpsum3}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
