import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, FlatList, Linking } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import database from '@react-native-firebase/database'
import FastImage from 'react-native-fast-image'
import { mainColor, sideColor } from '../../../utils/ThemeColors'
import { AuthContext } from '../../../navigation/AuthProvider'
import IconII from 'react-native-vector-icons/Ionicons'
import TargetUserPosts from './TargetUserPosts'
import TargetUserFavoriteBooks from './TargetUserFavoriteBooks'

const TargetUserProfile = ({ navigation, route }) => {

    const isDarkMode = useColorScheme() === 'dark';

    const { user, signOut } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState({});
    const [currentTargetUser, setCurrentTargetUser] = useState({});
    const [targetUserPostsList, setTargetUserPostsList] = useState({});
    const [targetUserFavoriteBooksList, setTargetUserFavoriteBooksList] = useState(true)
    const [postOrFavorite, setPostOrFavorite] = useState(true)

    const { targetUserId } = route.params;

    const getCurrentUser = () => {

        const reference = database().ref('/BookShelf/userList/' + user.uid);

        reference
            .once('value')
            .then(snapshot => {

                if (snapshot.val() != null) {
                    setCurrentUser(snapshot.val());
                } else {
                    setCurrentUser({})
                }


            });

    }

    const getCurrentTargetUser = () => {

        const reference = database().ref('/BookShelf/userList/' + targetUserId);

        reference
            .once('value')
            .then(snapshot => {

                if (snapshot.val() != null) {
                    setCurrentTargetUser(snapshot.val());
                } else {
                    setCurrentTargetUser({})
                }

            });

    }

    const getTargetUserPosts = () => {

        const reference = database().ref('/BookShelf/usersPosts/' + targetUserId);

        reference.on('value', snapshot => {
            const list = [];
            const listt = [];
            if (snapshot.val() != null) {

                snapshot.forEach(c => {
                    const i = c.val();
                    list.push(i);

                });

                for (let i = list.length; i > 0; i--) {

                    listt.push(list[i - 1]);

                }

                setTargetUserPostsList(listt);

            } else {
                setTargetUserPostsList({})
            }

        });

    }

    function getTargetUserFavorites() {

        const reference1 = database().ref("/BookShelf/FavoriteBooks/" + targetUserId);
        reference1
            .on('value', snapshot => {
                if (snapshot.val() != null) {
                    setTargetUserFavoriteBooksList(Object.values(snapshot.val()));
                } else {
                    setTargetUserFavoriteBooksList({});
                }
            });

    }

    useEffect(() => {
        getCurrentUser();
        getCurrentTargetUser();
        getTargetUserPosts();
        getTargetUserFavorites();

        return () => {
            setCurrentUser({});
            setCurrentTargetUser({});
            setTargetUserPostsList({});
            setTargetUserFavoriteBooksList({});
        }
    }, [targetUserId]);


    return (
        <SafeAreaView style={{
            width: '100%',
            height: '100%',
            padding: '2%',
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>

            <View style={{
                width: '100%',
                flexDirection: 'row',
                paddingLeft: '1%',
                paddingRight: '1%'
            }}>

                <View style={{
                    flex: 3,
                }}>

                    <Text style={{
                        color: isDarkMode ? Colors.white : Colors.black,
                        fontSize: 24
                    }}>
                        {currentTargetUser.NickName}
                    </Text>

                </View>

            </View>

            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <View style={{
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: isDarkMode ? Colors.white : Colors.black,
                    }}>
                        {currentTargetUser.Post}
                    </Text>

                    <Text style={{
                        color: isDarkMode ? Colors.white : Colors.black,
                    }}>
                        {
                            moment().locale() == "tr" ?
                                "Gönderi"
                                :
                                "Post"
                        }
                    </Text>
                </View>

                <FastImage
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        marginLeft: '15%',
                        marginRight: '10%',
                        borderWidth: 1,
                        borderColor: isDarkMode ? Colors.white : Colors.black
                    }}
                    source={{
                        uri: currentTargetUser.ImageUrl,
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />

                <View style={{
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: isDarkMode ? Colors.white : Colors.black,
                    }}>
                        {
                            targetUserFavoriteBooksList.length != undefined ?
                                "" + targetUserFavoriteBooksList.length :
                                "0"
                        }
                    </Text>

                    <Text style={{
                        color: isDarkMode ? Colors.white : Colors.black,
                    }}>
                        {
                            moment().locale() == "tr" ?
                                "Favori"
                                :
                                "Favorite"
                        }
                    </Text>
                </View>


            </View>

            <View style={{
                width: '98%',
                margin: '1%',
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderColor: mainColor,
                paddingVertical: '1%'
            }}>

                <Text style={{
                    color: isDarkMode ? Colors.white : Colors.black,
                    fontWeight: 'bold'
                }}>
                    {currentTargetUser.Name}
                </Text>

                {
                    currentTargetUser.Biography != "" &&
                    <Text style={{
                        color: isDarkMode ? Colors.white : Colors.black,
                    }}>
                        {currentTargetUser.Biography}
                    </Text>
                }

                {
                    currentTargetUser.WebSite != "" &&
                    <TouchableOpacity onPress={() => {
                        Linking.openURL(currentTargetUser.WebSite);
                    }}>
                        <Text style={{
                            color: isDarkMode ? '#00a8ff' : '#00f',
                        }}>
                            {currentTargetUser.WebSite}
                        </Text>
                    </TouchableOpacity>
                }

            </View>

            <View style={{
                width: '100%',
                marginVertical: '2%',
                flexDirection: 'row'
            }}>

                <TouchableOpacity onPress={() => {
                    setPostOrFavorite(true)
                }} style={{
                    width: '45%',
                    marginRight: '5%',
                    alignItems: 'center'
                }}>
                    <IconII
                        name='images'
                        size={30}
                        color={postOrFavorite ? mainColor : isDarkMode && Colors.white || Colors.black}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setPostOrFavorite(false)
                }} style={{
                    width: '45%',
                    marginLeft: '5%',
                    alignItems: 'center'
                }}>
                    <IconII
                        name='heart'
                        size={30}
                        color={postOrFavorite ? isDarkMode && Colors.white || Colors.black : mainColor}
                    />
                </TouchableOpacity>

            </View>

            {
                postOrFavorite ?
                    <TargetUserPosts
                        navigation={navigation}
                        postList={targetUserPostsList}
                        targetUserId={targetUserId}
                    />
                    :
                    <TargetUserFavoriteBooks 
                    navigation={navigation}
                    favoriteBooksList={targetUserFavoriteBooksList}
                    />
            }

        </SafeAreaView>
    )
}

export default TargetUserProfile