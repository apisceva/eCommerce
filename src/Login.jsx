import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", message: "" };
  }
  render() {
    return (
      <div>
        <h4 className="m-1 p-2 border-bottom ">Login</h4>
        <div class="container h-100">
          <div class="row h-100 justify-content-center align-items-center">
            <div class="col-10 col-md-8 col-lg-6">
              {/*Email starts*/}
              <div className="form-group form-row col-lg-8">
                <label className="col-lg-4">Email:</label>
                <input
                  type="text"
                  className="form form-control"
                  value={this.state.email}
                  onChange={(event) => {
                    this.setState({ email: event.target.value });
                  }}
                />
              </div>
              {/*Email ends*/}

              {/*Password starts*/}
              <div className="form-group form-row col-lg-8 ">
                <label className="col-lg-4">Password:</label>
                <input
                  type="password"
                  className="form form-control"
                  value={this.state.password}
                  onChange={(event) => {
                    this.setState({ password: event.target.value });
                  }}
                />
              </div>
              {/*Password ends*/}

              <div className="d-grid gap-2 col-4 mx-auto">
                {this.state.message}
                <button
                  className="btn btn-primary m-1 "
                  onClick={this.onLoginClick}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    //end of render
  }
  //Executes when user clicks on Login
  onLoginClick = async () => {
    var response = await fetch(
      `http://localhost:5000/users?email=${this.state.email}&password=${this.state.password}`,
      { method: "GET" }
    );

    var body = await response.json();

    if (body.length > 0) {
      //success
      this.setState({
        message: <span className="text-success">Successfully Logged-in</span>,
      });
    } else {
      //error
      this.setState({
        message: (
          <span className="text-danger">Invalid login, please try again</span>
        ),
      });
    }
  };
}
