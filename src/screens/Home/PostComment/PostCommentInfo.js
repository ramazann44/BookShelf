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
import FastImage from 'react-native-fast-image'

const PostCommentInfo = ({ navigation, item, postOwner, postId }) => {

  const isDarkMode = useColorScheme() === 'dark';
  const { user } = useContext(AuthContext);
  const [postInfo, setPostInfo] = useState({});
  const [postOwnerInfo, setPostOwnerInfo] = useState({});
  const [commentText, setCommentText] = useState('');
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  function getPostOwnerInfo() {

    const reference = database().ref("/BookShelf/userList/" + item.CommentOwner);
    reference
      .once('value')
      .then(snapshot => {

        if (snapshot.val() != null) {
          setPostOwnerInfo(snapshot.val());
        } else {
          setPostOwnerInfo({});
        }
      });

  }

  const getPostInfo = () => {

    const reference = database().ref('/BookShelf/Posts/' + postId);

    reference
      .on('value', snapshot => {

        setPostInfo(snapshot.val());

      });

  }

  function deleteComment() {

    const reference1 = database().ref("/BookShelf/PostComments/" + postId + "/" + item.CommentId);
    reference1.remove();

    const reference2 = database().ref("/BookShelf/Posts/" + postId);
    reference2.update({
      PostComment: postInfo.PostComment - 1,
    });

    const reference3 = database().ref("/BookShelf/usersPosts/" + postInfo.PostUserUid + "/" + postId);
    reference3.update({
      PostComment: postInfo.PostComment - 1,
    });

  }

  useEffect(() => {

    getPostInfo();
    getPostOwnerInfo();

    return () => {
      setPostInfo({});
      setPostOwnerInfo({});
    }
  }, [item.CommentOwner])


  return (
    <View style={{
      marginBottom: '5%',
      width: '100%',
    }}>

      <View style={{
        width: '100%',
        flexDirection: 'row'
      }}>

        {
          item.CommentOwner == user.uid ?
            <TouchableOpacity onPress={() => {
              deleteComment();
            }} style={{
              position: 'absolute',
              right: 0,
              top: 0
            }}>
              <Text style={{
                color: '#f00',
              }}>
                {
                  moment().locale() == "tr" ?
                    "Sil" : "Delete"
                }
              </Text>
            </TouchableOpacity>
            :
            postOwner == user.uid &&
            <TouchableOpacity onPress={() => {
              deleteComment();
            }} style={{
              position: 'absolute',
              right: 0,
              top: 0
            }}>
              <Text style={{
                color: '#f00',
              }}>
                {
                  moment().locale() == "tr" ?
                    "Sil" : "Delete"
                }
              </Text>
            </TouchableOpacity>
        }

        {
          item.CommentOwner == user.uid ?
            <View style={{
              width: '10%',
              height: 40,
              marginRight: '2%',
            }}>
              <FastImage
                style={{
                  width: '100%',
                  height: 40,
                  borderRadius: 50,
                }}
                source={{
                  uri: postOwnerInfo.ImageUrl,
                  priority: FastImage.priority.normal
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            :
            <TouchableOpacity onPress={() => {
              navigation.navigate("TargetUserProfile", {
                targetUserId: item.CommentOwner
              })
            }} style={{
              width: '10%',
              height: 40,
              marginRight: '2%',
            }}>
              <FastImage
                style={{
                  width: '100%',
                  height: 40,
                  borderRadius: 50,
                }}
                source={{
                  uri: postOwnerInfo.ImageUrl,
                  priority: FastImage.priority.normal
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
        }

        <View style={{
          width: '80%',
          justifyContent: 'center'
        }}>

          {
            item.CommentOwner == user.uid ?
              <View style={{
                height: 20,
              }}>
                <Text style={{
                  color: isDarkMode ? Colors.white : Colors.black,
                  fontWeight: 'bold',
                  height: 20
                }}>
                  {postOwnerInfo.NickName}
                </Text>
              </View>
              :
              <TouchableOpacity onPress={() => {
                navigation.navigate("TargetUserProfile", {
                  targetUserId: item.CommentOwner
                })
              }} style={{
                height: 20,
              }}>
                <Text style={{
                  color: isDarkMode ? Colors.white : Colors.black,
                  fontWeight: 'bold',
                  height: 20
                }}>
                  {postOwnerInfo.NickName}
                </Text>
              </TouchableOpacity>
          }

          <Text style={{
            color: isDarkMode ? Colors.white : Colors.black,
          }}>
            {item.CommentText}
          </Text>

        </View>

      </View>

      <Text style={{
        color: isDarkMode ? Colors.light : Colors.dark,
        textAlign: 'right'
      }}>
        {
          item.CommentMonth == month ?
            moment(item.CommentFullDate, "YYYYMMDD, h:mm:ss").fromNow()
            :
            item.CommentDate
        }
      </Text>

    </View>
  )
}

export default PostCommentInfo