import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import { Formik, validateYupSchema } from 'formik'
import * as yup from 'yup'
import { mainColor, sideColor } from '../../../utils/ThemeColors'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
import database from '@react-native-firebase/database'
import { AuthContext } from '../../../navigation/AuthProvider'
import ImageZoom from 'react-native-image-pan-zoom'

const PostMain = ({ navigation, postId }) => {

    const isDarkMode = useColorScheme() === 'dark';

    const { user } = useContext(AuthContext);
    const [postInfo, setPostInfo] = useState({})

    const getPostInfo = () => {

        const reference = database().ref('/BookShelf/Posts/' + postId);

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

    }, [postId]);

    return (
        <View style={{
            width: '100%',
        }}>
            <ImageZoom cropWidth={Dimensions.get('window').width}
                cropHeight={450}
                imageWidth={Dimensions.get('window').width}
                imageHeight={450}>
                <FastImage style={{
                    width: '100%',
                    height: 450
                }}
                    source={{
                        uri: postInfo.BookImageUrl,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </ImageZoom>
            <View style={{
                paddingLeft: '2%',
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    color: isDarkMode ? Colors.white : Colors.black
                }}>
                    {
                        moment().local() == "tr" ?
                            "Kitap Adı: " :
                            "Book Name: "
                    }
                </Text>
                <Text style={{
                    color: isDarkMode ? Colors.white : Colors.black
                }}>
                    {postInfo.BookName}
                </Text>
            </View>
            <View style={{
                paddingLeft: '2%',
            }}>

                <Text style={{
                    color: isDarkMode ? Colors.white : Colors.black
                }}>
                    {postInfo.BookText}
                </Text>
            </View>

        </View>
    )
}

export default PostMain