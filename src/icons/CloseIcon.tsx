type ICloseIconProps = {
  onClick: () => void;
};

const CloseIcon = (props: ICloseIconProps) => (
  <svg
    width="7"
    height="6"
    viewBox="0 0 7 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={props.onClick}
  >
    <path
      d="M6.5 0.604286L5.89571 0L3.5 2.39571L1.10429 0L0.5 0.604286L2.89571 3L0.5 5.39571L1.10429 6L3.5 3.60429L5.89571 6L6.5 5.39571L4.10429 3L6.5 0.604286Z"
      fill="#B10B25"
    />
  </svg>
);
export default CloseIcon;
