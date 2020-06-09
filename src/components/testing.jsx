import React, { Component } from "react";

class Testing extends Component {
  state = {
    count: 0,
  };

  //   constructor() {
  //     super();
  //     this.handleIncrement = this.handleIncrement.bind(this);
  //     console.log("Constructor", this);
  //   }

  handleIncrement = (product) => {
    console.log(product);
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <h2>
          <span className={this.getBadgeClasses()}>{this.state.count}</span>
        </h2>
        <button
          onClick={() => {
            this.handleIncrement({ id: 1 });
          }}
          className="btn btn-primary"
        >
          Increment
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let badge = "badge badge-";
    this.state.count === 0 ? (badge += "warning") : (badge += "success");
    return badge;
  }
}

export default Testing;
