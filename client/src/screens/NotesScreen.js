import React from "react";
import { StyleSheet, SafeAreaView, View, FlatList } from "react-native";

import NoteButton from "../components/NoteButton";
import SingleNote from "../components/SingleNote";

import { NotesContext } from "../context/NotesContext";

const NotesScreen = ({ navigation }) => {
  const { getNotes, noteState, deleteNote } = React.useContext(NotesContext);
  const [active, setActive] = React.useState(false);

  const createNote = async () => {
    if (!active) {
      setActive(true);
    }
  };

  React.useEffect(() => {
    getNotes();
  }, []);

  React.useEffect(() => {
    if (active) {
      navigation.navigate("EditNote", {
        item: { title: "", content: "" },
        active
      });
    }

    return () => setActive(false);
  }, [active]);

  return (
    <SafeAreaView style={styles.mainView}>
      {/* <View onStartShouldSetResponderCapture={() => {
          setScroll(true);
        }}> */}
      <View style={styles.notesView}>
        <FlatList
          style={{ flex: 1 }}
          scrollEnabled={true}
          data={noteState.notes}
          renderItem={({ item }) => (
            <SingleNote
              setActive={setActive}
              active={active}
              item={item}
              navigation={navigation}
              delNote={deleteNote}
            />
          )}
          keyExtractor={(item, index) => item.title + index}
        />
      </View>
      {/* </View> */}
      <NoteButton str="+" fn={() => createNote()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  notesView: {
    flex: 1
  }
});

export default NotesScreen;
