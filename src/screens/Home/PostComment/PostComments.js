import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, FlatList } from 'react-native'
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
import PostCommentInfo from './PostCommentInfo'

const PostComments = ({ navigation, route }) => {

    const isDarkMode = useColorScheme() === 'dark';
    const { user } = useContext(AuthContext);
    const { postId } = route.params;
    const { postUserUid } = route.params;
    const [commentList, setCommentList] = useState({});
    const [commentText, setCommentText] = useState('');

    const [postInfo, setPostInfo] = useState({});

    const getPostInfo = () => {

        const reference = database().ref('/BookShelf/Posts/' + postId);

        reference
            .on('value', snapshot => {

                setPostInfo(snapshot.val());

            });

    }

    function getPostComments() {

        const reference = database().ref("/BookShelf/PostComments/" + postId);
        reference
            .on('value', snapshot => {

                if (snapshot.val() != null) {
                    const list = [];
                    const listt = [];
                    snapshot.forEach(c => {

                        const i = c.val();
                        list.push(i);

                    });

                    for (let j = list.length; j > 0; j--) {

                        listt.push(list[j - 1]);

                    }
                    setCommentList(listt);
                } else {
                    setCommentList({});
                }

            });

    }

    function shareComment(commentText) {

        let todayy = new Date();

        let today = todayy.getFullYear() + '' +
            ((todayy.getMonth() + 1) < 10 ? ("0" + (todayy.getMonth() + 1))
                : (todayy.getMonth() + 1)) + '' + todayy.getDate() + ", " +
            todayy.getHours() + ":" +
            ((todayy.getMinutes()) < 10 ? ("0" + (todayy.getMinutes()))
                : (todayy.getMinutes())) + ":" +
            todayy.getSeconds();

        if (commentText.length != 0) {

            const reference1 = database().ref("/BookShelf/PostComments/" + postId).push();
            reference1.set({
                CommentId: reference1.key,
                CommentText: commentText,
                CommentOwner: user.uid,
                CommentFullDate: today,
                CommentDate: moment().format('lll'),
                CommentMonth: (todayy.getMonth() + 1),
            });

            const reference2 = database().ref("/BookShelf/Posts/" + postId);
            reference2.update({
                PostComment: postInfo.PostComment + 1
            });

            const reference3 = database().ref("/BookShelf/usersPosts/" + postUserUid + "/" + postId);
            reference3.update({
                PostComment: postInfo.PostComment + 1
            });

            setCommentText('');

        }

    }

    function renderItem({ item, index }) {
        return (
            <React.Fragment>
                <PostCommentInfo
                    navigation={navigation}
                    item={item}
                    postOwner={postUserUid}
                    postId={postId}
                />
            </React.Fragment>
        )
    }

    useEffect(() => {

        getPostInfo();
        getPostComments();

        return () => {
            setPostInfo({});
            setCommentList({});
        }
    }, [])


    return (
        <SafeAreaView style={{
            width: '100%',
            height: '100%',
            padding: '2%',
            backgroundColor: isDarkMode ? Colors.black : Colors.white
        }}>

            {
                commentList.length == undefined ?
                    <View style={{
                        width: '100%',
                        height: '93%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            color: isDarkMode ? Colors.white : Colors.black,
                            fontSize: 20
                        }}>
                            {
                                moment().locale() == "tr" ?
                                    "Henüz Gönderiye Yorum Yapılmamış." :
                                    "No Comments on the Post Yet."
                            }
                        </Text>
                    </View>
                    :
                    <FlatList
                        data={commentList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                    />
            }

            <View style={{
                width: '100%',
                flexDirection: 'row',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isDarkMode ? Colors.black : Colors.white
            }}>

                <TextInput
                    style={{
                        width: '85%',
                        borderWidth: 1,
                        borderColor: isDarkMode ? Colors.white : Colors.black,
                        height: 40,
                        paddingHorizontal: '2%',
                        marginRight: '5%'
                    }}
                    placeholder={
                        moment().locale() == "tr" ?
                            "Yorumunuz" :
                            "Your comment"
                    }
                    placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
                    color={isDarkMode ? Colors.white : Colors.black}
                    onChangeText={value => { setCommentText(value) }}
                    value={commentText}
                />

                <TouchableOpacity onPress={() => {
                    shareComment(commentText);
                }} style={{
                    width: '10%'
                }}>
                    <IconII
                        name='send'
                        size={30}
                        color={isDarkMode ? Colors.white : Colors.black}
                    />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default PostComments