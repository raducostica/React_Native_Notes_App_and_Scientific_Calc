import React from "react";
import { View } from "react-native";

import { TextInput } from "react-native-gesture-handler";

import NoteButton from "../components/NoteButton";
import { NotesContext } from "../context/NotesContext";

const EditNoteScreen = ({ route, navigation }) => {
  const { addNote, editNote } = React.useContext(NotesContext);

  const [state, setState] = React.useState({
    title: "",
    content: ""
  });

  const { item, active } = route.params;

  const createNote = () => {
    addNote({ title: state.title, content: state.content });
    navigation.navigate("Notes");
  };

  const updateNote = () => {
    editNote({ title: state.title, content: state.content, _id: item._id });
    navigation.navigate("Notes");
  };

  React.useEffect(() => {
    console.log(item);
    if (item.title.length > 0 && item.content.length > 0) {
      setState({
        title: item.title,
        content: item.content
      });
    }
  }, []);

  const handleChange = (text, name) => {
    setState({
      ...state,
      [name]: text
    });
  };

  return (
    <>
      <View style={{ borderBottomWidth: 1, borderBottomColor: "#333" }}>
        <TextInput
          placeholder="title"
          style={{ fontSize: 18, paddingVertical: 20, paddingLeft: 20 }}
          value={state.title}
          name="title"
          onChangeText={text => handleChange(text, "title")}
        />
      </View>
      <TextInput
        placeholder="This is your content"
        name="title"
        multiline={true}
        numberOfLines={15}
        textAlignVertical="top"
        borderBottomColor="#333"
        borderBottomWidth={1}
        style={{ paddingVertical: 20, paddingLeft: 20, fontSize: 18 }}
        value={state.content}
        onChangeText={text => handleChange(text, "content")}
      />
      <>
        {!active ? (
          <NoteButton str="#" fn={() => updateNote()} />
        ) : (
          <NoteButton str="-" fn={() => createNote()} />
        )}
      </>
    </>
  );
};

export default EditNoteScreen;
