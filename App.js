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
import { Pressable } from 'react-native';
// Drawing Imports
import ColorPicker from 'react-native-wheel-color-picker';
import Slider from "@react-native-community/slider";
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

// More stylish button component
const NicerButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={props.style}
      accessibilityLabel={props.accessibilityLabel}
      activeOpacity={props.activeOpacity}
    >
      <Text style={[props.textStyle]}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const HomePage = ({ navigation }) => { // added navigation function parameter

  const navTo = (props) => navigation.navigate(props.location);

  return (
    <View style = {homeStyles.homepage}>
      <View style = {homeStyles.topPage}>
        <PageHeader>
          Home
        </PageHeader>
        <SubHeader>
          {`\nThanks for choosing DrawzAll!`}
        </SubHeader>
      </View>
      <View style = {homeStyles.topMidPage}>
      </View>
      <View style = {homeStyles.midPageWrapper}>
        <ImageBackground source={require('./images/homepageL.jpg')} style = {homeStyles.midPageL}>
          <NicerButton
            style={[homeStyles.homeButton, {backgroundColor: "#6eeeffff"}]}
            textStyle={[homeStyles.homeButtonText, {color: "#060606ff"}]}
            onPress={() => navTo({location: "Sketch Pad"})}
            accessibilityLabel="Click for a Blank Sketchpad!"
            activeOpacity={0.5}
          >
            {`Click for a\n\nBlank\n\nSketchpad!`}
          </NicerButton>
        </ImageBackground>
        <ImageBackground source={require('./images/homepageR.jpg')} style = {homeStyles.midPageR}>
          <NicerButton
            style={[homeStyles.homeButton, {backgroundColor: "#ff3700ff"}]}
            textStyle={[homeStyles.homeButtonText, {color: "#060606ff"}]}
            onPress = {() => navTo({location: "Gallery"})}
            accessibilityLabel = "Go To Your Gallery"
            activeOpacity = {0.5}
          >
            {`Go To\n\nYour\n\nGallery`}
          </NicerButton>
        </ImageBackground>
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

  const navTo = (props) => {
    navigation.navigate(props.location);
  }

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
        <NicerButton
          style={galleryStyles.openButton}
          onPress={() => openItem(item)}
          accessibilityLabel={`Open ${item.title}`}
        >
          Open
        </NicerButton>
        <NicerButton
          style={galleryStyles.removeButton}
          onPress={() => removeItem(item.id)}
          accessibilityLabel={`Remove ${item.title}`}
        >
          Remove
        </NicerButton>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <View style={galleryStyles.topPage}>
        <View style={galleryStyles.collectionWrapper}>
          <View style={galleryStyles.collectionRow}>
            <NicerButton
              onPress={() => setActiveCollection(0)}
              style={[
                galleryStyles.collectionButton,
                activeCollection === 0 && galleryStyles.collectionButtonActive,
              ]}
            >
              <Text style={galleryStyles.collectionButtonText}>Collection One</Text>
            </NicerButton>
            <NicerButton
              onPress={() => setActiveCollection(1)}
              style={[
                galleryStyles.collectionButton,
                activeCollection === 1 && galleryStyles.collectionButtonActive,
              ]}
            >
              <Text style={galleryStyles.collectionButtonText}>Collection Two</Text>
            </NicerButton>
            <NicerButton
              onPress={() => setActiveCollection(2)}
              style={[
                galleryStyles.collectionButton,
                activeCollection === 2 && galleryStyles.collectionButtonActive,
              ]}
            >
              <Text style={galleryStyles.collectionButtonText}>Collection Three</Text>
            </NicerButton>
          </View>
        </View>
      </View>
      <ImageBackground
          source={[
            require('./images/galleryBackground1.jpg'),
            require('./images/galleryBackground2.jpg'),
            require('./images/galleryBackground3.jpg'),
          ][activeCollection]}
          style={galleryStyles.bottomPage}
      >
        <FlatList
          data={pieces}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={galleryStyles.listContent}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={galleryStyles.emptyContainer}>
              <Text style={galleryStyles.emptyText}>
                {`\nNothing here yet. Start creating some drawings!\n\n\n`}
              <NicerButton
                style={[galleryStyles.emptyButton, {backgroundColor: "#d1d1d1ff"}]}
                textStyle={[galleryStyles.emptyText]}
                onPress={() => navTo({location: "Sketch Pad"})}
                accessibilityLabel="Click for a Blank Sketchpad!"
                activeOpacity={0.8}
              >
                {`Ready to Create?\n\nGo to Sketch Pad!`}
              </NicerButton>
                {`\n\n`}
              </Text>
            </View>}
        />
      </ImageBackground>
    </View>
  );
};

