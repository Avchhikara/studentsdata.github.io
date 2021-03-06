import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointDown } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import "./Home.css";
import Notices from "./../Notices/Notices";

import { fetchURL } from "./../../Actions/constants";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      teacherName: "teacherName"
    };
  }

  componentDidMount() {
    if (!(this.props.user.loggedIn && !this.props.user.teacher)) {
      this.props.history.push("/login");
    } else if (this.props.user.teacher) {
      this.props.history.push("/teacher");
    }

    //Otherwise, scrolling to top
    this.scrollToTop();
    this.getNotices();
  }

  scrollToTop = () => {
    const top = document.querySelector("#top");
    if (top) {
      top.scrollIntoView({ behavior: "smooth" });
    }
  };

  getNotices = () => {
    axios
      .get(
        `${fetchURL}/notices?s_id=${this.props.user.userData.s_id}&token=${
          this.props.user.userData.id
        }`
      )
      .then(({ data }) => {
        console.log(data);
      });
  };

  render() {
    if (
      this.props.student.userData &&
      !this.props.user.teacher &&
      this.props.user.loggedIn
    ) {
      const { email } = this.props.student.userData;

      return (
        <div className="home-container">
          <h2 id="top">
            Welcome{" "}
            <span className="green-text small-on-small-and-down hide-on-small">
              {email ? email : ""}
            </span>
            ,{" "}
          </h2>
          <p className="green-text">
            Following are your options{" "}
            <FontAwesomeIcon icon={faHandPointDown} />{" "}
          </p>

          <Row>
            <Col sm={12} lg={8} md={12}>
              <Row>
                <Col sm={12} lg={6} md={6}>
                  <Link
                    to="/general"
                    className="home-button__link btn btn-success btn-block home-button"
                  >
                    Enter General Data
                  </Link>
                </Col>
                <Col sm={12} md={6} lg={6}>
                  <Link
                    className="home-button__link btn btn-success btn-block home-button"
                    to="/extra"
                  >
                    Enter extra curricular activites
                  </Link>
                </Col>

                <Col sm={12} md={6} lg={6}>
                  <Link
                    to="/result"
                    className="home-button__link btn btn-success btn-block home-button"
                  >
                    Enter Result
                  </Link>
                </Col>

                <Col sm={12} md={6} lg={6}>
                  <Link
                    to="/tandp"
                    className="home-button__link btn btn-success btn-block home-button"
                  >
                    Enter Training and Placement related data
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={12} lg={4}>
              <Notices
                purpose={"Home"}
                notices={[]}
                teacherName={this.state.teacherName}
              />
            </Col>
          </Row>
        </div>
      );
    } else {
      // this.props.history.push("/login");
      return <div>Please login first</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(Home);
