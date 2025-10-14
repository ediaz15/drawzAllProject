// import React, Component, useState module as Component from base React
import 'react-native-gesture-handler';

import React, { Component, useState } from 'react';
// import Text as Text from React Native
import { Text, View, Platform, StyleSheet, Button, TouchableHighlight, ActivityIndicator} from 'react-native';
// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ColorPicker from 'react-native-wheel-color-picker';
import {Fill, Canvas, Rect, useCanvasSize} from "@shopify/react-native-skia";



const Drawer = createDrawerNavigator();


const tryingCanvas = () => {
  const {ref, size: {width, height}} = useCanvasSize();
  return (
    <Canvas style={{ flex: 1 }} ref={ref}>
      <Rect color="cyan" rect={{ x: 0, y: 0, width, height }} />
    </Canvas>
  );
};


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
  },
  sketchPad: {
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
    justifyContent: "flex-start",
  },
  profile: {
    ...Platform.select({
      ios: {
        backgroundColor: "#c1eaffff",
        fontFamily: "Times New Roman",
      },
      android: {
        backgroundColor: "#c2ffb1ff",
        fontFamily: "Baskerville",
      },
    }),
  },
  topPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#282c2e",
  },
  midPage: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        backgroundColor: "#caedffff",
        fontFamily: "Times New Roman",
      },
      android: {
        backgroundColor: "#d1ffdfff",
        fontFamily: "Baskerville",
      },
    }),
  },
  bottomPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#282c2e",
  },
  header: {
    fontWeight: "bold",
    justifyContent: "flex-start",
    margin: 25,
  },
  pageHeader: {
    height: 100,
    fontSize: 24,
    ...Platform.select({
      ios: {
        color: "#21b5ffff",
      },
      android: {
        color: "#41ff7aff",
      },
    }),
  },
  subHeader: {
    height: 50,
    width: 50,
    fontSize: 18,
    ...Platform.select({
      ios: {
        color: "#21b5ffff",
      },
      android: {
        color: "#41ff7aff",
      },
    }),
  },
  lightText: {
    fontSize: 12,
    ...Platform.select({
      ios: {
        color: "#caedffff",
      },
      android: {
        color: "#d1ffdfff",
      },
    }),
  },
  darkText: {
    fontSize: 12,
    color: "#000000ff",
  }
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

// Default Navigation button
const NavTo = (props) => {
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
    <Text style = {defaultStyles.darkText}>
      {props.content}
    </Text>
  );
}

const HomePage = ({ navigation }) => { // added navigation function parameter

  const direct = () => navigation.navigate("Sketch Pad"); // fixed typo, removed props. and set to const
  const profileDirect = () => navigation.navigate("Profile");

  return (
    <View style = {defaultStyles.homepage}>
      <View style = {defaultStyles.topPage}>
        <PageHeader>
          Home
        </PageHeader>
        <SubHeader>
          Thanks for choosing DrawzAll!
        </SubHeader>
      </View>
      <View style = {defaultStyles.midPage}>
        <Text style = {defaultStyles.lightText}>
          "Tap one of the buttons below to get started!"
        </Text> 
        <NavTo
          color = "#282c2e"
          title = "Click for a Blank Sketchpad!"
          onPress = {direct}
        />
      </View>
      <View style = {defaultStyles.bottomPage}>
        <NavTo
          color = "#282c2e"
          title = "Go to Profile Page"
          onPress = {profileDirect}
        />
        <Text style = {defaultStyles.lightText}>
          Created by the DrawzAll Team
        </Text>
      </View>
    </View>
  );
}

const Profile = ({navigation}) => {
  const toSaved = () => navigation.navigate("Saved Drawings");

  return (
    <View style = {defaultStyles.homepage}>
      <View style = {defaultStyles.topPage}>
        <PageHeader>
          username:
         </PageHeader>
         <PageHeader>
          <NavTo
            color = "#282c2e"
            title = "saved sketches:"
            onPress = {toSaved}
          />
         </PageHeader>
      </View>
      <View style = {defaultStyles.midPage}>
        <ActivityIndicator size="large" color="#000000ff" />
        <DefaultText content = "Fetching profile details..."/>
      </View>
      <View style = {defaultStyles.bottomPage}>
        <Text style = {defaultStyles.lightText}>
          Profile page under construction.
        </Text>
      </View>
    </View>
  );
};

const BlankSketchPad = () => {
  const [activeTool, setActiveTool] = useState ("pen"); // useState hook
  
  const handleSelectTool = (tool) => {
    setActiveTool(tool);
  };

  return (
    <View style = {[defaultStyles.sketchPad]}>
      <DefaultText content = "Start a drawing here!"/>
      <DefaultText content = {`Active Tool: ${activeTool}`}/>
        {/* Bottom Toolbar below*/}
        <ToolBar onSelectTool={handleSelectTool} />
    </View>
  );
};

const SavedDrawings = ({navigation}) => {
  const direct = () => navigation.navigate("Sketch Pad");

  return (
    <View style = {defaultStyles.homepage}>
      <View style = {defaultStyles.topPage}>
        <PageHeader>
          No saved drawings yet!
        </PageHeader>
      </View>
      <View style = {defaultStyles.midPage}>
      </View>
      <View style = {defaultStyles.bottomPage}>
        <NavTo
          color = "#282c2e"
          title = "Click for a Blank Sketchpad!"
          onPress = {direct}
        />
      </View>
    </View>
  );
};

// App - define initial app component
const DrawzAll = () => {
  // fixed a naming mismatch
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name = "Home" component = {HomePage} options = 
        {{title: "Welcome!",
          headerStyle: {
            backgroundColor: '#232527ff',
          },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
            fontWeight: '300',
          },
        }}/>
        <Drawer.Screen name = "Profile" component = {Profile} options = 
        {{title: "Profile",
          headerStyle: {
            backgroundColor: '#232527ff',
          },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
            fontWeight: '300',
          },
        }}/>
        <Drawer.Screen name = "Sketch Pad" component = {BlankSketchPad} options = 
        {{title: "Blank Sketch",
          headerStyle: {
            backgroundColor: '#232527ff',
          },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
            fontWeight: '300',
          },
        }}/>
        <Drawer.Screen name = "Saved Drawings" component = {SavedDrawings} options = 
        {{  headerStyle: {
            backgroundColor: '#232527ff',
          },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
            fontWeight: '300',
          },
        }}/>
        <Drawer.Screen name="Demo" component={tryingCanvas}>
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>

  );
}

/* 
 * TODO for ToolBar:
  * - Pen: save radius selected, create a fade effect outside of the radius,
  *        should consist for about the last 10% of the radius, fade from current color to transparent
  * - Eraser: same as pen, use pen radius, but set to transparent color and no fade
  * - Shape: drag shape from one corner to another
  *          for unfilled shapes, line thickness corresponds to pen radius, color is current color
  *          for filled shapes, color is current color, no need to impliment radius
  * - Color: Should be all done
  * 
  * - Save the state from the last stroke to use for redo/undo (probably can't code until we get skia working)
  * - Get skia working or another drawing library (dreading this with all our issues thus far)
  * 
 */


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
    borderColor: "#232527ff",
    backgroundColor: "#282c2e",
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