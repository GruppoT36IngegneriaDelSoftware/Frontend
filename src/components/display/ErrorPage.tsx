type IErrorPageProps = {
  status?: number;
  message?: string;
};

const ErrorPage = (props: IErrorPageProps) => {
  return (
    <h1 className="h-full flex justify-center">
      {props.status && `Error ${props.status}: `}
      {typeof props?.message !== 'undefined'
        ? props.message
        : 'ricaricare la pagina'}
    </h1>
  );
};

export default ErrorPage;
