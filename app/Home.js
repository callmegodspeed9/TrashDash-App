import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, ActivityIndicator, ScrollView, View, Image, Animated, Text, TextInput, Modal, TouchableOpacity, StatusBar, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressBar, Button, Card, IconButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import styles from "./styles";

function HomeScreen() {
  const [files, setFiles] = useState([
    { name: "Flight Booking Confirmation", size: "3.2 Mb", date: "Mar 20, 2023" },
    { name: "CMR Documents", size: "5.1 Mb", date: "Mar 25, 2023" },
    { name: "Marketing Report", size: "2.8 Mb", date: "Apr 01, 2023" },
    { name: "Project Proposal", size: "6.4 Mb", date: "Apr 05, 2023" },
    { name: "Client Contracts", size: "4.5 Mb", date: "Apr 10, 2023" },
    { name: "Design Mockups", size: "3.7 Mb", date: "Apr 15, 2023" },
    { name: "Legal Agreements", size: "5.9 Mb", date: "Apr 18, 2023" },
    { name: "Financial Statements", size: "4.2 Mb", date: "Apr 22, 2023" },
    { name: "HR Policies", size: "6.8 Mb", date: "Apr 25, 2023" },
    { name: "Supplier Invoices", size: "7.1 Mb", date: "Apr 28, 2023" },
  ]);

  const [image, setImage] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const searchAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cleaning, setCleaning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [junkFiles, setJunkFiles] = useState([]);

  useEffect(() => {
    loadProfileImage();
  }, []);

  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem("profileImage");
      if (savedImage) {
        setImage(savedImage);
      }
    } catch (error) {
      console.error("Error loading profile image:", error);
    }
  };

  const pickImage = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setImage(selectedImage);
      await AsyncStorage.setItem("profileImage", selectedImage);
    }
  };

  const toggleSearch = () => {
    if (searchVisible) {
      Animated.timing(searchAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSearchVisible(false));
    } else {
      setSearchVisible(true);
      Animated.timing(searchAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const startCleaning = () => {
    setCleaning(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          setCleaning(false);
          setCompleted(true);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
          return 1;
        }
        return prev + 0.1;
      });
    }, 300);
  };

  const simulateScan = () => {
    setIsScanning(true); 
    setScanCompleted(false);
    setJunkFiles([]);
  
    setTimeout(() => {

      const mockJunkFiles = [
        { name: "Temp File 1", size: "10 Mb", date: "Oct 01, 2023" },
        { name: "Cache File", size: "15 Mb", date: "Oct 02, 2023" },
        { name: "Old Logs", size: "8 Mb", date: "Sep 28, 2023" },
        { name: "Unused Downloads", size: "12 Mb", date: "Oct 03, 2023" },
        { name: "Temporary Files", size: "20 Mb", date: "Oct 04, 2023" },
        { name: "System Cache", size: "18 Mb", date: "Oct 05, 2023" },
        { name: "Backup Files", size: "25 Mb", date: "Oct 06, 2023" },
      ];

      setJunkFiles(mockJunkFiles);  
      setIsScanning(false); 
      setScanCompleted(true);
        setTimeout(() => {
        setScanCompleted(false);
      }, 3000);
    }, 2000);
  };

  const handleDeleteFile = (file) => {
    Alert.alert(
      "Delete File", // Title of the alert
      `Are you sure you want to delete ${file.name}?`, // Message
      [
        {
          text: "Cancel", // Cancel button
          style: "cancel",
        },
        {
          text: "Delete", // Delete button
          onPress: () => deleteFile(file), // Call delete function if confirmed
          style: "destructive",
        },
      ],
      { cancelable: true } // Allow dismissing the alert by tapping outside
    );
  };
  
  const deleteFile = (fileToDelete) => {
    // Filter out the deleted file
    const updatedFiles = files.filter((file) => file.name !== fileToDelete.name);
    setFiles(updatedFiles); // Update the state
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      
      <View style={{ flex: 1 }}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileRow}>
            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
              ) : (
                <Ionicons name="person-circle-outline" size={80} color="white" />
              )}
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={toggleSearch}>
                <Ionicons name="search" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.binIcon}>
                <Ionicons name="trash" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Modal for Trash Info */}
          <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
            <View style={styles.overlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>
                  Trash is empty. Deleted files stay here for 30 days before being permanently removed.
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        {searchVisible && (
          <Animated.View
            style={[
              styles.searchContainer,
              {
                opacity: searchAnim,
                transform: [{ scale: searchAnim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }],
              },
            ]}
          >
            <TextInput style={styles.searchInput} placeholder="Search files" placeholderTextColor="#aaa" />
          </Animated.View>
        )}

        {/* Storage Info */}
        <View style={styles.storageInfo}>
          <Text style={styles.storageText}>
            <Text style={styles.storageNumber}>40</Text>
            <Text style={{ fontWeight: "100", color: "rgba(255, 255, 255, 0.4)" }}> / </Text>
            <Text style={styles.storageNumber}>100GB</Text>
          </Text>
          <ProgressBar progress={0.4} color="#a855f7" style={styles.progressBar} />
          <View style={styles.storageSubTextContainer}>
            <Ionicons name="cloud-outline" size={18} color="#aaa" />
            <Text style={styles.storageSubText}>Storage 40% full</Text>
          </View>
        </View>

        {/* Scrollable Content Section */}
        <ScrollView style={styles.whiteContainer} contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}>
        {/* Junk Files Section */}
        {!(completed && progress >= 1 && !showSuccess) && (
          <Card style={styles.junkFilesCard}>
            <Card.Content>
              <View style={styles.junkFilesHeader}>
                <Text style={styles.junkFilesTitle}>Junk Files Found</Text>
                {cleaning ? (
                  <Progress.Circle size={100} progress={progress} showsText color="#a855f7" />
                ) : completed ? (
                  showSuccess ? (
                    <Text style={styles.successText}>All junk files deleted!</Text>
                  ) : null
                ) : (
                  <Button
                    mode="contained"
                    buttonColor="#a855f7"
                    labelStyle={{ fontWeight: "bold", fontSize: 16 }}
                    onPress={startCleaning}
                  >
                    Clean Now
                  </Button>
                )}
              </View>

              {!completed && (
                <>
                  {/* Display the total size of junk files */}
                  <Text style={styles.junkFilesSubText}>
                    {junkFiles.reduce((total, file) => total + parseFloat(file.size), 0).toFixed(1)} GB detected
                  </Text>

                  {/* Display the scanned junk files */}
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.folderScroll}>
                    {junkFiles.length > 0 ? (
                      junkFiles.map((file, index) => (
                        <View key={index} style={styles.folderContainer}>
                          <View style={styles.folderItem}>
                            <IconButton icon="file" size={40} iconColor="#a855f7" />
                            <Text style={styles.fileText}>{file.name}</Text>
                            <Text style={styles.fileSubText}>{file.size}</Text>
                          </View>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.junkFilesSubText}>No junk files found.</Text>
                    )}
                  </ScrollView>
                </>
              )}
            </Card.Content>
          </Card>
        )}

        {/* Large & Duplicate Files Section */}
        <Card style={styles.fileCard}>
        <Card.Content>
          <Text style={styles.junkFilesTitle}>Large & Duplicate Files</Text>
          <View style={styles.fileHeader}>
            <View style={{ flex: 1 }}>
              <View style={styles.lastModifiedCard}>
                <Text style={styles.lastModifiedText}>Last modified ↓</Text>
              </View>
            </View>
            <IconButton icon="filter-variant" size={20} />
          </View>

          {files.map((file, index) => (
            <View key={index}>
              <View style={styles.fileItem}>
                <Ionicons name={index % 2 === 0 ? "document-outline" : "folder-outline"} size={24} color="rgba(168, 85, 247, 0.5)" style={{ alignSelf: "center" }} />
                <View>
                  <Text style={styles.fileText}>{file.name}</Text>
                  <Text style={styles.fileSubText}>{file.size}, modified {file.date}</Text>
                </View>
                <IconButton
                  icon="delete-outline"
                  iconColor="black"
                  onPress={() => handleDeleteFile(file)} // Add confirmation dialog
                />
              </View>
              {index !== files.length - 1 && <View style={styles.horizontalDivider} />}
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  
        {/* Scan Progress Indicator */}
        {isScanning && (
          <View style={styles.scanProgressContainer}>
            <ActivityIndicator size="large" color="#a855f7" />
            <Text style={styles.scanProgressText}>Scanning your files...</Text>
          </View>
        )}
        
        {scanCompleted && (
          <View style={styles.scanProgressContainer}>
            <Ionicons name="checkmark-circle" size={60} color="#a855f7" />
            <Text style={styles.scanProgressText}>Scan completed!</Text>
          </View>
        )}

        {/* Floating Scan Button */}
        <View style={styles.scanButtonContainer}>
          <Button mode="contained" buttonColor="#a855f7" style={styles.scanButton} labelStyle={{ fontWeight: "bold", fontSize: 20 }}
          onPress={simulateScan}
          loading={isScanning}
          disabled={isScanning}
          >
            {isScanning ? "Scanning..." : "Scan"}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;