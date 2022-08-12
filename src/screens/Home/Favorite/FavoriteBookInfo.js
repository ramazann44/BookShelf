import { useColorScheme, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button, FlatList } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import { Formik, validateYupSchema } from 'formik'
import * as yup from 'yup'
import BottomNavigator from '../BottomNavigator'
import IconE from 'react-native-vector-icons/Entypo'
import { mainColor, sideColor } from '../../../utils/ThemeColors'
import { AuthContext } from '../../../navigation/AuthProvider'
import database from '@react-native-firebase/database'
import FastImage from 'react-native-fast-image'

const FavoriteBookInfo = ({ navigation, item }) => {

    const isDarkMode = useColorScheme() === 'dark';

    const { user } = useContext(AuthContext);
    const [myLoop, setMyLoop] = useState({})

    function renderAuthors() {
        var myloop = [];
        for (let i = 0; i < item.volumeInfo.authors.length; i++) {
            if (i + 1 > 0) {
                myloop.push(
                    " " + item.volumeInfo.authors[i]
                );
            } else {
                myloop.push(
                    item.volumeInfo.authors[i]
                );
            }
        } setMyLoop(myloop);
    }

    function deleteFavoriteBook() {

        const reference = database().ref("/BookShelf/FavoriteBooks/" + user.uid + "/" + item.id);
        reference.remove();

    }

    useEffect(() => {
        if (item.volumeInfo.authors.length > 1) {
            renderAuthors();
        }

        return () => {
            setMyLoop({})
        }
    }, [])

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("BookDetails", {
                item: item
            })
        }} style={{
            width: '96%',
            margin: '2%',
            flexDirection: 'row'
        }}>

            <FastImage style={{
                width: '20%',
                marginRight: '5%',
                height: 100
            }}
                source={{
                    uri: item.volumeInfo.imageLinks != undefined ?
                        item.volumeInfo.imageLinks.thumbnail :
                        "https://spsajans.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png",
                    priority: FastImage.priority.normal
                }}
                resizeMode={FastImage.resizeMode.cover}
            />

            <View style={{
                justifyContent: 'center',
                width: '60%'
            }}>
                <Text style={{
                    color: mainColor,
                    fontWeight: 'bold',
                    maxHeight:40
                }}>
                    {item.volumeInfo.authors.length > 1 ?
                        "" + myLoop :
                        item.volumeInfo.authors
                    }
                </Text>

                <Text style={{
                    color: isDarkMode ? Colors.white : Colors.black,
                    fontWeight: 'bold',
                    maxHeight:40
                }}>
                    {item.volumeInfo.title}
                </Text>
            </View>

            <TouchableOpacity onPress={() => {
                deleteFavoriteBook();
            }} style={{
                justifyContent: 'center',
                marginLeft: '5%'
            }}>
                <IconE
                    name='trash'
                    color={'#f00'}
                    size={24} />
            </TouchableOpacity>

        </TouchableOpacity>
    )
}

export default FavoriteBookInfo