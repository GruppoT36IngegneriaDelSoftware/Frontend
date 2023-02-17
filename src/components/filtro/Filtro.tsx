import CloseIcon from '@/icons/CloseIcon';

type IFiltroProps = {
  value: string;
  handleRemove: () => void;
};

const Filtro = (props: IFiltroProps) => {
  return (
    <div className="flex shrink-0 justify-between px-[6.5px] gap-[5px] rounded-2xl border-2 border-main-black bg-main-white text-main-black place-items-center">
      <h6 className="select-none">{props.value}</h6>

      <CloseIcon onClick={props.handleRemove} />
    </div>
  );
};

export { Filtro };
