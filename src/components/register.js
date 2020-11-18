/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";
import axios from "axios";

import {
  Container,
  Card,
  Row,
  Alert,
  InputGroup,
  Form,
  Button,
  Nav,
  OverlayTrigger,
  Tooltip,
  ProgressBar,
} from "react-bootstrap";

import { Redirect } from "react-router-dom";
import email_default from "../assets/images/req_for_adduser/email_default.jpg";
import email_formatcorrect from "../assets/images/req_for_adduser/email_formatcorrect.jpg";
import email_formatwrong from "../assets/images/req_for_adduser/email_formatwrong.jpg";
import password_default from "../assets/images/req_for_adduser/password_default.jpg";
import password_formatcorrect from "../assets/images/req_for_adduser/password_formatcorrect.jpg";
import password_formatwrong from "../assets/images/req_for_adduser/password_formatwrong.jpg";
import name_default from "../assets/images/req_for_adduser/name_default.jpg";

// import lname_formatcorrect from "../assets/images/req_for_adduser/img_correct.jpg";
// import lname_formatwrong from "../assets/images/req_for_adduser/img_wrong.jpg";
import fullName_formatcorrect from "../assets/images/req_for_adduser/img_correct.jpg";
import fullName_formatwrong from "../assets/images/req_for_adduser/img_wrong.jpg";
import goku_default from "../assets/images/req_for_adduser/goku_default.png";

import goku_kid from "../assets/images/req_for_adduser/goku_kid.jpg";
import goku_young from "../assets/images/req_for_adduser/goku_young.jpg";

import goku_adult from "../assets/images/req_for_adduser/goku_adult.jpg";

import goku_ssj1 from "../assets/images/req_for_adduser/goku_ssj1.jpg";
import goku_ssj2 from "../assets/images/req_for_adduser/goku_ssj2.jpg";
import goku_ssj3 from "../assets/images/req_for_adduser/goku_ssj3.jpg";
import goku_ssj4 from "../assets/images/req_for_adduser/goku_ssj4.jpg";
import goku_ssj5 from "../assets/images/req_for_adduser/goku_ssj5.jpg";
import goku_ssj6 from "../assets/images/req_for_adduser/goku_ssj6.jpg";
import goku_ssj7 from "../assets/images/req_for_adduser/goku_ssj7.jpg";

export default class AddUser extends Component {
  state = {
    fullName: "",
    // lname: "",
    // fullName: function () {
    //   return this.fullName + " " + this.lname;
    // },
    email: "",
    password: "",
    atype: "",
    message: "",
    fullNamePatternMsg: (
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="tooltip-disabled">Enter Firstname</Tooltip>}
      >
        <span className="d-inline-block">
          <img src={name_default} alt="name_default" height="50px" />
        </span>
      </OverlayTrigger>
    ),
    // lnamePatternMsg: (
    //   <OverlayTrigger
    //     placement="right"
    //     overlay={<Tooltip id="tooltip-disabled">Enter Lastname</Tooltip>}
    //   >
    //     <span className="d-inline-block">
    //       <img src={name_default} alt="name_default" height="50px" />
    //     </span>
    //   </OverlayTrigger>
    // ),

