import { useColorScheme, View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { mainColor, sideColor } from '../../utils/ThemeColors'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconFA from 'react-native-vector-icons/FontAwesome'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconII from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import { AuthContext } from '../../navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database'

const color = '#aaa';

const BottomNavigator = ({ navigation, whichScreen }) => {

    const isDarkMode = useColorScheme() === 'dark';

    const { user } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState({});
    const [state, setState] = useState({});

    const usersColl = firestore().collection('users');

    const getCurrentUser = () => {

        const reference = database().ref('/BookShelf/userList/' + user.uid);

        reference
            .on('value', snapshot => {

                setCurrentUser(snapshot.val());

            });

    }

    useEffect(() => {

        getCurrentUser()
        setState({});
        return () => {
            setCurrentUser({});
        };

    }, []);

    if (whichScreen == "Home") {
        return (
            <View style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                padding: '1%',
                flexDirection: 'row',
                borderTopWidth: 1,
                borderTopColor: isDarkMode ? Colors.dark : Colors.light,
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("Home")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <IconFA5 name='home' color={mainColor} size={30} />

                    </View></TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("Social")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <IconMCI name='account-group' color={isDarkMode ? Colors.white : color} size={30} />

                    </View></TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("FavoriteBooks")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <IconII name='heart' color={isDarkMode ? Colors.white : color} size={30} />

                    </View></TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("Profile")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <FastImage
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                borderWidth: 1,
                                borderColor: isDarkMode ? Colors.white : Colors.black
                            }}
                            source={{
                                uri: currentUser.ImageUrl,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />

                    </View></TouchableOpacity>
            </View>
        )

    } else if (whichScreen == "Social") {
        return (
            <View style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                padding: '1%',
                flexDirection: 'row',
                borderTopWidth: 1,
                borderTopColor: isDarkMode ? Colors.dark : Colors.light,
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("Home")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <IconFA5 name='home' color={isDarkMode ? Colors.white : color} size={30} />

                    </View></TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("Social")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <IconMCI name='account-group' color={mainColor} size={30} />

                    </View></TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("FavoriteBooks")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <IconII name='heart' color={isDarkMode ? Colors.white : color} size={30} />

                    </View></TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("Profile")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <FastImage
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                borderWidth: 1,
                                borderColor: isDarkMode ? Colors.white : Colors.black
                            }}
                            source={{
                                uri: currentUser.ImageUrl,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />

                    </View></TouchableOpacity>
            </View>
        )

    } else if (whichScreen == "FavoriteBooks") {
        return (
            <View style={{
                position: 'absolute',
                bottom: 0,
                marginTop: '2%',
                width: '100%',
                padding: '1%',
                flexDirection: 'row',
                borderTopWidth: 1,
                borderTopColor: isDarkMode ? Colors.dark : Colors.light,
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("Home")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <IconFA5 name='home' color={isDarkMode ? Colors.white : color} size={30} />

                    </View></TouchableOpacity>



                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("Social")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <IconMCI name='account-group' color={isDarkMode ? Colors.white : color} size={30} />

                    </View></TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("FavoriteBooks")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <IconII name='heart' color={mainColor} size={30} />

                    </View></TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("Profile")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <FastImage
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                borderWidth: 1,
                                borderColor: isDarkMode ? Colors.white : Colors.black
                            }}
                            source={{
                                uri: currentUser.ImageUrl,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />

                    </View></TouchableOpacity>
            </View>
        )

    } else if (whichScreen == "Profile") {
        return (
            <View style={{
                position: 'absolute',
                bottom: 0,
                marginTop: '2%',
                width: '100%',
                padding: '1%',
                flexDirection: 'row',
                borderTopWidth: 1,
                borderTopColor: isDarkMode ? Colors.dark : Colors.light,
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("Home")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <IconFA5 name='home' color={isDarkMode ? Colors.white : color} size={30} />

                    </View></TouchableOpacity>



                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("Social")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <IconMCI name='account-group' color={isDarkMode ? Colors.white : color} size={30} />

                    </View></TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("FavoriteBooks")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <IconII name='heart' color={isDarkMode ? Colors.white : color} size={30} />

                    </View></TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("Profile")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <FastImage
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                borderWidth: 1,
                                borderColor: isDarkMode ? Colors.white : Colors.black
                            }}
                            source={{
                                uri: currentUser.ImageUrl,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />

                    </View></TouchableOpacity>
            </View>
        )

    } else if (whichScreen == "Diger") {
        return (
            <View style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                padding: '1%',
                flexDirection: 'row',
                borderTopWidth: 1,
                borderTopColor: isDarkMode ? Colors.dark : Colors.light,
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("Home")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <IconFA5 name='home' color={isDarkMode ? Colors.white : color} size={30} />

                    </View></TouchableOpacity>



                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("Social")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <IconMCI name='account-group' color={isDarkMode ? Colors.white : color} size={30} />

                    </View></TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("FavoriteBooks")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <IconII name='heart' color={isDarkMode ? Colors.white : color} size={30} />

                    </View></TouchableOpacity>

                <TouchableOpacity style={{
                    flex: 1,
                }} onPress={() => {
                    navigation.navigate("Profile")
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <FastImage
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                borderWidth: 1,
                                borderColor: isDarkMode ? Colors.white : Colors.black
                            }}
                            source={{
                                uri: currentUser.ImageUrl,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />

                    </View></TouchableOpacity>
            </View>
        )
    }


}

export default BottomNavigator