import { StyleSheet } from "react-native";

export default StyleSheet.create({
  profileWrapper: {
    alignItems: "center",
    marginTop: 40, // Adjust for the notch
    position: "relative", // Keeps structure stable
  },
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background for the top section
    padding: 10,
  },
  profileSection: {
    position: "relative", // Needed for absolute positioning
    marginBottom: 10,
    paddingBottom: 10, // Ensures the section is taller
  },
  profileRow: {
    flexDirection: "row", // Puts profile & bin in the same row
    alignItems: "center", //  Aligns them vertically
    justifyContent: "space-between", // Spreads them apart
  },
  iconContainer: {
    flexDirection: "row", // Keeps icons in one row
    alignItems: "center",
    marginRight: 20,
    gap: 20
  },
  profileContainer: {
    marginBottom: 10, // Adds space below the profile
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
    marginLeft: "18%",
    marginTop: 20, // Add this to push it down
  },
  searchIcon: {
    marginRight: 20, // Adjusts spacing between search & bin
  },
  searchContainer: {
    height: 50,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 5,
    marginBottom: 25,
  },  
  searchInput: {
    height: "100%",
    color: "white",
    paddingHorizontal: 10,
    placeholderTextColor: "#aaa"
  },  
  binIcon: {
    padding: 10, // Adds touchable area
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark transparent background
  },
  modalContainer: {
    width: '100%',
    height: '20%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 30,
    alignItems: 'center',
    alignContent: 'center',
  },
  modalText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    alignContent: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#777',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  storageInfo: {
    alignItems: "left", // Aligns text to the left
    width: "100%",
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 20,
  },
  storageSubTextContainer: {
    flexDirection: "row",  
    alignItems: "center",  
    marginTop: 2,          
    gap: 5,                
  },  
  storageText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "200",
    letterSpacing: 1,
  },
  progressBar: {
    height: 15,
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#333",
    marginVertical: 6,
  },
  storageSubText: {
    color: "#aaa",
    marginTop: 1,
    fontSize: 15,
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingBottom: 100, // Ensures white extends fully to bottom
    minHeight: "100%", // Forces full height
  },
  junkFilesCard: {
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 10,
    marginTop: 5,
  },
  junkFilesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  junkFilesTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  junkFilesSubText: {
    color: "#888",
    marginTop: 1,
  },
  successText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#a855f7",
    textAlign: "center",
    marginTop: 10,
  },  
  folderScroll: {
    marginTop: 5,
    height: 120,
  },
  folderItem: {
    alignItems: "center",
    marginRight: 10, // Adds spacing between folders
    width: 100, // Ensures items stay in a fixed width
  },
  fileCard: {
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 10,
    marginTop: 5,
  },  
  fileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -5,  // Reduce space between title and subtitle
  },  
  fileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  fileText: {
    fontWeight: "bold",
  },
  fileSubText: {
    color: "#888",
  },
  lastModifiedCard: {
    borderWidth: 0.5,
    borderRadius: 20,            // Makes it rounded
    paddingHorizontal: 10,       // Adds horizontal padding
    paddingVertical: 5,          // Adds vertical padding
    alignSelf: "flex-start",      // Prevents full width stretching 
  },
  lastModifiedText: {
    color: "#666", 
    fontSize: 12,
    textAlign: "center",
  },
  scanButtonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "transparent", // Optional: Ensures visibility on different backgrounds
    paddingVertical: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 10, // Adds a slight shadow effect
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
  scanButton: {
    width: "90%",  // Adjusted width to align with file section
    height: 60, // Maintains button height
    justifyContent: "center",
    borderRadius: 30, // Keeps rounded edges
    alignSelf: "center", // Ensures it stays centered
  },  
  scanProgressContainer: {
    position: "absolute", // Absolute positioning
    top: "50%", // Center vertically
    left: "40%", // Center horizontally
    transform: [{ translateX: -50 }, { translateY: -50 }], // Adjust for exact center
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent background
    padding: 20, // Add padding
    borderRadius: 10, // Rounded corners
  },
  scanProgressText: {
    color: "white", // Text color
    fontSize: 16, // Text size
    marginTop: 10, // Space between spinner and text
  },
  folderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  verticalDivider: {
    width: 1, // Thin vertical line
    height: "80%", // Only covers part of the folder height (adjust if needed)
    backgroundColor: "#D3D3D3", // Faint gray color
    marginHorizontal: 8, // Space between folders
  },
  horizontalDivider: {
    height: 1, // Thin line
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Faint line
    marginLeft: 2, // Pushes it away from the far left
    marginRight: 10, // Doesn't touch the far right
  },
  
  
});
