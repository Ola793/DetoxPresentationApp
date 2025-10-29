/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import {Colors} from "react-native/Libraries/NewAppScreen";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const [name, setName] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={[
            styles.screenContainer,
            {backgroundColor: isDarkMode ? Colors.black : Colors.white},
          ]}
          testID="homeScreen">
          <Text
            style={[
              styles.title,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            Welcome
          </Text>
          <Text
            style={[
              styles.subtitle,
              {color: isDarkMode ? Colors.light : Colors.dark},
            ]}>
            Enter your name and submit
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={isDarkMode ? "#999" : "#666"}
            style={[
              styles.input,
              {
                borderColor: isDarkMode ? Colors.light : Colors.dark,
                color: isDarkMode ? Colors.white : Colors.black,
              },
            ]}
            testID="nameInput"
            accessibilityLabel="nameInput"
          />

          <TouchableOpacity
            onPress={() => {
              if (name.trim().length >= 3) {
                setMessage({type: "success", text: `Welcome, ${name.trim()}!`});
              } else {
                setMessage({
                  type: "error",
                  text: "Name must be at least 3 characters",
                });
              }
            }}
            style={styles.button}
            accessibilityRole="button"
            testID="submitButton">
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          {message && (
            <View
              style={[
                styles.message,
                message.type === "success"
                  ? styles.messageSuccess
                  : styles.messageError,
              ]}
              testID={
                message.type === "success" ? "successMessage" : "errorMessage"
              }
              accessibilityLabel={
                message.type === "success" ? "successMessage" : "errorMessage"
              }>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    minHeight: 600,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  message: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
  },
  messageSuccess: {
    backgroundColor: "#dcfce7",
  },
  messageError: {
    backgroundColor: "#fee2e2",
  },
  messageText: {
    fontSize: 16,
  },
});

export default App;
