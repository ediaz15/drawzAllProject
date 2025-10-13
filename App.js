// import React, Component, useState module as Component from base React
import 'react-native-gesture-handler';

import React, { Component, useState } from 'react';
// import Text as Text from React Native
import { Text, View, Platform, StyleSheet, Button} from 'react-native';
// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();


// Default Stylesheet (just to separate the defaults from special cases)
const defaultStyles = StyleSheet.create({
  homepage: {
    ...Platform.select({
      ios: {
        backgroundColor: "#daf2feff",
        fontFamily: "Times New Roman",
      },
      android: {
        backgroundColor: "#eefff3ff",
        fontFamily: "Baskerville",
      },
    }),
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontWeight: "bold",
    justifyContent: "flex-start",
    margin: 35,
  },
  pageHeader: {
    height: 100,
    fontSize: 24,
    color: "#00aaff",
    backgroundColor: "#282c2e",
  },
  subHeader: {
    height: 50,
    width: 50,
    fontSize: 18,
    color: "#3090c0ff",
    backgroundColor: "#282c2e",
  },
  text: {
    fontSize: 12,
    color: "#282c2e",
  },
});

// Default Heading
const Header = (props) => {
  return (
    <Text style = {defaultStyles.header}>
      {props.children}
    </Text>
  );
}

// Default Heading for each page
const PageHeader = (props) => {
  return (
    <Header>
      <Text style = {defaultStyles.pageHeader}>
        {props.children}
      </Text>
    </Header>
  );
}

// Default SubHeading
const SubHeader = (props) => {
  return (
    <Header>
      <Text style = {defaultStyles.subHeader}>
        {props.children}
      </Text>
    </Header>
  );
}

const NavToSketch = (props) => {
  return (
    <Button
      color = {props.color}
      title = {props.title}
      onPress = {props.onPress}
    />
  );
}

// Default Text component
const DefaultText = (props) => {
  return (
    <Text style = {defaultStyles.text}>
      {props.content}
    </Text>
  );
}

const HomePage = ({ navigation }) => { // added navigation function parameter

  const direct = () => navigation.navigate("Sketch Pad"); // fixed typo, removed props. and set to const

  return (
    <View style = {defaultStyles.homepage}>
      <PageHeader>
        Home
      </PageHeader>
      <SubHeader>
        Thanks for choosing DrawzAll!
      </SubHeader>
      <DefaultText content = 
        "yea"/>
      <NavToSketch
        color = "#282c2e"
        title = "Click for a Blank Sketchpad!"
        onPress = {direct}
        />
    </View>
  );
}

const BlankSketchPad = () => {
  const [activeTool, setActiveTool] = useState ("pen"); // useState hook

  const handleSelectTool = (tool) => {
    setActiveTool(tool);
  };

  return (
    <View style = {[defaultStyles.homepage, { justifyContent: "center"}]}>
      <DefaultText content = "Start a drawing here!"/>

        {/* Bottom Toolbar below*/}
        <ToolBar onSelectTool={handleSelectTool} />
    </View>
  );
};


// App - define initial app component
const DrawzAll = () => {
  // fixed a naming mismatch
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomePage}/>
        <Drawer.Screen name="Sketch Pad" component={BlankSketchPad}/>
      </Drawer.Navigator>
    </NavigationContainer>

  );
}

// Buttons for toolbar
const ToolBar = ({ onSelectTool }) => {
  return (
    <View style={toolStyles.container}>
      <Button title="Pen" color="blue" onPress={() => onSelectTool("pen")} />
      <Button title="Eraser" color="red" onPress={() => onSelectTool("eraser")} />
      <Button title="Shape" color="green" onPress={() => onSelectTool("shape")} />
      <Button title="Color" color="orange" onPress={() => onSelectTool("color")} />
    </View>
  );
};
// Basic Styling for Toolbar
const toolStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

// export default reference - BasicApp
export default DrawzAll;