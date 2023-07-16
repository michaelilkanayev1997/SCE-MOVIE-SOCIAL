import React, { useEffect } from 'react'
import styled from "styled-components";

const TermsAndPolicies=()=> {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
      <Styledsection>
        <h1>Terms & Policies</h1>
        <section className="termsandpolicies"></section>
        <div className="content">
            <div className="column">
                <div className="content">
                    <p>
                        Welcome to our SCE-MOVIE-SOCIAL Site (the "Site"). By accessing or using the Site, 
                        you agree to be bound by these terms and policies (the "Terms"). Please read these 
                        Terms carefully before using the Site.
                    </p>
                </div> 
                <div className="content">
                    <p>
                        <b>1. Intellectual Property</b>
                    </p>
                    <p>
                        All content on the Site, including but not limited to text, graphics, logos, images, audio 
                        clips, and video clips, is the property of our site or its content suppliers and is protected 
                        by copyright and other intellectual property laws. You may not reproduce, modify, distribute, 
                        transmit, display, perform, or otherwise use any content from the Site without our prior written 
                        consent.
                    </p>
                </div>
                <div className="content">
                    <p>
                        <b>2. User Accounts</b>
                    </p>
                    <p>
                        To access certain features of the Site, you may be required to create a user account. 
                        You agree to provide accurate and complete information when creating your account and to 
                        keep your account information up-to-date. You are responsible for maintaining the 
                        confidentiality of your account and password and for restricting access to your computer 
                        or mobile device. You agree to accept responsibility for all activities that occur under 
                        your account.
                    </p>
                </div> 
                <div className="content">
                    <p>
                        <b>3. User Content</b>
                    </p>
                    <p>
                        The Site may allow users to upload or submit content, including but not limited to 
                        comments, reviews, and ratings. You retain all rights in your user content and grant 
                        us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to 
                        use, copy, modify, create derivative works based on, distribute, publicly display, 
                        publicly perform, and otherwise exploit in any manner such user content in all formats 
                        and distribution channels now known or hereafter devised (including in connection with 
                        the Site and our business and on third-party sites and services), without further notice 
                        to or consent from you, and without the requirement of payment to you or any other person 
                        or entity.
                    </p>
                    <p>
                        You represent and warrant that: (i) you either are the sole and exclusive owner of 
                        all user content or you have all rights, licenses, consents, and releases that are 
                        necessary to grant to us the rights in such user content, as contemplated under 
                        these Terms; (ii) neither the user content, nor your submission, uploading, 
                        publishing, or otherwise making available of such user content, nor our use of the 
                        user content as permitted herein will infringe, misappropriate or violate a third 
                        party's patent, copyright, trademark, trade secret, moral rights or other 
                        proprietary or intellectual property rights, or rights of publicity or privacy, 
                        or result in the violation of any applicable law or regulation.
                    </p>
                </div> 
                <div className="content">
                    <p>
                        <b>4. Prohibited Activities</b>
                    </p>
                    <p>
                        You agree not to engage in any of the following activities:
                    </p>
                    <p>
                        •	Use the Site for any illegal or unauthorized purpose;
                    </p>
                    <p>
                        •	Post, upload, or distribute any content that is defamatory, obscene, indecent, 
                        or otherwise objectionable;
                    </p>
                    <p>
                        •	Harass, threaten, or intimidate other users of the Site; 
                    </p>
                    <p>
                        •	Attempt to interfere with the proper functioning of the Site or any activity 
                        conducted on the Site;
                    </p>
                    <p>
                        •	Attempt to bypass any measures we have put in place to prevent or restrict 
                        access to the Site;
                    </p>
                    <p>
                        •	Engage in any activity that could damage, disable, overburden, or impair 
                        the Site or our servers;
                    </p>
                    <p>
                        •	Use the Site to advertise or promote products or services without our prior 
                        written consent.
                    </p>
                </div>
                <div className="content">
                    <p>
                        <b>5. Disclaimer of Warranties</b>
                    </p>
                    <p>
                        THE SITE AND ITS CONTENT ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.
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
  .termsandpolicies {
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
    .termsandpolicies {
      padding: 2rem 1rem 3rem 1rem;
    }
    .column {
      width: 100%;
    }
  }
`;

export default TermsAndPolicies
