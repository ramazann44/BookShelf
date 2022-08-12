import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import database from '@react-native-firebase/database'

import { AuthContext } from '../../../navigation/AuthProvider'
import FastImage from 'react-native-fast-image';

const PostHeader = ({ navigation, postUserUid, postId }) => {

    const isDarkMode = useColorScheme() === 'dark';

    const { user } = useContext(AuthContext);
    const [postUserInfo, setPostUserInfo] = useState({});

    function getPostUserInfo() {

        const reference = database().ref('/BookShelf/userList/' + postUserUid);

        reference
            .once('value')
            .then(snapshot => {

                if (snapshot.val() != null) {
                    setPostUserInfo(snapshot.val());
                } else {
                    setPostUserInfo({});
                }

            });

        

    }

    function deletePost() {

        const reference = database().ref("/BookShelf/userList/" + postUserUid)
        reference.update({
            Post: postUserInfo.Post - 1
        });
        database().ref("/BookShelf/usersPosts/" + postUserUid + "/" + postId).remove();
        database().ref("/BookShelf/PostLikes/" + postId).remove();
        database().ref("/BookShelf/Posts/" + postId).remove();

        navigation.navigate("HomeScreen");
        
    }

    useEffect(() => {

        getPostUserInfo();
        return () => {
            setPostUserInfo({});
        }

    }, []);


    return (
        <SafeAreaView style={{
            width: '100%',
            flexDirection: 'row',
            paddingLeft: '2%',
            paddingRight: '2%',
            marginTop: '1%',
            marginBottom: '2%',
            backgroundColor: isDarkMode ? Colors.black : Colors.white
        }}>

            {
                postUserUid != user.uid ?
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("TargetUserProfile", { targetUserId: postUserUid })
                    }} style={{
                        flexDirection: 'row',
                    }}>

                        <FastImage
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15
                            }}
                            source={{
                                uri: postUserInfo.ImageUrl,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />

                        <Text style={{ marginTop: 5, marginLeft: 10, color: isDarkMode ? Colors.white : Colors.black }}>{postUserInfo.NickName}</Text>

                    </TouchableOpacity>
                    :
                    <View style={{ flexDirection: 'row' }}>

                        <FastImage
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15
                            }}
                            source={{
                                uri: postUserInfo.ImageUrl,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />

                        <Text style={{ marginTop: 5, marginLeft: 10, color: isDarkMode ? Colors.white : Colors.black }}>{postUserInfo.NickName}</Text>

                    </View>
            }


            {
                postUserInfo.Uid == user.uid &&
                <View style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: 10
                }}>

                    <TouchableOpacity
                        onPress={() => {
                            deletePost()
                        }}
                        style={{
                            marginLeft: 20
                        }}>
                        <Text style={{
                            color: '#d55'
                        }}>
                            Delete Post
                        </Text>
                    </TouchableOpacity>

                </View>

            }

        </SafeAreaView>
    )
}

export default PostHeader