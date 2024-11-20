import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email, socialMedia } from '@config'; // Ensure the LinkedIn URL is in your config file
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .button-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .link-button,
  .link-button {
    ${({ theme }) => theme.mixins.bigButton};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    font-size: 16px;
    gap: 8px;
  }

  .link-button svg,
  .link-button svg {
    width: 18px;
    height: 18px;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        Whether you have a question or just want to say hi, my inbox is always open.
        I’ll try my best to get back to you!
      </p>

      <div className="button-container">
        <a className="link-button" href={`mailto:${email}`}>
         <Icon name="Email" />
        </a>
        <a className="link-button" href={socialMedia[1].url} target="_blank" rel="noopener noreferrer">
         <Icon name="Linkedin" />
        </a>
        <a className="link-button" href={socialMedia[2].url} target="_blank" rel="noopener noreferrer">
         <Icon name="Xing" />
        </a>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
