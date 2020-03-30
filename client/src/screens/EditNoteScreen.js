import React from "react";
import { View } from "react-native";

import { TextInput } from "react-native-gesture-handler";

import NoteButton from "../components/NoteButton";

const EditNoteScreen = ({ route }) => {
  const [state, setState] = React.useState({
    title: "",
    content: ""
  });

  const { title, content, active } = route.params;

  React.useEffect(() => {
    if (title.length > 0 && content.length > 0) {
      setState({
        title,
        content
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
          <NoteButton str="#" fn={() => editNote()} />
        ) : (
          <NoteButton str="-" fn={() => saveNote()} />
        )}
      </>
    </>
  );
};

export default EditNoteScreen;
