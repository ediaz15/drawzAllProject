// General Imports
import 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import React, { Component, useState, useRef, useEffect } from 'react';
import { Text, View, Button, TouchableHighlight,
  ActivityIndicator, ImageBackground, Image, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Drawing Imports
import ColorPicker from 'react-native-wheel-color-picker';
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Canvas, Path, Skia } from "@shopify/react-native-skia";
// Style imports
import { defaultStyles, toolStyles, galleryStyles, savedDrawingsStyles, homeStyles } from './Styles';

// Navigation setup
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

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

const HomePage = ({ navigation }) => { // added navigation function parameter

  const direct = () => navigation.navigate("Sketch Pad"); // fixed typo, removed props. and set to const
  const galleryDirect = () => navigation.navigate("Gallery");

  return (
    <View style = {homeStyles.homepage}>
      <View style = {homeStyles.topPage}>
        <PageHeader>
          Home
        </PageHeader>
        <SubHeader>
          Thanks for choosing DrawzAll!
        </SubHeader>
      </View>
      <View style = {homeStyles.midPage}>
        <Text style = {defaultStyles.lightText}>
          "Tap one of the buttons below to get started!"
        </Text> 
        <Button
          color = "#282c2e"
          title = "Click for a Blank Sketchpad!"
          onPress = {direct}
        />
        <Button
          color = "#282c2e"
          title = "Go to Gallery Page"
          onPress = {galleryDirect}
        />
      </View>
      <View style = {homeStyles.bottomPage}>
        <Text style = {defaultStyles.lightText}>
          Created by the DrawzAll Team
        </Text>
      </View>
    </View>
  );
}

/*
  Gallery Page, restructured the idea of the Profile. 3 collections, which currently
  have 13 placeholder pieces in each that can be opened or removed (should be able to scroll through
  bc of FlatList properties). Stored in asynchstorage.
  Uses a stack navigator to open saved drawings, thought it made more sense to disconnect
  Saved Drawings from main drawer nav, since functionality comes from Gallery anyways.

  TO DO:
  - replace placeholder pieces with saved drawings from Sketch Pad.
  - ensure drawings save properly in asynchstorage, and load properly in Saved Drawings / Gallery.
    - ensure drawings are sent to Gallery from Sketch Pad. Even if it just displays some metadata
      and opens to the full image w/ "Open In Editor".
*/
const Gallery = ({navigation}) => {
  const collections = ["Collection A", "Collection B", "Collection C"];
  const [activeCollection, setActiveCollection] = useState(0);

  const initialData = collections.map((collectionName, collectionIndex) => {
    const items = [];
    for (let i = 0; i < 13; i++) {
      items.push({id:`${collectionIndex}-${i}`, title:`Item ${i + 1}`});
    }
    return items;
  });

  const [collectionsData, setCollectionsData] = useState(initialData);

  var pieces = collectionsData[activeCollection];

  const STORAGE_KEY = '@DrawzAll:collections';

  useEffect(() => {
    const load = async () => {
      try {
        const key = await AsyncStorage.getItem(STORAGE_KEY);
        if (key) {
          const savedPieces = JSON.parse(key);
          setCollectionsData(savedPieces);
        }
      }
      catch (err) {
        console.warn('Failed to load collections from storage', err);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(collectionsData));
      }
      catch (err) {
        console.warn('Failed to save collections to storage', err);
      }
    };
    save();
  }, [collectionsData]);

  const openItem = (item) => {
    navigation.navigate("Saved Drawings", {item});
  };

  const removeItem = (pieceId) => {
    setCollectionsData((collItems) =>
      collItems.map((coll, changed) => {
        if (changed !== activeCollection) return coll;
        return coll.filter((piece) => piece.id !== pieceId);
      })
    );
  };

  const renderItem = ({item}) => (
    <View style={galleryStyles.itemContainer}>
      <Text style={galleryStyles.itemTitle}>{item.title}</Text>
      <View style={galleryStyles.itemButtonRow}>
        <TouchableOpacity
          style={galleryStyles.openButton}
          onPress={() => openItem(item)}>
          <Text style={{color:'#fff'}}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={galleryStyles.removeButton}
          onPress={() => removeItem(item.id)}>
          <Text style={{color:'#fff'}}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <View style={galleryStyles.topPage}>
        <View style={galleryStyles.collectionWrapper}>
          <View style={galleryStyles.collectionRow}>
            <TouchableOpacity
              onPress={() => setActiveCollection(0)}
              style={[
                galleryStyles.collectionButton,
                activeCollection === 0 && galleryStyles.collectionButtonActive,
              ]}>
              <Text style={[
                galleryStyles.collectionButtonText,
                activeCollection === 0 && galleryStyles.collectionButtonTextActive,
              ]}>
                Collection One
              </Text>
              </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveCollection(1)}
              style={[
                galleryStyles.collectionButton,
                activeCollection === 1 && galleryStyles.collectionButtonActive,
              ]}>
              <Text style={[
                galleryStyles.collectionButtonText,
                activeCollection === 1 && galleryStyles.collectionButtonTextActive,
              ]}>
                Collection Two
              </Text>
              </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveCollection(2)}
              style={[
                galleryStyles.collectionButton,
                activeCollection === 2 && galleryStyles.collectionButtonActive,
              ]}>
              <Text style={[
                galleryStyles.collectionButtonText,
                activeCollection === 2 && galleryStyles.collectionButtonTextActive,
              ]}>
                Collection Three
              </Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={galleryStyles.bottomPage}>
        <FlatList
          data={pieces}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={galleryStyles.listContent}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={galleryStyles.emptyText}>
              No pieces in this collection.
            </Text>}
        />
      </View>
    </View>
  );
};

