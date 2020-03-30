export default (prevState, action) => {
  switch (action.type) {
    case "GET_NOTES":
      return {
        ...prevState,
        notes: action.payload
      };
    case "CREATE_NOTE":
      return {
        ...prevState,
        notes: [action.payload, ...prevState.notes]
      };
    case "EDIT_NOTE":
      return {
        ...prevState,
        notes: prevState.notes.map(note => {
          return note._id == action.payload._id ? action.payload : note;
        })
      };
    case "DELETE_NOTE":
      return {
        ...prevState,
        notes: prevState.notes.filter(note => {
          return note._id !== action.payload;
        })
      };
    case "NOTES_ERROR":
      return {
        ...prevState,
        error: action.payload
      };
  }
};
