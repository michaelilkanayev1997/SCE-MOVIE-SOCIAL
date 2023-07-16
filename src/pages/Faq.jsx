import React, { useEffect, useState } from "react";
import styled from "styled-components";

const dataCollection = [
  {
    question: "What is SceMovieSocial?",
    answer:
      "SceMovieSocial is A closed SCE student social networking site focused on movies/series, allowing users to connect with people with similar interests, share their movie/series reviews and viewing experiences with them. You can also use this platform to discover new movies/series and see what others think about them.",
  },
  {
    question: "Do I have to have an account?",
    answer:
      "No, you don't. You will need an account if you want to enjoy detailed and rich content of movies and series.",
  },
  {
    question: "Does it cost to use the site?",
    answer: "No, it is free to use our website.",
  },
  {
    question: "Why can't I find what I am looking for?",
    answer:
      "There are two common scenarios. First, the media has not been added to our database yet. Second, it could be a misspelling, typo or foreign language issue." +
      "Movies and TV shows support translated titles as well as what we call 'Alternative Titles'. A lot of times the issue is simply that the translated or alternative title hasn't been added.",
  },
  {
    question: "What are the benefits of singing up?",
    answer:
      "There are many things you can do on the site with a registered account. Signing up for an account will not only allow you to view more details of the content, rate movies and series, add movies to your favorites list and post reviews of a movie or series.",
  },
  {
    question: "What API are you using?",
    answer:
      "We use the TMDB API. " +
      "TMDB API is a web service that provides developers with access to movie and series data, search functionality, image and trailer content, authentication and integration capabilities, and more, allowing them to create a wide variety of movie and series related applications and services.",
  },
];

const Faq = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [accordion, setActiveAccordion] = useState(-1);

  const toggleAccordion = (index) => {
    setActiveAccordion(index);
  };

  return (
    <Styledsection>
      <h1>FAQs</h1>
      <section className="faq"></section>
      <div className="container">
        <div className="accordion_faq">
          {dataCollection.map((item, index) => (
            <div key={index} onClick={() => toggleAccordion(index)}>
              <div className="accordion_faq_heading">
                <h3 className={accordion === index ? "active" : ""}>
                  {item.question}
                </h3>
              </div>
              <div>
                {accordion === index ? (
                  <>
                    <span className="verticle">-</span>
                  </>
                ) : (
                  <>
                    <span className="verticle">+</span>
                  </>
                )}
              </div>
              <div>
                <p className={accordion === index ? "active" : "inactive"}>
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Styledsection>
  );
};

// Styles
const Styledsection = styled.div`
  h1 {
    margin-top: 1rem;
    font-size: 70px;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  .faq {
    background-repeat: no-repeat;
    background-size: cover;
    height: 50px;
  }
  .container {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  .accordion-simple > .active {
    display: block;
  }
  .accordion_faq {
    width: 80%;
    margin-left: 130px;
  }
  .accordion_faq .inactive {
    display: none;
  }
  .accordion_faq > div {
    background-color: var(--white);
    margin-bottom: 20px;
    padding: 0px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  .accordion_faq_heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .accordion_faq_heading .active {
    color: var(--text-primary);
  }
  .accordion_faq_heading h3 {
    color: var(--text-secondary);
    font-weight: 600;
  }
  .accordion_faq p {
    margin: 0px;
    padding-bottom: 30px;
    folor: var(--text-secondary);
    line-height: 1.4;
  }
  @media screen and (max-width: 768px) {
    .faq {
      padding: 2rem 1rem 3rem 1rem;
    }
    .accordion_faq {
      width: 100%;
    }
  }
`;

export default Faq;