const SavedDrawings = ({navigation, route}) => {
  
  const item = route?.params?.item;

  const openInEditor = () => {
    navigation.navigate('Sketch Pad', {itemId: item.id});
  };

  return (
    <View style={savedDrawingsStyles.savedDrawings}>
      <View style={savedDrawingsStyles.topRow}>
        <View style={savedDrawingsStyles.topPageL}>
          <Button
            color="#2d2d2dff"
            title="Open in Editor"
            onPress={openInEditor}
          />
        </View>
        <View style={savedDrawingsStyles.topPageR}>
          <Button
            color="#2d2d2dff"
            title="Back to Gallery"
            onPress={() => {
              navigation.navigate("GalleryHome");
            }}
          />
        </View>
      </View>
      <View style={savedDrawingsStyles.bottomPage}>
        {item ? (
          <View style={savedDrawingsStyles.previewContainer}>
            <View style={savedDrawingsStyles.previewBox}>
              <Text style={defaultStyles.darkText}>
                {`Preview: Item ${item.id}`}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={defaultStyles.lightText}>
            No saved drawing selected. Open one from the Gallery.
          </Text>
        )}
      </View>
    </View>
  );
};

/*
  V Redundant with FreehandDrawing component V


const BlankSketchPad = () => {
  const [activeTool, setActiveTool] = useState ("pen"); // useState hook
  
  const handleSelectTool = (tool) => {
    setActiveTool(tool);
  };

  return (
    <View style = {[defaultStyles.sketchPad]}>
      <Text style = {defaultStyles.darkText}>
        Start a drawing here!
      </Text>
      <Text style = {defaultStyles.darkText}>
        {`Active Tool: ${activeTool}`}
      </Text>
        {}
        <ToolBar onSelectTool={handleSelectTool} activeTool={activeTool} />
    </View>
  );
};
*/

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
        <Drawer.Screen name = "Gallery" component = {GalleryStack} options = 
        {{title: "Gallery",
          headerStyle: {
            backgroundColor: '#232527ff',
          },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
            fontWeight: '300',
          },
        }}/>
        <Drawer.Screen name = "Sketch Pad" component = {FreehandDrawing} options = 
        {{  headerStyle: {
            backgroundColor: '#232527ff',
          },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
            fontWeight: '300',
          },
        }}/>
        {/* Saved Drawings is now part of the Gallery native stack */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// Stack navigator that wraps Gallery and Saved Drawings only
const GalleryStack = () => {
  return (
    <Stack.Navigator initialRouteName="GalleryHome">
      <Stack.Screen name = "GalleryHome" component = {Gallery} options = 
        {{title: 'Gallery', headerStyle: {
            backgroundColor: '#232527ff',
          },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
            fontWeight: '300',
          },
        }}/>
      <Stack.Screen name = "Saved Drawings" component = {SavedDrawings} options = 
        {{headerStyle: {
            backgroundColor: '#232527ff',
          },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
            fontWeight: '300',
          },
        }}/>
    </Stack.Navigator>
  );
}

/*

    Redundant w/ FreehandDrawing component

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

*/



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

  
  // catch for pressing other tools before shape option selected
  const handleToolPress = (tool) => {
    if (tool === "color") {
      setPreviousTool(currentTool);
      setShowColorPicker(true);
    } else { 
      setShowColorPicker(false);
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
          {/* Buttons to hide the color picker
            TODO: Make cancel button return color to color before opening wheel */}
          <View style={toolStyles.colorConfirms}>
            <Button title="Done" color="green" onPress={() => {
                setShowColorPicker(false);
                onSelectTool(previousTool);
            }}  
            />
            <Button title="Cancel" color="red" onPress={() => {
              setShowColorPicker(false);
              onSelectTool(previousTool);
              setCurrentColor(currentColor); // optional: revert to last confirmed color
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

const FreehandDrawing = ({}) => {
  //To track the actual gestures, we need to store the path that is made from the touch gestures
    //to store the path, we use an array that we continously append to that stores
  const [paths, setPaths] = useState([]);
  const currentPathRef = useRef(null);
  //pan gesture is when we drag something across the screen, imagine a pixel we drag and we store its coordinates
  
  // stuff from old toolbelt
  const [selectedTool, setSelectedTool] = useState("pen");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedShape, setSelectedShape] = useState(null);

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
    };

    setPaths((prev) => [...prev, currentPathRef.current]);
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

  return (
    //GestureDetector wraps around the canvas component [treated like a view] to capture any panGesture related events, its like when u drag an item on a screen
    //WE CAN EDIT THE STOKE RELATED THINGS ALONGSIDE THE COLOR!!!
    <>
      <GestureDetector gesture={pan}>
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
                  strokeWidth={3} // temp
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
                  strokeWidth={10} // temp
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
      <ToolBar onSelectTool={onSelectTool} onSelectColor={onSelectColor} currentTool={selectedTool}/>
    </>
  );
};

//Props to use when drawing..
/*
strokeWidth,
color

*/

// export default reference - BasicApp
export default DrawzAll;