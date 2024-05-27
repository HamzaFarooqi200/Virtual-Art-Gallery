import "./Team.css";

import React from "react";
import duotonechecks from "./TeamAssets/duotonechecks.svg";
import groupPhoto from "./TeamAssets/unsplashalwcwgfmwq@2x.png";
import hamzaPic from "../images/hamzaPic.jpg";
import jamshaidPic from "../images/jamshaidPic.jpg";
import kabeerPic from "../images/kabeerPic.jpg";
import waqasPic from "../images/waqasPic.jpg";
import hassamPic from "../images/hassamPic.jpg";
import Navbar from "../Components/Navbar";
import FooterComponent from "../Components/Footer/Footer";


const AboutUs = () => {
  return (
    <div>
    <div>
      <Navbar/>
    <div className="about-us">
      <div className="about-section">
        <div className="content">
          <div className="content1">
            <div className="top-category">
              <div className="badge">
                <div className="hot">WHO WE ARE</div>
              </div>
              <div className="kinbo-largest">
                VAG - Largest Art Selling Plateform.
              </div>
            </div>
            <div className="pellentesque-ultrices-dui">{`Pellentesque ultrices, dui vel hendrerit iaculis, ipsum velit vestibulum risus, ac tincidunt diam lectus id magna. Praesent maximus lobortis neque sit amet rhoncus. Nullam tempus lectus a dui aliquet, non ultricies nibh elementum. Nulla ac nulla dolor. `}</div>
          </div>
          <div className="all-feature">
            <div className="social-icon">
              <img
                className="regularmappinline-icon"
                alt=""
                src={duotonechecks}
              />
              <div className="great-247-customer">
                Great 24/7 customer services.
              </div>
            </div>
            <div className="social-icon">
              <img
                className="regularmappinline-icon"
                alt=""
                src={duotonechecks}
              />
              <div className="great-247-customer">
                Over 100+ Different Arts Available
              </div>
            </div>
            <div className="social-icon">
              <img
                className="regularmappinline-icon"
                alt=""
                src={duotonechecks}
              />
              <div className="great-247-customer">Over 100+ Users</div>
            </div>
          </div>
        </div>
        <img className="unsplashalw-cwgfmwq-icon" alt="" src={groupPhoto} />
      </div>
      <div className="team">
        <div className="team-member">
          <div className="our-core-team">Our core team member</div>
          <div className="team-member1">
            <div className="row">
              <div className="team-members-container">
                <div className="team-member2">
                  <img className="image-icon" alt="" src={jamshaidPic} />
                  <div className="content3">
                    <div className="kevin-gilbert">Jamshaid Mehmood</div>
                    <div className="chief-executive-officer">
                      Project Leader <br />
                      Full Stack Developer
                    </div>
                  </div>
                </div>
                <div className="team-member2">
                  <img className="image-icon" alt="" src={hamzaPic} />
                  <div className="content3">
                    <div className="kevin-gilbert">Hamza Farooqi</div>
                    <div className="chief-executive-officer">
                      Full Stack Developer <br />
                    </div>
                  </div>
                </div>
                <div className="team-member2">
                  <img className="image-icon" alt="" src={waqasPic} />
                  <div className="content3">
                    <div className="kevin-gilbert">Muhammad Waqas Ud Din</div>
                    <div className="chief-executive-officer">
                      Full Stack Developer <br />
                    </div>
                  </div>
                </div>
                <div className="team-member2">
                  <img className="image-icon" alt="" src={hassamPic}/>
                  <div className="content3">
                    <div className="kevin-gilbert">Hassam Azam</div>
                    <div className="chief-executive-officer">
                    Full Stack Developer <br />
                    </div>
                  </div>
                </div>
                <div className="team-member2">
                  <img className="image-icon" alt="" src={kabeerPic} />
                  <div className="content3">
                    <div className="kevin-gilbert">Kabeer Ali</div>
                    <div className="chief-executive-officer">Full Stack Developer <br /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <FooterComponent/>
    </div>
  );
};

export default AboutUs;
