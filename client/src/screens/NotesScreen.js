import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, FlatList } from "react-native";

import NoteButton from "../components/NoteButton";
import SingleNote from "../components/SingleNote";

import { NotesContext } from "../context/NotesContext";

const NotesScreen = ({ navigation }) => {
  const { getNotes, noteState } = React.useContext(NotesContext);
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
        title: "",
        content: "",
        active
      });
    }

    return () => setActive(false);
  }, [active]);

  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView style={styles.notesView}>
        <FlatList
          data={noteState.notes}
          renderItem={({ item }) => (
            <SingleNote
              setActive={setActive}
              active={active}
              item={item}
              navigation={navigation}
            />
          )}
          keyExtractor={item => item._id}
        />
      </ScrollView>
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
