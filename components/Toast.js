const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <>
      <div
        className={`toast show position-fixed top-0 end-0 text-dark ${bgColor}`}
        role="alert"
        style={{ zIndex: 9 }}
        onClick={handleShow}
      >
        <div className={`toast-header ${bgColor} text-light`}>
          <strong className="me-auto text-light">{msg.title}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={handleShow}
          ></button>
        </div>
        <div className="toast-body text-light">{msg.msg}</div>
      </div>
    </>
  );
};

export default Toast;
