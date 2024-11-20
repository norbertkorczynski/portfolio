import React from 'react';
import PropTypes from 'prop-types';
import {
  IconAppStore,
  IconBookmark,
  IconCodepen,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconInstagram,
  IconEmail,
  IconLinkedin,
  IconLoader,
  IconLogo,
  IconPlayStore,
  IconStar,
  IconTwitter,
  IconXing,
  IconC,
  IconCMake,
  IconCpp,
  IconChroma,
  IconDocker,
  IconGit,
  IconLangchain,
  IconMatlab,
  IconPython,
  IconRhapsody,
  IconSvn,
} from '@components/icons';

const Icon = ({ name }) => {
  switch (name) {
    case 'AppStore':
      return <IconAppStore />;
    case 'Bookmark':
      return <IconBookmark />;
    case 'Codepen':
      return <IconCodepen />;
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'Fork':
      return <IconFork />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Instagram':
      return <IconInstagram />;
    case 'Email':
      return <IconEmail />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'Loader':
      return <IconLoader />;
    case 'Logo':
      return <IconLogo />;
    case 'PlayStore':
      return <IconPlayStore />;
    case 'Star':
      return <IconStar />;
    case 'Twitter':
      return <IconTwitter />;
    case 'Xing':
      return <IconXing />;
    case 'C':
      return <IconC />;
    case 'CMake':
      return <IconCMake /> ;
    case 'Cpp':
      return <IconCpp />;
    case 'ChromaDB':
      return <IconChroma />;
    case 'Docker':
      return <IconDocker />;
    case 'Git':
      return <IconGit />;
    case 'Langchain':
      return <IconLangchain />;
    case 'Matlab':
      return <IconMatlab />;
    case 'Python':
      return <IconPython />;
    case 'Rhapsody':
      return <IconRhapsody />;
    case 'Svn':
      return <IconSvn />;
    default:
      return <IconExternal />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
