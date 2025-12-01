// import React, Component, useState module as Component from base React
import 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import React, { Component, useState, useRef, useEffect} from 'react';
// import Text as Text from React Native
import { Text, View, Platform, StyleSheet, Button, TouchableHighlight, ActivityIndicator} from 'react-native';
// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ColorPicker from 'react-native-wheel-color-picker';
import Slider from "@react-native-community/slider";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import { PermissionsAndroid } from 'react-native';
import { createMMKV } from 'react-native-mmkv';

const Drawer = createDrawerNavigator();
export const storage = createMMKV();
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

  /*Local storage permissions from week 11 notes -> lets us access storage*/
const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    {
      title: "Storage Permission",
      message: "App needs access to your storage to save drawings",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    }
  );
    if (granted === PermissionsAndroid.RESULTS.GRANTED){
      console.log("You can use the storage");
    } else {
      console.log("Storage permission denied");
    }
  } catch (err){
      console.warn(err);
  }
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
        <Button
          title="Request Storage Permission"
          color="#007AFF"
          onPress={requestStoragePermission}
        />
      </View>
      <View style = {defaultStyles.bottomPage}>
        <Text style = {defaultStyles.lightText}>
          Profile page under construction.
        </Text>
      </View>
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
          {({ navigation, route }) => ({
            title: "Blank Sketch",
            headerStyle: {backgroundColor: "#232527ff"},
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {fontWeight: "300"},
            headerRight: () => (
              <View style={{ flexDirection: "row", gap: 10, marginRight: 10}}>
                <Button title="Undo" onPress={() => route.params?.undo?.()} color="#ffcc00" />
                <Button title="Redo" onPress={() => route.params?.redo?.()} color="#66ccff" />
              </View>
            )
          })}/>
        <Drawer.Screen name = "Saved Drawings" component = {SavedDrawings} options = 
        {{  headerStyle: {
            backgroundColor: '#232527ff',
          },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
            fontWeight: '300',
          },
        }}/>
        
        
      </Drawer.Navigator>
    </NavigationContainer>

  );
}

/* 
 * TODO for ToolBar:
  * - Pen: add size slider and save the size, create a fade effect outside of the radius,
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


const ToolBar = ({ onSelectTool, onSelectColor, currentTool }) => {

  // for shape select
  const [showShapeOptions, setShowShapeOptions] = useState(false);
  // for color picker
  const [currentColor, setCurrentColor] = useState("#000000");  // default to black
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [previousTool, setPreviousTool] = useState("pen"); // to track after color 
    /* 
  const [brushSize, setBrushSize] = useState(3);
  const [eraserSize, setEraserSize] = useState(10);
  const [showBrushSizeSlider, setShowBrushSizeSlider] = useState(false);
  const [showEraserSizeSlider, setShowEraserSizeSlider] = useState(false);

  const minSize = 1;
  const maxSize = 50;
    */
  
  // catch for pressing other tools before shape option selected
  const handleToolPress = (tool) => {
    if (tool === "color") {
      setPreviousTool(currentTool);
      setShowColorPicker(true);
      // setShowBrushSizeSlider(false);
      // setShowEraserSizeSlider(false);
    } else if (tool === "pen") {
      // setShowBrushSizeSlider(true);
      // setShowEraserSizeSlider(false);
      setShowColorPicker(false);
      onSelectTool(tool);
    } else if (tool === "eraser") {
      // setShowEraserSizeSlider(true);
      // setShowBrushSizeSlider(false);
      setShowColorPicker(false);
      onSelectTool(tool);
    } else { 
      setShowColorPicker(false);
      // setShowBrushSizeSlider(false);
      // setShowEraserSizeSlider(false);
      onSelectTool(tool);
    }
  }

  // self explanatory
  const onColorChange = (color) => {
    setCurrentColor(color);
    onSelectColor(color);
  }

  // hides picker after selection
  const onColorChangeComplete = (color) => {
    setCurrentColor(color);
    onSelectColor(color);
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
                <TouchableHighlight // Interactable view window
                  key={shape} // sets a unique identifier for each shape
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
        * Uses react-native-wheel-color-picker
        */}
      <Button title="Color" color="orange" onPress={() => handleToolPress("color")} />
      {/* 
      {showBrushSizeSlider && (
        <View style={toolStyles.sizeSliderContainer}>
          <Text style={{ color: "white", marginBottom: 8 }}>Brush Size: {Math.round(brushSize)}px</Text>
          <Slider
            value={brushSize}
            minimumValue={1}
            maximumValue={50}
            step={1}
            style={{ width: 200, height: 40 }}
            onValueChange={(value) => {
              setBrushSize(value);
              onSelectBrushSize(value);
            }}
          />
        </View>
      )}

      {showEraserSizeSlider && (
        <View style={toolStyles.sizeSliderContainer}>
          <Text style={{ color: "white", marginBottom: 8 }}>Eraser Size: {Math.round(eraserSize)}px</Text>
          <Slider
            value={eraserSize}
            minimumValue={1}
            maximumValue={50}
            step={1}
            style={{ width: 200, height: 40 }}
            onValueChange={(value) => {
              setEraserSize(value);
              onSelectEraserSize(value);
            }}
          />
        </View>
      )}
      */}
      {showColorPicker && (
        <View style={toolStyles.colorPicker}>
          <ColorPicker
            color={currentColor}
            onColorChange={onColorChange} // detects color change
            onColorChangeComplete={onColorChange} // originally here for auto menu hiding, but can probably remove
            thumbSize={30}
            sliderSize={30}
            noSnap={true}
            row={false}
          />
          {/* Buttons to hide the color picker */}
          <View style={toolStyles.colorConfirms}>
            <Button title="Done" color="green" onPress={() => {
                setShowColorPicker(false);
                onSelectTool(previousTool);
            }}
            />
            <Button title="Cancel" color="red" onPress={() => { 
              setShowColorPicker(false);
              onSelectTool(previousTool);
              setCurrentColor(currentColor);
            }}  
            />
          </View>
        </View>
      )}
    </View>
  );
};


