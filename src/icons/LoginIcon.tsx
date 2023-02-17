const LoginIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="white"
    className="shrink-0"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_12_257)">
      <path d="M20 0C22.1217 0 24.1566 0.842854 25.6569 2.34315C27.1571 3.84344 28 5.87827 28 8C28 10.1217 27.1571 12.1566 25.6569 13.6569C24.1566 15.1571 22.1217 16 20 16C17.8783 16 15.8434 15.1571 14.3431 13.6569C12.8429 12.1566 12 10.1217 12 8C12 5.87827 12.8429 3.84344 14.3431 2.34315C15.8434 0.842854 17.8783 0 20 0ZM20 20C28.84 20 36 23.58 36 28V32H4V28C4 23.58 11.16 20 20 20Z" />
    </g>
    <defs>
      <filter
        id="filter0_d_12_257"
        x="0"
        y="0"
        width="40"
        height="40"
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
          result="effect1_dropShadow_12_257"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_12_257"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default LoginIcon;
