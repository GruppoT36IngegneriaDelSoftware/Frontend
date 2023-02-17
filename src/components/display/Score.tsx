type IScoreProps = {
  xl?: boolean;
  value: number;
};

const Score = (props: IScoreProps) => {
  // const outerSize = props.xl ? 'w-40 h-40' : 'w-[90px] h-[90px]';
  // const innerSize = props.xl ? 'w-40 h-40' : 'w-[78.75px] h-[78.75px]';
  // const innerPosition = props.xl ? 'w-40 h-40' : 'w-[78.75px] h-[78.75px]';
  // const borderSize = props.xl ? '[20px]' : '[10px]';

  return <h2>{props.value}</h2>;
  /* return (
    <div className="flex items-center justify-center">
      <div
        className={`${outerSize} rounded-full border-${borderSize} box-border border-additional-grey relative`}
      >
        <div
          className={`${outerSize} absolute -left-${borderSize} -top-${borderSize} shadow-for-inner rounded-full`}
        />
      </div> */

  /* <div
        className={`${innerSize} rounded-full border-${borderSize} box-border border-additional-success drop-shadow-default`}
      /> */

  /* {props.value}
    </div>
  ); */
};

export { Score };
