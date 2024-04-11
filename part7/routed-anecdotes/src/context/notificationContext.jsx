import { createContext, useReducer } from "react";
const notifiicatiionReducer = (state, action) => {
  console.log({state})
  switch (action.type) {
    case "SETNOTIFICATION":
      return (state = action.payload);
    case "REMOVENOTIFICATION":
      return (state = "");
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NoticiationProviderContext = (prop) => {
  const [notification, notificationDispatch] = useReducer(
    notifiicatiionReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {prop.children}
    </NotificationContext.Provider>
  );
};


export default NotificationContext;