//Repurposed from https://medium.com/react-native-rocket/building-a-hand-drawing-app-with-react-native-skia-and-gesture-handler-9797f5f7b9b4
//runOnJS import explained: https://docs.swmansion.com/react-native-reanimated/docs/3.x/threading/runOnJS/
//It was in TS originally but after gluing things, got it to be in JS

//Good explanation found here: 
//https://spin.atomicobject.com/react-native-skia/

/*
 Pan Gesture https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/pan-gesture/
*/

const BlankSketchPad = ({ navigation, route}) => {
  //To track the actual gestures, we need to store the path that is made from the touch gestures
    //to store the path, we use an array that we continously append to that stores
  const [paths, setPaths] = useState([]);
  const [redoStack, setRedoStack] = useState([]); // for undo/redo
  const currentPathRef = useRef(null);
  //pan gesture is when we drag something across the screen, imagine a pixel we drag and we store its coordinates
  
  // stuff from old toolbelt
  const [selectedTool, setSelectedTool] = useState("pen");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedShape, setSelectedShape] = useState(null);
  const [brushSize, setBrushSize] = useState(3);
  const [eraserSize, setEraserSize] = useState(10);

  const shapeStartRef = useRef(null); // shape coordinates

  //onStartPath refers to the first touch portion of the pan gesture, so its the moment your finger touches the screen
  //We make a path and we track is x,y position
  //basically user starts to touch the screen -> when that happens, we make a new path
  const startPath = (x, y) => {
    const fingerPath = Skia.Path.Make();
    fingerPath.moveTo(x, y);

    currentPathRef.current = { // edited for tools
      path: fingerPath,
      tool: selectedTool,
      color: selectedColor,
      strokeWidth: selectedTool === "pen" ? brushSize : eraserSize,
    };

    setPaths((prev) => [...prev, currentPathRef.current]);
    setRedoStack([]);
  };

  // minor conditional update to check beforehand
  const updatePath = (x, y) => {
    if (!currentPathRef.current) return;

    currentPathRef.current.path.lineTo(x, y);

    setPaths((prev) => [...prev]);
  }; 

  const endPath = () => {
    currentPathRef.current = null;
  };

  const undo = () => {
    setPaths(prev => {
      if (prev.length === 0) return prev; // can't undo without paths
      const last = prev[prev.length - 1]
      setRedoStack(r => [...r, last]);
      return prev.slice(0, -1);
    });
  };

  const redo = () => {
    setRedoStack(prev => {
      if (prev.length === 0) return prev; // redo empty
      const last = prev[prev.length - 1]
      setPaths(p => [...p, last]);
      return prev.slice(0, -1);
    });
  };

  useEffect(() => {
    navigation.setParams({ undo, redo });
  }, [paths, redoStack]);

  //to actually update our array of coordinates, we need to copy over the elements (coordinates) and continuosly extend the length
  // SINCE every path is basically a new line, we create a new path to track it
  //to actually render it, we need to store all the paths
  //as the user drags their finger, we need to add the xy points to the path

  // shape handlers below
  const startShape = (x, y) => {
    shapeStartRef.current = { x, y };
  };

  const endShape = (x, y) => {
    const start = shapeStartRef.current;
    if (!start) return;
    const { x: startx, y: starty } = start; // declare starting coords for shape
    const endx = x, endy = y;

    const shapePath = Skia.Path.Make();
    

    const shape = selectedShape;
    const isFilled = shape === '\u25cf' || shape === '\u25a0';
    const isCircle = shape === '\u25cb' || shape === '\u25cf';

    if (isCircle) {
      const radius = Math.sqrt((startx - endx) ** 2 + (starty - endy) ** 2);
      shapePath.addCircle(startx, starty, radius);
    } else {
      shapePath.addRect({
        x: Math.min(startx, endx),
        y: Math.min(starty, endy),
        width: Math.abs(endx - startx),
        height: Math.abs(endy - starty),
      });
    }

    setPaths(prev => [
      ...prev,
      {
        path: shapePath,
        color: selectedColor,
        tool: isFilled ? "shape-fill" : "shape"
      }
    ]);

    shapeStartRef.current = null;
    setRedoStack([]);
  };

  //to make the drag work,we call the onstart, onupdate, and onend functions with their inputs as the event coordinates
  const pan = Gesture.Pan()
    .onStart((e) => {
      if (selectedTool  === "pen" || selectedTool  === "eraser") {
        runOnJS(startPath)(e.x, e.y);
      } 
      if (selectedTool === "shape" && selectedShape) {
        runOnJS(startShape)(e.x, e.y);
      }
    })
    .onUpdate((e) => {
      if (selectedTool === "pen" || selectedTool === "eraser") { // only for these, dont update shapes right away
        runOnJS(updatePath)(e.x, e.y);
      }
    })
    .onEnd((e) => {
      if (selectedTool === "pen" || selectedTool === "eraser") { // added condition for shape
        runOnJS(endPath)();
      } 
      if (selectedTool === "shape" && selectedShape) {
        runOnJS(endShape)(e.x, e.y);
      }
    });

  const onSelectTool = (tool) => {
    if (["\u25cb","\u25a1","\u25cf","\u25a0"].includes(tool)) {
      setSelectedTool("shape");
      setSelectedShape(tool);
    } else {
      setSelectedTool(tool);
      setSelectedShape(null);
    }
  };

  const onSelectColor = (color) => setSelectedColor(color);
  const onSelectBrushSize = (size) => setBrushSize(size);
  const onSelectEraserSize = (size) => setEraserSize(size);

  return (
    //GestureDetector wraps around the canvas component [treated like a view] to capture any panGesture related events, its like when u drag an item on a screen
    //WE CAN EDIT THE STOKE RELATED THINGS ALONGSIDE THE COLOR!!!
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <GestureDetector gesture={pan} style={{ flex: 1 }}>
        <Canvas style={{ flex: 1, backgroundColor: "white" }}>
          {paths.map((item, index) => {
            // pen
            if (item.tool === "pen") {
              return (
                <Path
                  key={index}
                  path={item.path}
                  color={item.color}
                  style="stroke"
                  strokeWidth={item.strokeWidth || brushSize}
                  strokeJoin="round"
                  strokeCap="round"
                />
              );
            }
            // eraser
            if (item.tool === "eraser") {
              return (
                <Path
                  key={index}
                  path={item.path}
                  color="#FFFFFF"
                  style="stroke"
                  strokeWidth={item.strokeWidth || eraserSize}
                />
              );
            }
            // shapes
            if (item.tool === "shape-fill") {
              return (
                <Path
                  key={index}
                  path={item.path}
                  color={item.color}
                  style="fill"
                />
              );
            }
          })}
        </Canvas>
      </GestureDetector>
      <ToolBar 
        onSelectTool={onSelectTool} 
        onSelectColor={onSelectColor} 
        currentTool={selectedTool}
      />
    </View>
  );
};

