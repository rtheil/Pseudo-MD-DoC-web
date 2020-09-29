import React from "react";

const AllFake = () => {
  return (
    <div className="container text-center">
      <h3 className="text-white mt-3" style={{ backgroundColor: "#1B93A1" }}>
        This web site is not real
      </h3>
      <div className="d-flex p-2 justify-content-center">
        <img src="/images/ricky.jpg" alt="" className="pr-5" />
        <div style={{ width: 400 }}>
          Welcome to my project. My name is Ricky, and I've been a software
          engineer for more than 2 decades. This web site is an example of my
          abilities as a full-stack web application developer. I specialize in
          C# .Net Framework/Core applications and web sites with Javascript and
          React, and am familiar with many other languages. I'm also bilingual,
          speaking Spanish as a second language.
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-center">
        <div className="text-left">
          <h5>Engineered with the following tools</h5>
          <ul>
            <li>.Net Core 3.1 API written in C#</li>
            <li>
              <a href="https://docs.microsoft.com/en-us/ef/core/">
                Microsoft Entity Framework Core
              </a>
            </li>
            <li>
              <a href="https://azure.microsoft.com/en-us/services/sql-database/">
                Azure SQL Database
              </a>
            </li>
            <li>
              <a href="https://azure.microsoft.com/en-us/free/apps">
                Azure App Service
              </a>{" "}
              for API and web app
            </li>
            <li>
              <a href="https://nodejs.org">Node 12</a> and{" "}
              <a href="https://www.npmjs.com/package/react">React</a> with{" "}
              <a href="https://getbootstrap.com/">Bootstrap 4</a>
            </li>
            <li>
              <a href="https://www.npmjs.com/package/react-redux">
                React Redux state management
              </a>
            </li>
            <li>
              Other Node packages
              <ul>
                <li>
                  <a href="https://www.npmjs.com/package/@hapi/joi">
                    @hapi/joi
                  </a>
                </li>
                <li>
                  <a href="https://www.npmjs.com/package/axios">Axios</a>
                </li>
                <li>
                  <a href="https://www.npmjs.com/package/react-bootstrap">
                    react-bootstrap
                  </a>
                </li>
                <li>
                  <a href="https://www.npmjs.com/package/react-router-dom">
                    react-router-dom
                  </a>
                </li>
                <li>
                  <a href="https://www.npmjs.com/package/@sentry/react">
                    @sentry/react logging
                  </a>
                </li>
              </ul>
            </li>
            <li>
              API NuGet Packages
              <ul>
                <li>Entity Framework Core w/code-first migrations</li>
                <li>Javascript Web Tokens</li>
                <li>AutoMapper</li>
              </ul>
            </li>
            <li>
              Git repositories for{" "}
              <a href="https://github.com/rtheil/Pseudo-MD-DoC-web">Frontend</a>{" "}
              and <a href="https://github.com/rtheil/Pseudo-MD-DoC-API">API</a>
            </li>
            <li>
              Github CI/CD Pipelines
              <ul className="li">Publish API to Azure App Service</ul>
              <ul className="li">Publish frontend to Azure App Service</ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AllFake;
