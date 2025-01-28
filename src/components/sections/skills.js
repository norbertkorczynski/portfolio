import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Icon } from "@components/icons"; // Ensure this component is correctly imported
import styled from "styled-components";

const SkillsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; // For absolute positioning of background if needed

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
    margin-bottom: 20px;
  }

  .skills-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(5, 1fr); // Limit to 5 columns
    grid-gap: 15px;
    margin-top: 30px;
    width: 100%;
    padding: 0;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr); // Adjust for smaller screens
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr; // Stack on extra small screens
    }
  }
`;

const SkillItem = styled(motion.li)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  color: var(--light-slate);
  transition:
    transform 0.3s,
    background-color 0.3s,
    color 0.3s;
  height: 150px; // Ensure visibility

  &:hover {
    transform: translateY(-5px);
    border: 2px solid var(--green);
    color: var(--lightest-slate);
  }

  svg {
    width: 70px;
    height: 70px;
    margin-bottom: 0.5rem;
  }

  .skill-label {
    font-size: 1.25rem;
    text-align: center;
  }
`;

const SkillsGrid = () => {
  const skills = useMemo(
    () => [
      { name: "C", label: "C" },
      { name: "Cpp", label: "C++" },
      { name: "Matlab", label: "MATLAB" },
      { name: "Rhapsody", label: "Rhapsody" },
      { name: "Docker", label: "Docker" },
      { name: "Python", label: "Python" },
      { name: "Langchain", label: "Langchain" },
      { name: "ChromaDB", label: "Chroma DB" },
      { name: "Git", label: "Git" },
      { name: "Azure", label: "Azure" },
    ],
    [],
  );

  return (
    <SkillsSection>
      <h2>My Major Skills</h2>
      <ul className="skills-grid">
        {skills.map((skill, index) => (
          <SkillItem
            key={skill.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="skill-item"
          >
            <Icon name={skill.name} />
            <p className="skill-label">{skill.label}</p>
          </SkillItem>
        ))}
      </ul>
    </SkillsSection>
  );
};

export default SkillsGrid;
