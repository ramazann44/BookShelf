import { TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import database from '@react-native-firebase/database'
import FastImage from 'react-native-fast-image'
import { AuthContext } from '../../../navigation/AuthProvider'

const ProfilePostInfo = ({ navigation, postId }) => {

    const isDarkMode = useColorScheme() === 'dark';

    const { user } = useContext(AuthContext);
    const [postInfo, setPostInfo] = useState({});

    const getPostInfo = () => {

        const reference = database().ref('/BookShelf/usersPosts/' + user.uid + "/" + postId);

        reference
            .once('value')
            .then(snapshot => {

                setPostInfo(snapshot.val());

            });

    }

    useEffect(() => {

        getPostInfo();

        return () => {
            setPostInfo({})
        }

    }, [])


    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("PostDetails", {
                postId: postId
            });
        }} style={{
            width: '31.3%',
            marginHorizontal:'1%',
            marginBottom:'1%'
        }}>
            <FastImage
                style={{
                    width: '100%',
                    height: 150,
                }}
                source={{
                    uri: postInfo.BookImageUrl,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}

            />
        </TouchableOpacity>
    )
}

export default ProfilePostInfo