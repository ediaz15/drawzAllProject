import { StyleSheet, Platform } from "react-native";

// General Styles used across multiple pages
export const defaultStyles = StyleSheet.create({
	pageHeader: {
	height: 100,
	fontSize: 24,
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
	flex: 1,
	alignItems: "center",
	justifyContent: "center",
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
	flex: .5,
	alignItems: "center",
	justifyContent: "flex-end",
	backgroundColor: "#282c2e",
  }
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
		...Platform.select({
			ios: {
				backgroundColor: "#bae8ffff",
			},
			android: {
				backgroundColor: "#b9fccdff",
			},
		}),
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
		borderColor: '#cccccc',
		backgroundColor: 'transparent',
	},
	collectionButtonActive: {
		...Platform.select({
		ios: {
			backgroundColor: "#449cc7ff",
			borderColor: "#217abaff",
		},
		android: {
			backgroundColor: "#49d272ff",
			borderColor: "#2cae4bff",
		},
		}),
	},
	collectionButtonText: {
		color: '#000',
	},
	collectionButtonTextActive: {
		color: '#fff',
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
		backgroundColor: '#ffffffff',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 8,
	},
	itemTitle: {
		color: '#000',
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
		marginRight: 8,
	},
	removeButton: {
		backgroundColor: '#fe3a3aff',
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
	},
	emptyText: {
		textAlign: 'center',
		marginTop: 20,
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
    position: "absolute",
    bottom: 0,
    width: "100%",
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
});