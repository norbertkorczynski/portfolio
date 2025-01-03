import React from "react";

const IconCMake = () => (
  <svg
    viewBox="0 0 48 48"
    height="100"
    width="100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <linearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1="24"
      x2="4"
      y1="4"
      y2="44"
    >
      <stop offset="0" stop-color="#197cf1" />
      <stop offset="1" stop-color="#20bcfa" />
    </linearGradient>
    <linearGradient
      id="b"
      gradientUnits="userSpaceOnUse"
      x1="44"
      x2="24"
      y1="44"
      y2="4"
    >
      <stop offset="0" stop-color="#c61423" />
      <stop offset="1" stop-color="#dc2b41" />
    </linearGradient>
    <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="44" x2="4">
      <stop offset="0" stop-color="#42a603" />
      <stop offset="1" stop-color="#78da06" />
    </linearGradient>
    <linearGradient
      id="d"
      gradientUnits="userSpaceOnUse"
      x1="400.57"
      x2="416.57"
      y1="522.8"
      y2="538.8"
    >
      <stop offset="0" stop-color="#292c2f" />
      <stop offset="1" stop-opacity="0" />
    </linearGradient>
    <g fill-rule="evenodd" transform="translate(-384.57 -499.8)">
      <path
        d="m24 4 2.938 33.3 17.06 6.703z"
        fill="url(#b)"
        transform="translate(384.57 499.8)"
      />
      <path
        d="m24 4-20 40 21.795-19.668z"
        fill="url(#a)"
        transform="translate(384.57 499.8)"
      />
      <path
        d="m16.13 33.05-12.13 10.943 39.996.004zm-12.1 10.877-.072.066h.039z"
        fill="url(#c)"
        transform="translate(384.57 499.8)"
      />
      <path d="m410.57 523.8-10 9 11 11h17v-4z" fill="url(#d)" opacity=".2" />
    </g>
  </svg>
);

export default IconCMake;
