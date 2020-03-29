export default (prevState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token
      };
    case "SIGN_UP":
      return {
        ...prevState,
        isSignout: false,
        message: "Account Created, Please Sign in"
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null
      };
    case "CLEAR_NOTIFICATION":
      return {
        ...prevState,
        isSignout: false,
        message: ""
      };
  }
};
