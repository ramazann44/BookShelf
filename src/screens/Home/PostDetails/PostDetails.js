import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { AuthContext } from '../../../navigation/AuthProvider'
import database from '@react-native-firebase/database'

import PostHeader from '../Post/PostHeader'
import PostMain from '../Post/PostMain';
import PostActions from '../Post/PostActions';

const color = '#aaa';

const PostDetails = ({ navigation, route }) => {

  const isDarkMode = useColorScheme() === 'dark';

  const { user } = useContext(AuthContext);
  const [postInfo, setPostInfo] = useState({});
  const { postId } = route.params;


  const getPostInfo = () => {

    const reference = database().ref('/BookShelf/Posts/' + postId);

    reference
      .on('value', snapshot => {

        setPostInfo(snapshot.val());

      });

  }

  useEffect(() => {

    getPostInfo();

    return () => {
      setPostInfo({})
    }

  }, [postId])

  if (postInfo.PostUserUid != undefined) {

    return (
      <SafeAreaView style={{
        height: '100%',
        backgroundColor: isDarkMode ? Colors.black : Colors.white
      }}>
        
        <React.Fragment>
          <PostHeader
            navigation={navigation}
            postId={postId}
            postUserUid={postInfo.PostUserUid}
          />
          <PostMain
            navigation={navigation}
            postId={postId}
          />
          <PostActions
            navigation={navigation}
            postId={postId}
            postUserUid={postInfo.PostUserUid}
          />
        </React.Fragment>

      </SafeAreaView>
    )

  }else {
    <SafeAreaView style={{
      height: '100%',
      backgroundColor: isDarkMode ? Colors.black : Colors.white
    }}></SafeAreaView>
  }

}

export default PostDetails