const SavedDrawings = ({navigation, route}) => {
  
  const item = route?.params?.item;

  const navTo = (props) => {
    navigation.navigate(props.location, {itemId: item.id});
  };

  return (
    <View style={savedDrawingsStyles.savedDrawings}>
      <View style={savedDrawingsStyles.topRow}>
        <View style={savedDrawingsStyles.topPageL}>
          <Button
            color="#2d2d2dff"
            title="Open in Editor"
            onPress={() => navTo({location: "Sketch Pad"})}
          />
        </View>
        <View style={savedDrawingsStyles.topPageR}>
          <Button
            color="#2d2d2dff"
            title="Back to Gallery"
            onPress={() => navTo({location: "GalleryHome"})}
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
        {/* Changed to touchableOpacity for symbols*/}
        <Drawer.Screen name = "Sketch Pad" component = {BlankSketchPad} options = 
          {({ navigation, route }) => ({
            title: "Blank Sketch",
            headerStyle: {backgroundColor: "#232527ff"},
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {fontWeight: "300"},
            headerRight: () => ( 
              <View style={{ flexDirection: "row", gap: 15, marginRight: 10}}> 
                <TouchableOpacity onPress={() => route.params?.undo?.()}>
                  <Text style={{ fontSize: 36, color: "#FFFFFF" }}>↺</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => route.params?.redo?.()}>
                  <Text style={{ fontSize: 36, color: "#FFFFFF" }}>↻</Text>
                </TouchableOpacity>
              </View>
            )
          })}/>
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
        {{
            title: "",
            headerStyle: {
            backgroundColor: '#232527ff',
          },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
            fontWeight: '300',
          },
        }}/>
      <Stack.Screen name = "Saved Drawings" component = {SavedDrawings} options = 
        {{
            title: "Saved Drawing",
            headerStyle: {
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

const ToolBar = ({ onSelectTool, onSelectColor, currentTool,
  onSelectBrushSize, onSelectEraserSize, brushSize: parentBrushSize, 
  eraserSize: parentEraserSize }) => { // added fields for size sliders

  // for shape select
  const [showShapeOptions, setShowShapeOptions] = useState(false);
  // for color picker
  const [currentColor, setCurrentColor] = useState("#000000");  // default to black
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [previousTool, setPreviousTool] = useState("pen"); // to track after color 

  // sizes and visibility for sliders
  const [brushSize, setBrushSize] = useState(parentBrushSize || 3); // for size slider
  const [eraserSize, setEraserSize] = useState(parentEraserSize || 10);
  const [showBrushSizeSlider, setShowBrushSizeSlider] = useState(false);
  const [showEraserSizeSlider, setShowEraserSizeSlider] = useState(false);

  const minSize = 1;
  const maxSize = 50;

  // timer-based double-tap detection
  // logic moved because it didnt stay open when embedded in GestureDetector
  const brushTapTimeRef = useRef(null);
  const eraserTapTimeRef = useRef(null);

  const handleBrushTap = () => {
    const now = Date.now(); // use date to track time between taps
    if (brushTapTimeRef.current && now - brushTapTimeRef.current < 300) { // checks 0.3ms interval double tap
      // Double-tap detected
      setShowBrushSizeSlider(s => !s);
      brushTapTimeRef.current = null; // reset 
    } else {
      // Single-tap: select tool
      brushTapTimeRef.current = now;
      handleToolPress("pen");
    }
  };

  const handleEraserTap = () => {
    const now = Date.now();
    if (eraserTapTimeRef.current && now - eraserTapTimeRef.current < 300) {
      // Double-tap detected
      setShowEraserSizeSlider(s => !s);
      eraserTapTimeRef.current = null; // reset
    } else {
      // Single-tap: select tool
      eraserTapTimeRef.current = now;
      handleToolPress("eraser");
    }
  };
  
  // catch for pressing other tools before shape option selected
  const handleToolPress = (tool) => {
    if (tool === "color") {
      setPreviousTool(currentTool);
      setShowColorPicker(true);
    } else if (tool === "pen") {
      // single tap selects pen (double-tap handled separately by handleBrushTap)
      setShowEraserSizeSlider(false);
      setShowColorPicker(false);
      onSelectTool(tool);
    } else if (tool === "eraser") {
      // single tap selects eraser (double-tap handled separately by handleEraserTap)
      setShowBrushSizeSlider(false);
      setShowColorPicker(false);
      onSelectTool(tool);
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
      

      {/* Pen button: single tap selects tool, double-tap handled in handleBrushTap 
        * switched to touchableOpacity for using a symbol instead of a big ugly button
      */}
      <TouchableOpacity onPress={handleBrushTap}>
        <Text style={{ fontSize: 32, color: "#FFFFFF" }}>✐</Text>
      </TouchableOpacity>

      {/* Eraser button: single tap selects tool, double-tap handled in handleEraserTap */}
      <TouchableOpacity onPress={handleEraserTap}>
        <Text style={{ fontSize: 32, color: "#FFFFFF" }}>⌫</Text>
      </TouchableOpacity>
        
      {/* old code for double tap below
            {
        (() => {
          const toggleBrush = () => setShowBrushSizeSlider(s => !s);
          const penTapGesture = Gesture.Tap().numberOfTaps(2).onEnd(() => runOnJS(toggleBrush)());
          return (
            <GestureDetector gesture={penTapGesture}>
              <View>
                <Button title="Pen" color="blue" onPress={() => handleToolPress("pen")} />
              </View>
            </GestureDetector>
          );
        })()
      }

      {
        (() => {
          const toggleEraser = () => setShowEraserSizeSlider(s => !s);
          const eraserTapGesture = Gesture.Tap().numberOfTaps(2).onEnd(() => runOnJS(toggleEraser)());
          return (
            <GestureDetector gesture={eraserTapGesture}>
              <View>
                <Button title="Eraser" color="red" onPress={() => handleToolPress("eraser")} />
              </View>
            </GestureDetector>
          );
        })()
      }
      */}
        
        
        {/* Shape options dropdown 
        * Unicode characters used for shapes
        * TouchableHighlight allows for feedback on press, shows dropdown
        * After selecting shape or pressing another tool, dropdown disappears
        */}
      
      <View style={toolStyles.shapeContainer}>
        <TouchableOpacity onPress={handleShapePress}>
          <Text style={{ fontSize: 32, color: "#FFFFFF" }}>❏</Text>
        </TouchableOpacity>
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
      <TouchableOpacity onPress={() => handleToolPress('color')}>
        <Text style={{ fontSize: 32, color: "#FFFFFF" }}>🎨</Text>
      </TouchableOpacity>
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
      {/* brush size slider, uncommented from before */}
      {showBrushSizeSlider && ( 
        <View style={toolStyles.sliderDropdown}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Slider
              value={brushSize}
              minimumValue={minSize}
              maximumValue={maxSize}
              step={1}
              style={{ flex: 1, height: 40 }}
              onValueChange={(value) => {
                setBrushSize(value);
                if (onSelectBrushSize) onSelectBrushSize(value);
              }}
            />
            <Text style={toolStyles.sliderValueText}>{Math.round(brushSize)}px</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => setShowBrushSizeSlider(false)}>
              <Text style={{ fontSize: 28, color: "#282c2e" }}>✓</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showEraserSizeSlider && (
        <View style={toolStyles.sliderDropdown}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Slider
              value={eraserSize}
              minimumValue={minSize}
              maximumValue={maxSize}
              step={1}
              style={{ flex: 1, height: 40 }}
              onValueChange={(value) => {
                setEraserSize(value);
                if (onSelectEraserSize) onSelectEraserSize(value);
              }}
            />
            <Text style={toolStyles.sliderValueText}>{Math.round(eraserSize)}px</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => setShowEraserSizeSlider(false)}>
              <Text style={{ fontSize: 28, color: "#282c2e" }}>✓</Text>
            </TouchableOpacity>
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

const BlankSketchPad = ({ navigation }) => {
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
  const [previewShape, setPreviewShape] = useState(null); // for shape preview

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

  // shape preview code, goes until click/tap released
  const updateShapePreview = (x, y) => {
    const start = shapeStartRef.current;
    if (!start) return;
    const { x: startx, y: starty } = start;
    const endx = x, endy = y;

    const shapePath = Skia.Path.Make();

    const shape = selectedShape;
    const isFilled = shape === '\u25cf' || shape === '\u25a0';
    const isCircle = shape === '\u25cb' || shape === '\u25cf';

    if (isCircle) {
      const minX = Math.min(startx, endx);
      const maxX = Math.max(startx, endx);
      const minY = Math.min(starty, endy);
      const maxY = Math.max(starty, endy);
      shapePath.addOval({
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      });
    } else {
      shapePath.addRect({
        x: Math.min(startx, endx),
        y: Math.min(starty, endy),
        width: Math.abs(endx - startx),
        height: Math.abs(endy - starty),
      });
    }

    setPreviewShape({
      path: shapePath,
      color: selectedColor,
      tool: isFilled ? "shape-fill" : "shape",
      strokeWidth: brushSize,
    });
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

    if (isCircle) { // code for properly drawing circles/ellipses
      // calculate bounding box with start and end as opposite corners
      const minX = Math.min(startx, endx);
      const maxX = Math.max(startx, endx);
      const minY = Math.min(starty, endy);
      const maxY = Math.max(starty, endy);

      shapePath.addOval({
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      });
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
        tool: isFilled ? "shape-fill" : "shape",
        strokeWidth: brushSize
      }
    ]);

    shapeStartRef.current = null;
    // clear preview when shape released
    setPreviewShape(null);
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
        if (selectedTool === "shape" && selectedShape) { 
          runOnJS(updateShapePreview)(e.x, e.y);
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
            // shapes filled
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
            // shapes outline, width = pen width
            if (item.tool === "shape") {
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
          })}
          {/* shape preview below */}
          {previewShape && (
            <Path
              key="preview"
              path={previewShape.path}
              color={previewShape.color}
              style={previewShape.tool === "shape-fill" ? "fill" : "stroke"}
              strokeWidth={previewShape.strokeWidth || brushSize}
              strokeJoin="round"
              strokeCap="round"
            />
          )}
        </Canvas>
      </GestureDetector>
      <ToolBar 
        onSelectTool={onSelectTool} 
        onSelectColor={onSelectColor} 
        currentTool={selectedTool}
        onSelectBrushSize={onSelectBrushSize}
        onSelectEraserSize={onSelectEraserSize}
        brushSize={brushSize}
        eraserSize={eraserSize}
      />
    </View>
  );
};

export default DrawzAll;