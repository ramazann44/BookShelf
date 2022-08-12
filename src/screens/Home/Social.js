import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Button, FlatList } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import { Formik, validateYupSchema } from 'formik'
import * as yup from 'yup'
import BottomNavigator from './BottomNavigator'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import { mainColor, sideColor } from '../../utils/ThemeColors'
import { AuthContext } from '../../navigation/AuthProvider'
import database from '@react-native-firebase/database'
import PostHeader from './Post/PostHeader'
import PostMain from './Post/PostMain'
import PostActions from './Post/PostActions'
import WantedUserInfo from './WantedUserInfo'

const Social = ({ navigation }) => {

    const isDarkMode = useColorScheme() === 'dark';

    const [wantedUser, setWantedUser] = useState('');
    const { user } = useContext(AuthContext);
    const [wantedUserList, setWantedUserList] = useState({});
    const [allPostList, setAllPostList] = useState({});

    function getSocialList(User) {

        if (User == '') {
            const reference1 = database().ref('/BookShelf/Posts').orderByChild("PostFullDate");

            reference1
                .on('value', snapshot => {
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

                        setAllPostList(listt);

                    } else {
                        setAllPostList({});
                    }

                });
        } else {
            const reference2 = database().ref('/BookShelf/userList');

            reference2
                .on('value', snapshot => {
                    const list = [];
                    if (snapshot.val() != null) {
                        for (let i = 0; i < Object.values(snapshot.val()).length; i++) {
                            if (Object.values(snapshot.val())[i].Uid != user.uid) {
                                if (Object.values(snapshot.val())[i].NickName.includes(User) || Object.values(snapshot.val())[i].Name.includes(User)) {


                                    list.push({
                                        Uid: Object.values(snapshot.val())[i].Uid,
                                        ImageUrl: Object.values(snapshot.val())[i].ImageUrl,
                                        NickName: Object.values(snapshot.val())[i].NickName,
                                        Name: Object.values(snapshot.val())[i].Name
                                    })

                                }
                            }
                        } setWantedUserList(list);
                    } else {
                        //setWantedUserList({});
                    }
                });
        }

    }

    function renderItemAllPost({ item, index }) {
        return (

            <React.Fragment>
                <PostHeader
                    navigation={navigation}
                    postId={item.PostId}
                    postUserUid={item.PostUserUid}
                />
                <PostMain
                    navigation={navigation}
                    postId={item.PostId}
                />
                <PostActions
                    navigation={navigation}
                    postId={item.PostId}
                    postUserUid={item.PostUserUid}
                />
            </React.Fragment>
        )
    }

    function renderItemWantedUser({ item, index }) {
        return (
            <React.Fragment>
                <WantedUserInfo
                    item={item}
                    navigation={navigation}
                />
            </React.Fragment>
        )
    }

    useEffect(() => {

        getSocialList('');

        return () => {
            setAllPostList({});
            setWantedUserList({});
        }
    }, []);


    return (
        <SafeAreaView style={{
            width: '100%',
            height: '100%',
            backgroundColor: isDarkMode ? Colors.black : Colors.white
        }}>

            <View style={{
                width: '100%',
                padding: '2%'
            }}>

                <TextInput style={{
                    width: '100%',
                    padding: '2%',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    borderRadius: 20,
                    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
                    marginBottom: '2%'
                }}
                    placeholder={
                        moment().locale() == "tr" ?
                            "Kullanıcı Ara" :
                            "Search User"
                    }
                    placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
                    color={isDarkMode ? Colors.white : Colors.black}
                    onChangeText={value => { setWantedUser(value); getSocialList(value); }}
                    value={wantedUser}
                />

            </View>

            {
                wantedUser.length == 0 ?
                    <FlatList
                        data={allPostList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItemAllPost}
                    />
                    :
                    <FlatList
                        data={wantedUserList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItemWantedUser}
                    />
            }

        </SafeAreaView>
    )
}

export default Social