//Props to use when drawing..
/*
strokeWidth,
color

*/


// Basic Styling for Toolbar
const toolStyles = StyleSheet.create({
  container: { // Toolbar at bottom, lists buttons horizontally, colors defined in ToolBar
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#232527ff",
    backgroundColor: "#282c2e",
  },
  shapeContainer: { // General styling for shape button and dropdown
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shapeDropdown: { // List items horizontally and above the shape button, shadows for visual appeal
    position: 'absolute',
    bottom: 45,
    flexDirection: 'row',
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
  shapeOption: { // margin between the shape options
    marginHorizontal: 20,
  },
  shapeText: { // shape size and color
    fontSize: 30,
    color: '#282c2e',
    textAlign: 'center',
  },
  colorPicker: { // Styling for color wheel
    position: 'absolute',
    bottom: 100,
    left: 0, // stretches across screen
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10, // rounds the corners
    borderTopRightRadius: 10,
    padding: 10,
    zIndex: 100, // makes it appear on the top
    elevation: 10,
  },
  colorConfirms: {
    flexDirection: "row", 
    justifyContent: "space-around", 
    marginTop: 10 
  },
  sliderOption: {
    marginTop: 12,
    alignItems: "center",
    flexDirection: "row",
    gap: 8
  },
  sizeSliderContainer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    backgroundColor: "#282c2e",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
    alignItems: "center",
    zIndex: 100,
    elevation: 10,
  }
});

// export default reference - BasicApp
export default DrawzAll;
