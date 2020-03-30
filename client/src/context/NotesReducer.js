export default (prevState, action) => {
  switch (action.type) {
    case "GET_NOTES":
      return {
        ...prevState,
        notes: action.payload
      };
  }
};
