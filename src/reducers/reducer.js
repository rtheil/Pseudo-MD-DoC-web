import logger from "../services/logService";

const defaultState = {
  currentUser: {},
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "SET_USER":
      logger.log("SET_USER reducer called");
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
