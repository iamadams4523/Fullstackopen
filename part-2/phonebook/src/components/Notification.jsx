const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">Added {message}</div>;
};

export default Notification;
