// import React, Component, useState module as Component from base React
import 'react-native-gesture-handler';

import React, { Component, useState } from 'react';
// import Text as Text from React Native
import { Text, View, Platform, StyleSheet, Button, TouchableHighlight, ActivityIndicator} from 'react-native';
// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ColorPicker from 'react-native-wheel-color-picker';

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
      <DefaultText content = {`Active Tool: ${activeTool}`}/>
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

  // for shape select
  const [showShapeOptions, setShowShapeOptions] = useState(false);
  // for color picker
  const [currentColor, setCurrentColor] = useState("#000000");  // default to black
  const [showColorPicker, setShowColorPicker] = useState(false);

  
  // catch for pressing other tools before shape option selected
  const handleToolPress = (tool) => {
    onSelectTool(tool);
    if (tool === "color") setShowColorPicker(true);
    else setShowColorPicker(false);
  }

  // self explanatory
  const onColorChange = (color) => {
    setCurrentColor(color);
  }

  // hides picker after selection
  const onColorChangeComplete = (color) => {
    setCurrentColor(color);
    setShowColorPicker(false);
  };
  // dropdown menu for shapes 
  const handleShapePress = () => {
    setShowShapeOptions(!showShapeOptions);
    onSelectTool("shape");
  }

  // after selecting shape, hide options
  const handleShapeSelect = (shape) => {
    onSelectTool(`${shape}`); 
    setShowShapeOptions(false); 
  }

  return (
    <View style={toolStyles.container}>
      

      <Button title="Pen" color="blue" onPress={() => handleToolPress("pen")} />
      <Button title="Eraser" color="red" onPress={() => handleToolPress("eraser")} />
        {/* Shape options dropdown 
        * Unicode characters used for shapes
        * TouchableHighlight allows for feedback on press, shows dropdown
        * After selecting shape or pressing another tool, dropdown disappears
        */}
      <View style={toolStyles.shapeContainer}>
        <Button title="Shape" color="green" onPress={handleShapePress} />
        {showShapeOptions && (
            <View style={toolStyles.shapeDropdown}>
              {['\u25cb', '\u25a1', '\u25cf', '\u25a0'].map((shape) => (
                <TouchableHighlight
                  key={shape}
                  onPress={ () => handleShapeSelect(shape)}
                  underlayColor={"#a0a0a0ff"}
                  style={toolStyles.shapeOption}
                >
                <Text style={toolStyles.shapeText}>{shape}</Text>
              </TouchableHighlight>
              ))}
            </View>
        )}
      </View>
      {/* 
        * Color picker component and styling
        * I do NOT how these color options work, these are just biolerplate options
        */}
      <Button title="Color" color="orange" onPress={() => handleToolPress("color")} />
      {showColorPicker && (
        <View style={toolStyles.colorPicker}>
          <ColorPicker
            color={currentColor}
            onColorChange={onColorChange}
            onColorChangeComplete={onColorChange}
            thumbSize={30}
            sliderSize={30}
            noSnap={true}
            row={false}
          />
          {/* Buttons to hide the color picker*/}
          <View style={toolStyles.colorConfirms}>
            <Button title="Done" color="green" onPress={() => setShowColorPicker(false)} />
            <Button title="Cancel" color="red" onPress={() => setShowColorPicker(false)} />
          </View>
        </View>
      )}
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
    backgroundColor: "#dfdfdfff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  shapeContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shapeDropdown: {
    position: 'absolute',
    bottom: 45,
    flexDirection: 'row', // listing items horizontally
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: 270,
    paddingVertical: 4,
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10, 
  },
  shapeOption: {
    marginHorizontal: 20,
  },
  shapeText: {
    fontSize: 30,
    color: '#282c2e',
    textAlign: 'center',
  },
  colorPicker: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    zIndex: 100,
    elevation: 10,
  },
  colorConfirms: {
    flexDirection: "row", 
    justifyContent: "space-around", 
    marginTop: 10 
  },
});

// export default reference - BasicApp
export default DrawzAll;