import React, { Component } from "react";
import "./About.css";
import pfp_vok from "../assets/pfp_vok.jpg";

export default class About extends Component {
  render() {
    return (
      <div>
        {/* <p>Design your About me page </p> */}
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={pfp_vok}
              alt="Profile Pic"
            ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Your Name</div>
              <div className="brief_description">
                <h5><u>About Me:</u></h5>
                I am a rising third year at the University of Virginia studying Computer Science and Data Science. 
                I am exploring around the different aspects of CS - software engineering (full-stack), data science, UX design - and hope to learn 
                even more through IBM Accelerate!
                <br></br> <br></br>

                <h5><u>Interests:</u></h5>
                I enjoy playing the violin, listening to music (mostly soft/acoustics), cooking, and playing sudoku. 
                I also love spending time with my family - talking, taking walks, and watching feel-good shows/movies! <br></br> <br></br>

                <h5><u>Fun Facts:</u></h5> <ul>
                  <li>I have been playing the violin for more than half of my life! </li>
                  <li>My MBTI is INFJ (the rarest personality type in the world!) and my enneagram is type 1</li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
