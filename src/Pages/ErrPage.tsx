const ErrPage = ({ errMsg }: string | any): JSX.Element => {
  return (
    <div className="error-page">
      Error 404, cannot find page! {errMsg ? errMsg : null}
    </div>
  );
};

export default ErrPage;
