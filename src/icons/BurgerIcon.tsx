const BurgerIcon = () => (
  <svg
    width="40"
    height="30"
    viewBox="0 0 40 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_63_3220)">
      <path
        d="M4 0.5H36V4.05556H4V0.5ZM4 9.38889H36V12.9444H4V9.38889ZM4 18.2778H36V21.8333H4V18.2778Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_63_3220"
        x="0"
        y="0.5"
        width="40"
        height="29.3335"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_63_3220"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_63_3220"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default BurgerIcon;