    emailPatternMsg: (
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="tooltip-disabled">Enter Email</Tooltip>}
      >
        <span className="d-inline-block">
          <img src={email_default} alt="email_default" height="50px" />
        </span>
      </OverlayTrigger>
    ),
    passwordPatternMsg: (
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="tooltip-disabled">Enter Password</Tooltip>}
      >
        <span className="d-inline-block">
          <img src={password_default} alt="password_default" height="50px" />{" "}
        </span>
      </OverlayTrigger>
    ),
    fullNameFormatMatched: true,
    // lnameFormatMatched: true,
    emailFormatMatched: true,
    passwordFormatMatched: true,
    register_visibility: "",
    redirect: false,
    passwordStrengthBar: { variant: "secondary", now: 0 },
    cardImg: function (value) {
      switch (value) {
        case 10:
          this.passwordStrengthBar.variant = "secondary";
          return goku_kid;
        case 20:
          this.passwordStrengthBar.variant = "danger";
          return goku_young;
        case 30:
          this.passwordStrengthBar.variant = "dark";
          return goku_adult;
        case 40:
          this.passwordStrengthBar.variant = "warning";
          return goku_ssj1;
        case 50:
          this.passwordStrengthBar.variant = "success";
          return goku_ssj2;
        case 60:
          this.passwordStrengthBar.variant = "warning";
          return goku_ssj3;
        case 70:
          this.passwordStrengthBar.variant = "dark";
          return goku_ssj4;
        case 80:
          this.passwordStrengthBar.variant = "warning";
          return goku_ssj5;
        case 90:
          this.passwordStrengthBar.variant = "danger";
          return goku_ssj6;
        case 100:
          this.passwordStrengthBar.variant = "primary";
          return goku_ssj7;
        // break;
        default:
          return goku_default;
      }
    },
    cardBorderVariant: function (value) {
      switch (value) {
        case 10:
          return "primary";
        case 20:
          return "danger";
        case 30:
          return "warning";
        case 40:
          return "success";
        case 50:
          return "primary";
        case 60:
          return "dark";
        case 70:
          return "warning";
        case 80:
          return "warning";
        case 90:
          return "danger";
        case 100:
          return "primary";
        // break;
        default:
          break;
      }
    },
  };

  // ****** checking for fullName and lname ******
  handleChangeFullName = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });

    // if (name == "fullName") {
    this.setState({
      fullNamePatternMsg: (
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip id="tooltip-disabled">
              {value.match("^[a-zA-Z-]+$") != null
                ? "Valid Format ✔"
                : "Fullname cannot be empty"}
            </Tooltip>
          }
        >
          <span className="d-inline-block">
            <img
              src={
                value.match("^[a-zA-Z-]+$") != null
                  ? fullName_formatcorrect
                  : fullName_formatwrong
              }
              alt=""
              height="50px"
            />
          </span>
        </OverlayTrigger>
      ),
      fullNameFormatMatched: !(value.match("^[a-zA-Z-]+$") != null),
    });
    // }
    // if (name == "lname") {
    //   this.setState({
    //     lnamePatternMsg: (
    //       <OverlayTrigger
    //         placement="right"
    //         overlay={
    //           <Tooltip id="tooltip-disabled">
    //             {value.match("^[a-zA-Z-]+$") != null
    //               ? "Valid Format ✔"
    //               : "Lastname cannot be empty"}
    //           </Tooltip>
    //         }
    //       >
    //         <span className="d-inline-block">
    //           <img
    //             src={
    //               value.match("^[a-zA-Z-]+$") != null
    //                 ? lname_formatcorrect
    //                 : lname_formatwrong
    //             }
    //             alt=""
    //             height="50px"
    //           />
    //         </span>
    //       </OverlayTrigger>
    //     ),
    //     lnameFormatMatched: false,
    //   });
    // }
  };
  handleChangeEmail = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    // console.log(this.state);
    // https://www.w3resource.com/javascript/form/email-validation.php  <= refered for regex for email
    if (
      value.match(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      ) != null
    ) {
      console.log("All Good");
      this.setState({
        emailPatternMsg: (
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id="tooltip-disabled">Valid Format ✔</Tooltip>}
          >
            <span className="d-inline-block">
              <img
                src={email_formatcorrect}
                alt="email_formatcorrect"
                height="50px"
              />
            </span>
          </OverlayTrigger>
        ),
        emailFormatMatched: false,
      });
    } else {
      console.log("there is some err");
      this.setState({
        emailPatternMsg: (
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="tooltip-disabled">
                Please enter email in given format : sundar12@gmail.com
              </Tooltip>
            }
          >
            <span className="d-inline-block">
              <img
                src={email_formatwrong}
                alt="email_formatwrong"
                height="50px"
              />
            </span>
          </OverlayTrigger>
        ),
        emailFormatMatched: true,
      });
    }
  };
  handleChangePassword = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    // console.log(this.state);
    // https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/  <= refered for regex for password 8 characters or longer
    if (
      value.match(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      ) != null
    ) {
      console.log("All Good");
      this.setState({
        passwordPatternMsg: (
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id="tooltip-disabled">Valid Format ✔</Tooltip>}
          >
            <span className="d-inline-block">
              <img src={password_formatcorrect} height="50px" />
            </span>
          </OverlayTrigger>
        ),
        passwordFormatMatched: false,
      });
    } else {
      console.log(value);
      this.setState({
        passwordPatternMsg: (
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="tooltip-disabled">
                Password must include atleast 1 numeric, 1 special character, 1
                uppercase and 1 lowercase characters and length should be
                greater than or equal to 8 characters
              </Tooltip>
            }
          >
            <span className="d-inline-block">
              <img
                src={password_formatwrong}
                alt="password_formatwrong"
                height="50px"
              />{" "}
            </span>
          </OverlayTrigger>
        ),
        passwordFormatMatched: true,
      });
    }
    this.state.passwordStrengthBar.now = 0;
    if (value.match("")) {
      this.state.passwordStrengthBar.variant = "danger";
      this.state.passwordStrengthBar.now = 0;
    }
    if (value.match("^(?=.*[a-z])")) {
      this.state.passwordStrengthBar.now =
        this.state.passwordStrengthBar.now + 10;
    }
    if (value.match("^(?=.*[A-Z])")) {
      this.state.passwordStrengthBar.now =
        this.state.passwordStrengthBar.now + 10;
    }
    if (value.match("^(?=.*[0-9])")) {
      this.state.passwordStrengthBar.now =
        this.state.passwordStrengthBar.now + 10;
    }
    if (value.match("^(?=.*[!@#$%^&*])")) {
      this.state.passwordStrengthBar.now =
        this.state.passwordStrengthBar.now + 10;
    }
    if (value.match("^(?=.{5})")) {
      this.state.passwordStrengthBar.now =
        this.state.passwordStrengthBar.now + 10;
    }
    if (value.match("^(?=.{6})")) {
      this.state.passwordStrengthBar.now =
        this.state.passwordStrengthBar.now + 10;
    }
    if (value.match("^(?=.{7})")) {
      this.state.passwordStrengthBar.now =
        this.state.passwordStrengthBar.now + 10;
    }
    if (value.match("^(?=.{8})")) {
      this.state.passwordStrengthBar.now =
        this.state.passwordStrengthBar.now + 10;
    }
    if (value.match("^(?=.{9})")) {
      this.state.passwordStrengthBar.now =
        this.state.passwordStrengthBar.now + 10;
    }
    if (value.match("^(?=.{10,})")) {
      this.state.passwordStrengthBar.now =
        this.state.passwordStrengthBar.now + 10;
    }
  };

  responseGoogleSucess = (response) => {
    const payLoad = {
      fullName: response.profileObj.name,
      email: response.profileObj.email,
      googleId: response.profileObj.googleId,
    };
    console.log(response);
    axios({
      url: "http://localhost:5000/users/google/register",
      method: "POST",
      data: payLoad,
    })
      .then(() => {
        this.setState({
          atype: "success",
          message: "Sign Up with Google Successfull",
          redirect: true,
        });
        console.log("New User Data Has Been Sent to User");
      })
      .catch(() => {
        this.setState({
          atype: "danger",
          message: "There was some problem !",
        });
        console.log("Internal Server error");
      });
  };
  responseGoogleFailure = (response) => {
    console.log("Failed");
  };
  render() {
    return (
      <React.Fragment>
        <Container className="logreg-forms App-header py-5">
          <Card
            border={this.state.cardBorderVariant(
              this.state.passwordStrengthBar.now
            )}
            style={{ width: "50rem" }}
          >
            <Card.Header>Check the STRENGTH of your password</Card.Header>
            <Card.Body>
              <Card.Title>
                Character form represents strength of your password &nbsp;
                &nbsp; &nbsp; &nbsp;
                <img
                  src={this.state.cardImg(this.state.passwordStrengthBar.now)}
                  height="200px"
                  className="rounded-circle"
                />
                &nbsp; &nbsp; &nbsp; &nbsp;
                <ProgressBar
                  striped
                  animated
                  variant={this.state.passwordStrengthBar.variant}
                  now={this.state.passwordStrengthBar.now}
                />
              </Card.Title>
              {/* <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
               
              </Card.Text> */}
            </Card.Body>
          </Card>
          <Alert variant={this.state.atype}>{this.state.message}</Alert>
          <Form className="form-signin" onSubmit={this.submit}>
            <Nav
              fill
              variant="pills"
              activeKey="2"
              defaultActiveKey="/home"
            ></Nav>
            <Form.Row as={Row} controlId="formBasicText">
              <Form.Label column sm="2">
                Full&nbsp;Name
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Ex: Sundar"
                  name="fullName"
                  onChange={this.handleChangeFullName}
                />
                <InputGroup.Append>
                  {this.state.fullNamePatternMsg}
                </InputGroup.Append>
              </InputGroup>
            </Form.Row>

            <Form.Row as={Row} controlId="formBasicText">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Ex: sundarp12@gmail.com"
                  name="email"
                  onChange={this.handleChangeEmail}
                />
                <InputGroup.Append>
                  {this.state.emailPatternMsg}
                </InputGroup.Append>
              </InputGroup>
            </Form.Row>
            <Form.Row as={Row} controlId="formBasicPassword">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="password"
                  placeholder="************"
                  name="password"
                  onChange={this.handleChangePassword}
                />
                <InputGroup.Append>
                  {this.state.passwordPatternMsg}
                </InputGroup.Append>
              </InputGroup>

              {/* <Form.Row.Text id="inputGroupPrepend">@</Form.Row.Text> */}
            </Form.Row>

            <Button
              variant={this.state.passwordStrengthBar.variant}
              type="submit"
              block
            >
              Register
            </Button>
            {/* *****************Google Sign-Up button ***************/}
          </Form>
          {this.state.redirect && <Redirect to="/" />}
        </Container>
      </React.Fragment>
    );
  }
}
