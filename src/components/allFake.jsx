import React from "react";

const AllFake = () => {
  return (
    <div className="container text-center">
      <h3 className="bg-danger text-white mt-3">
        This web site is entirely fake!
      </h3>
      <div container>
        Welcome to my project. My name is Ricky, and I'm a full-stack engineer
        of more than 2 decades. This web site is an example of my abilities as a
        full-stack web application developer. This web site uses the following
        technologies:
      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="col-5 text-left">
          <ul>
            <li>.Net Core 3 API written in C#</li>
            <li>Microsoft Entity Framework 3</li>
            <li>Microsoft SQL server on Azure</li>
            <li>Azure App Service for API and web app</li>
            <li>Node 12 and React with Bootstrap 4</li>
            <li>
              Other Node packages
              <ul>
                <li>@hapi/joi</li>
                <li>Axios</li>
                <li>react-bootstrap</li>
                <li>react-router-dom</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default AllFake;
