import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import { Formik, validateYupSchema } from 'formik'
import * as yup from 'yup'
import { mainColor, sideColor } from '../../../utils/ThemeColors'
import IconF from 'react-native-vector-icons/Fontisto'
import IconII from 'react-native-vector-icons/Ionicons'
import database from '@react-native-firebase/database'
import { AuthContext } from '../../../navigation/AuthProvider'

const PostActions = ({ navigation, postId, postUserUid }) => {

    const isDarkMode = useColorScheme() === 'dark';

    const { user } = useContext(AuthContext);

    const [postInfo, setPostInfo] = useState({})
    const [likeStatus, setLikeStatus] = useState(false);
    const [month, setMonth] = useState(((new Date).getMonth() + 1));

    const getPostInfo = () => {

        const reference = database().ref('/BookShelf/Posts/' + postId);

        reference
            .on('value', snapshot => {

                setPostInfo(snapshot.val());

            });

    }

    function checkLike() {
        const reference = database().ref("/BookShelf/PostLikes/" + postId + "/" + user.uid);
        reference
            .once('value')
            .then(snapshot => {
                if (snapshot.val() != null) {
                    setLikeStatus(true);
                } else {
                    setLikeStatus(false);
                }
            });
    }

    function likePost() {

        if (likeStatus) {

            database().ref("/BookShelf/PostLikes/" + postId + "/" + user.uid).remove();
            database().ref("/BookShelf/Posts/" + postId).update({
                PostLike: postInfo.PostLike - 1
            });
            database().ref("/BookShelf/usersPosts/" + postUserUid + "/" + postId).update({
                PostLike: postInfo.PostLike - 1
            });

        } else {
            const reference = database().ref("/BookShelf/PostLikes/" + postId + "/" + user.uid);
            reference
                .set({
                    LikedThePost: user.uid
                });
            database().ref("/BookShelf/Posts/" + postId).update({
                PostLike: postInfo.PostLike + 1
            });
            database().ref("/BookShelf/usersPosts/" + postUserUid + "/" + postId).update({
                PostLike: postInfo.PostLike + 1
            });
        }

        checkLike();
    }

    useEffect(() => {

        getPostInfo();
        checkLike();

        return () => {
            setPostInfo({})
            setLikeStatus(false)
        }

    }, [postId]);

    return (
        <View style={{
            width: '100%',
            padding: '2%'
        }}>
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => {
                    likePost();
                }}>
                    <IconII
                        name={likeStatus == false ? 'heart-outline' : 'heart'}
                        size={24}
                        color={likeStatus == false ? isDarkMode ? Colors.white : Colors.black : mainColor} />
                </TouchableOpacity>
                <Text style={{
                    color: isDarkMode ? Colors.lighter : Colors.darker,
                    marginRight: '5%',
                    marginLeft: '1%'
                }}>
                    {postInfo.PostLike}
                </Text>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("PostComments", {
                        postId: postId,
                        postUserUid: postUserUid
                    })
                }}>
                    <IconF
                        name='comment'
                        size={24}
                        color={isDarkMode ? Colors.white : Colors.black} />
                </TouchableOpacity>
                <Text style={{
                    color: isDarkMode ? Colors.lighter : Colors.darker,
                    marginLeft: '2%'
                }}>
                    {postInfo.PostComment}
                </Text>
            </View>

            <TouchableOpacity onPress={() => {
                navigation.navigate("PostComments", {
                    postId: postId,
                    postUserUid: postUserUid
                })
            }} style={{
                width: '100%',
                marginTop:'1%'
            }}>
                <Text style={{
                    color: isDarkMode ? Colors.light : Colors.dark,
                    textAlign: 'left'
                }}>
                    {
                        moment().locale() == "tr" ?
                            postInfo.PostComment + "yorumun tümünü gör" :
                            "See all " + postInfo.PostComment + " comment"
                    }
                </Text>
            </TouchableOpacity>

            <Text style={{
                color: isDarkMode ? Colors.white : Colors.black,
                textAlign: 'right'
            }}>
                {
                    postInfo.PostMonth != month ?
                        postInfo.PostDate
                        :
                        moment(postInfo.PostFullDate, "YYYYMMDD, h:mm:ss").fromNow()
                }
            </Text>
        </View>
    )
}

export default PostActions