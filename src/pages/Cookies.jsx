import React, { useEffect } from 'react'
import styled from "styled-components";

const Cookies=()=> {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
      <Styledsection>
        <h1>Cookies</h1>
        <section className="cookies"></section>
        <div className="content">
          <div className="column">
            <div className="content">
              <p>
                <h2><b>Table of Contents</b></h2>
              </p>
              <p>
                1. WHAT ARE COOKIES AND HOW ARE THEY USED? 
              </p>
              <p>
                2. COOKIE MANAGEMENT
              </p>
              <p>
                3. CHANGES TO THIS NOTICE
              </p>
            </div>
            <div className="content">
              <p>
                <b>1. WHAT ARE COOKIES AND HOW ARE THEY USED?</b>
              </p>
              <p>
                Like many companies, we use cookies (small text files placed on your computer or device) 
                and other tracking technologies on the Services (referred to together from this point forward as “Cookies”,
                unless otherwise stated). 
              </p>
              <p>
                <b>First party Cookies</b>
              </p>
              <p>
                First party Cookies are placed by us (including through the use of third party service providers)                       and are used to allow you to use the Services and their features and to assist in analytics activities.
              </p>
              <p>
                <b>Third party Cookies</b>
              </p>
              <p>
                Certain third parties may place their Cookies on your device and use them to recognize your device when you visit
                the Services and when you visit other websites or services. These third parties collect and use this information
                pursuant to their own privacy policies. Third party Cookies enable certain features or functionalities and advertising
                to be provided on the Services. 
              </p>
              <p>
                The Services use the following types of first and third party Cookies for these purposes:                  </p>
              <p>
                <b>•	Strictly Necessary Cookies: </b> 
                These Cookies are required for Service functionality, such as system administration and performance, 
                to assist with fraud deterrence and security. Because these Cookies are necessary,if you refuse them 
                it will impact the functionality of the Services.
              </p>
              <p>
                <b>•	Information Storage and Access: </b>
                These Cookies allow us and our analytic and advertising providers and associates to store and access information
                on the device, such as device identifiers.
              </p>
              <p> 
                <b>•	Measurement and Analytics: </b>  
                These Cookies collect data regarding your usage of our Services and other services, apply market research to
                generate audiences, and measure the delivery and effectiveness of content and advertising. We and third parties
                with whom we work use these Cookies to perform analytics, to improve content and user experience, to develop new
                products and services, and for statistical purposes. They are also used to recognize you and provide further insights
                across platforms and devices for the above purposes. 
              </p>
              <p>
                <b>•	Personalization Cookies: </b>
                These Cookies enable the Services to provide certain features such as determining if you are a first time visitor,
                remembering choices you have made. Data collected can also be used to select and deliver personalized content to you. 
                These Cookies also allow your device to receive and send information, so you can see and interact with content.
              </p>
            </div>
            <div className="content">
              <p>
                <b>2. COOKIE MANAGEMENT</b>
              </p>
              <p>
                Depending on where you live, you may be able to adjust your Cookie preferences at any time via the “Cookie Settings” 
                link in the footer of relevant websites. In order to do so, you must take such steps on each browser or device that 
                you use. If you replace, change or upgrade your browser or device, or if you delete your Cookies, you may need to use these opt-out tools again.
              </p>
              <p>
                <b>Browser Controls: </b> 
                You may be able to disable and manage some Cookies through your browser settings. If you use multiple browsers on your
                device, you will need to manage your settings for each. 
              </p>
              <p>
                <b>Consequences of Deactivation of all Cookies: </b> 
              </p>
              <p>
                If you disable or remove Cookies, some parts of the Services may not function properly. 
                Information may still be collected and used for other purposes, such as research, online 
                services analytics or internal operations, and to remember your opt-out preferences. 
              </p>
            </div>
            <div className="content">
              <p>
                <b>3. CHANGES TO THIS NOTICE</b>
              </p>
              <p>
                This Notice may be revised occasionally and in accordance with legal requirements. 
                Please revisit this Cookie Notice regularly to stay informed about our and our analytic 
                and advertising providers and associates’ use of Cookies. 
              </p>
            </div>
          </div>
        </div>
      </Styledsection>
  )
}

// Styles
const Styledsection = styled.div`
  h1 {
    margin-top: 1rem;
    font-size: 70px;
    text-align: center;
    margin-bottom: 0.1rem;
  }
  .cookies {
    background-repeat: no-repeat;
    background-size: cover;
    height: 50px;
  }
  .content {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  .content h2 {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.4;
    margin-bottom: 1rem;
    color: #999;
  }
  .content p {
    padding-bottom: 1rem;
    font-size: 16px;
    line-height: 1.8;
    font-weight: 400;
    color: #999;
  }
  .column {
    width: 80%;
    margin-left: 130px;
  }
  @media screen and (max-width: 768px) {
    .cookies {
      padding: 2rem 1rem 3rem 1rem;
    }
    .column {
      width: 100%;
    }
  }
`;

export default Cookies
