import { StyleSheet, Platform } from "react-native";

// General Styles used across multiple pages
export const defaultStyles = StyleSheet.create({
	pageHeader: {
	height: 100,
	fontSize: 30,
	fontWeight: "bold",
	justifyContent: "center",
	alignItems: "center",
	margin: 25,
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
	fontWeight: "bold",
	justifyContent: "center",
	alignItems: "center",
	margin: 10,
	...Platform.select({
	  ios: {
		color: "#449cc7ff",
	  },
	  android: {
		color: "#49d272ff",
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

// Styles for Home Page
export const homeStyles = StyleSheet.create({
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
  topPage: {
	flex: .5,
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "#282c2e",
  },
  topMidPage: {
	flex: .2,
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "#34383aff",
  },
  midPageWrapper: {
	flex: 2.5,
	flexDirection: "row",
  },
  midPageL: {
	flex: 3,
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "#c0c9cdff",
  },
  midPageR: {
	flex: 3,
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "#a7afb3ff",
  },
  bottomPage: {
	flex: .2,
	alignItems: "center",
	justifyContent: "flex-end",
	backgroundColor: "#282c2e",
  },
  homeButton: {
	borderBottomWidth: 5,
	borderLeftWidth: 5,
	borderColor: "#000000ff",
	padding: 5,
	marginHorizontal: 20,
	borderRadius: 10,
	height: 300,
	width: 150,
	justifyContent: "center",
  },
  homeButtonText: {
	fontSize: 24,
	textAlign: "center",
	justifyContent: "center",
	fontWeight: "bold",
  },
});

// Gallery Styles
export const galleryStyles = StyleSheet.create({
	gallery: {
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
	topPage: {
		flex: .5,
		width: "100%",
		backgroundColor: "#292929ff",
  	},
  	midPage: {
		flex: .25,
		width: "100%",
		backgroundColor: "#343434ff",
	},
  	bottomPage: {
		flex: 4,
		width: "100%",
		resizeMode: "cover",
		repeat: true,
  	},
  	collectionWrapper: {
		width: '100%',
		paddingHorizontal: 12,
		paddingBottom: 12,
	},
	collectionRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	collectionButton: {
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 20,
		borderWidth: 1,
		borderLeftWidth: 3,
		borderBottomWidth: 3,
		borderColor: '#cccccc',
		backgroundColor: "#424242ff",
	},
	collectionButtonActive: {
		...Platform.select({
		ios: {
			backgroundColor: "#518199ff",
			borderColor: "#217abaff",
		},
		android: {
			backgroundColor: "#2b994cff",
			borderColor: "#2cae4bff",
		},
		}),
	},
	collectionButtonText: {
		color: '#ffffffff',
		fontWeight: 'bold',
	},
	listContent: {
		padding: 12,
	},
	gridContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	itemContainer: {
		flex: 1,
		margin: 6,
		height: 150,
		backgroundColor: '#abababff',
		borderRadius: 8,
		borderWidth: 2,
		borderColor: '#676767ff',
		marginBlock: 12,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 8,
	},
	itemTitle: {
		color: '#000000ff',
		fontWeight: 'bold',
	},
	itemButtonRow: {
		flexDirection: 'row',
		marginTop: 10,
	},
	openButton: {
		...Platform.select({
	  		ios: {
			backgroundColor: "#449cc7ff",
	  		},
	  		android: {
			backgroundColor: "#49d272ff",
	  		},
		}),
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: '#2b994cff',
		marginRight: 8,
	},
	removeButton: {
		backgroundColor: '#fe3a3aff',
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: '#c62828ff',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyButton: {
		borderBottomWidth: 5,
		borderLeftWidth: 5,
		borderColor: "#000000ff",
		padding: 5,
		marginLeft: 6,
		marginHorizontal: 20,
		borderRadius: 10,
		height: 200,
		width: 200,
		justifyContent: "center",
	},
	emptyText: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fcfcfcff',
		backgroundColor: '#a4a4a4aa',
	},
});

// Saved Drawings Page Specific Styles
export const savedDrawingsStyles = StyleSheet.create({
	savedDrawings: {
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
		flex: 1,
		justifyContent: "flex-start",
	},
	topRow: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'stretch',
	},
	topPageL: {
		flex: 0.5,
		backgroundColor: '#292929ff',
		justifyContent: 'flex-end',
		padding: 8,
	},

	topPageR: {
		flex: 0.5,
		backgroundColor: '#292929ff',
		justifyContent: 'flex-end',
		padding: 8,
	},
  	bottomPage: {
		flex: 4,
		width: "100%",
		backgroundColor: "#343434ff",
	},
	previewContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	previewBox: {
		height: '90%',
		width: '90%',
		backgroundColor: '#ffffffff',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

// Basic Styling for Toolbar
export const toolStyles = StyleSheet.create({
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
    bottom: 60,
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
  shapeButton: {
	alignItems: 'center',
	justifyContent: 'center',
	padding: 10,
	borderRadius: 8,
  },
  shapeText: { // shape size and color
    fontSize: 30,
    color: '#282c2e',
  },
  toolBarText: {
	 fontSize: 32,
	 color: "#FFFFFF",
  },
  colorPicker: { // Styling for color wheel
    position: 'absolute',
    bottom: 100,
    left: 0, // stretches across screen
    right: 0,
    backgroundColor: "#e9e9e9ff",
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
  },
  sliderDropdown: { 
	position: 'absolute',
	bottom: 70,
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	backgroundColor: '#ffffffff',
	borderWidth: 1,
	borderColor: '#ccc',
	borderRadius: 10,
	width: 270,
	paddingVertical: 8,
	paddingHorizontal: 12,
	shadowColor: '#000',
	shadowOpacity: 0.15,
	shadowRadius: 4,
	elevation: 3,
	zIndex: 10,
  },
  sliderValueText: { // display text on rhs
	fontSize: 16,
	color: '#282c2e',
	marginLeft: 4,
	marginRight: 18,
	minWidth: 36,
	textAlign: 'right'
  }
});

// Outline Styles
export const outlineStyles = StyleSheet.create({
	outlines: {
		...Platform.select({
			ios: {
				backgroundColor: "#b0e5ffff",
			},
			android: {
				backgroundColor: "#adffc6ff",
			},
		}),
		flex: 1,
		alignItems: "stretch" 
 	},
	topPage: {
		flex: .3,
		width: "100%",
		backgroundColor: "#292929ff",
		justifyContent: "center",
		alignItems: "center",
	},
	bottomPage: {
		flex: 4,
		width: "100%",
		flexDirection: "row",
		backgroundColor: "#343434ff",
	},
	headText: {
		color: "black",
		fontSize: 30,
		fontWeight: "bold",
		margin: 25,
		textAlign: "center",
	},
	outlineText: {
		color: "#000000ff",
		fontWeight: "bold",
  	},
	outlineButton: {
		flex: 1,
		padding: 10,
		margin: 10,
		alignItems: "center",
		borderLeftWidth: 4,
		borderBottomWidth: 4,
		borderRadius: 8,
		...Platform.select({
			ios: {
				borderColor: "#1f4b60ff",
			},
			android: {
				borderColor: "#28643aff",
			},
		}),
		backgroundColor: "#ffffffff",
		width: 200,
		height: 200,
	},
	outlineImages: {
		width: 150,
		height: 150,
	},
	flatlistContainer: {
		flex: 1,
		resizeMode: "cover",
	},
});