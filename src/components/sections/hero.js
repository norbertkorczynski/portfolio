import React, { useState, useEffect } from 'react';
import { StaticImage } from "gatsby-plugin-image";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    flex-direction: column;
    height: auto;
    padding-top: var(--nav-height);
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .img {
      max-width: 100%;
      height: auto;
    }
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 120px 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;


const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Norbert Korczynski</h2>;
  const three = <h3 className="big-heading">Senior Software Developer</h3>;
  const four = (
    <>
      <p>
        I specialize in embedded systems with expertise in C/C++,
        now focusing on AI integration hosted locally and in a cloud.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="#contact">
      Get In Touch
    </a>
  );

  const six = (
    <StaticImage
      className="img"
      src="../../images/snowboard.png"
      width={500}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="Background"
    />
  );

  const items = [one, two, three, four, five, six];

  return (
    <StyledHeroSection>
      <div className="content">
        {prefersReducedMotion ? (
          <>
            {items.slice(0, 5).map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              items.slice(0, 5).map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </div>
      <div className="image">
        {prefersReducedMotion ? (
          items[5]
        ) : (
          isMounted && (
            <CSSTransition classNames="fadeup" timeout={loaderDelay}>
              <div style={{ transitionDelay: `600ms` }}>{items[5]}</div>
            </CSSTransition>
          )
        )}
      </div>
    </StyledHeroSection>
  );  
};

export default Hero;
