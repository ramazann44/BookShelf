import { View, Text, SafeAreaView, useColorScheme, TouchableOpacity, Dimensions, ScrollView, FlatList, Linking } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import FastImage from 'react-native-fast-image'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import { mainColor, sideColor } from '../../../utils/ThemeColors'
import moment from 'moment'
import database from '@react-native-firebase/database'
import { AuthContext } from '../../../navigation/AuthProvider'

const BookDetails = ({ navigation, route }) => {

    const isDarkMode = useColorScheme() === 'dark';

    const { user } = useContext(AuthContext);
    const { item } = route.params;
    const [myLoop, setMyLoop] = useState({})
    const [isFavoriteBook, setIsFavoriteBook] = useState(false)

    function renderAuthors() {
        var myloop = [];
        for (let i = 0; i < item.volumeInfo.authors.length; i++) {
            if (i + 1 == item.volumeInfo.authors.length) {
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

    function favoriteControl() {

        const reference = database().ref("/BookShelf/FavoriteBooks/" + user.uid + "/" + item.id);
        reference
            .on('value', snapshot => {

                if (snapshot.val() != null) {
                    setIsFavoriteBook(true);
                } else {
                    setIsFavoriteBook(false);
                }

            });

    }

    function addFavorite() {

        if (isFavoriteBook) {
            const reference1 = database().ref("/BookShelf/FavoriteBooks/" + user.uid + "/" + item.id);
            reference1.remove();
            favoriteControl();
        } else {
            const reference2 = database().ref("/BookShelf/FavoriteBooks/" + user.uid + "/" + item.id);
            reference2.set(item);
            favoriteControl();
        }

    }

    useEffect(() => {

        if (item.volumeInfo.authors.length > 1) {
            renderAuthors();
        }

        favoriteControl();

        return () => {
            setMyLoop({})
            setIsFavoriteBook(false)
        }
    }, [])


    return (
        <SafeAreaView style={{
            width: '100%',
            height: '100%',
            padding: '2%',
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>


            <ScrollView style={{
                width: '100%'
            }}>
                <FastImage style={{
                    width: '100%',
                    height: 450
                }}
                    source={{
                        uri: item.volumeInfo.imageLinks != undefined ?
                            item.volumeInfo.imageLinks.thumbnail :
                            "https://spsajans.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png",
                        priority: FastImage.priority.normal
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />


                <View style={{
                    width: '100%',
                    marginVertical: '2%',
                    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
                    padding: '2%',
                    borderRadius: 10,
                    justifyContent: 'center'
                }}>

                    <Text style={{
                        color: mainColor,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '2%'
                    }}>
                        {item.volumeInfo.authors.length > 1 ?
                            "" + myLoop :
                            item.volumeInfo.authors
                        }
                    </Text>

                    <Text style={{
                        color: isDarkMode ? Colors.white : Colors.black,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>
                        {item.volumeInfo.title}
                    </Text>

                </View>

                <View style={{
                    width: '100%',
                    marginVertical: '2%',
                    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
                    padding: '2%',
                    borderRadius: 10,
                    justifyContent: 'center'
                }}>

                    <Text style={{
                        fontWeight: 'bold',
                        color: isDarkMode ? Colors.white : Colors.black
                    }}>
                        Description
                    </Text>
                    <Text style={{
                        color: isDarkMode ? Colors.white : Colors.black
                    }}>
                        {
                            item.volumeInfo.description != undefined ?
                                item.volumeInfo.description :
                                moment().locale() == "tr" &&
                                "Tanım Bulunamadı." ||
                                "Definition Not Found"
                        }
                    </Text>

                </View>

            </ScrollView>


            {
                item.saleInfo.saleability == "FOR_SALE" ?
                    <View style={{
                        marginTop: '1%',
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(item.saleInfo.buyLink)
                        }} style={{
                            width: '48%',
                            marginRight: '2%',
                            backgroundColor: mainColor,
                            padding: '2%',
                            borderRadius: 5
                        }}>
                            <Text style={{
                                color: Colors.white,
                                textAlign: 'center'
                            }}>
                                {
                                    moment().locale() == "tr" ?
                                        "Satın Al" : "Buy"
                                }
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            addFavorite();
                        }} style={{
                            width: '48%',
                            marginLeft: '2%',
                            backgroundColor: mainColor,
                            padding: '2%',
                            borderRadius: 5
                        }}>
                            <Text style={{
                                color: Colors.white,
                                textAlign: 'center'
                            }}>
                                {
                                    isFavoriteBook ?
                                        moment().locale() == "tr" ?
                                            "Favorilerden Sil" : "Delete From Favorites"
                                        :
                                        moment().locale() == "tr" ?
                                            "Favorilere Ekle" : "Add To Favorites"
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{
                        marginTop: '1%',
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity onPress={() => {
                            addFavorite();
                        }} style={{
                            width: '100%',
                            backgroundColor: mainColor,
                            padding: '2%',
                            borderRadius: 5
                        }}>
                            <Text style={{
                                color: Colors.white,
                                textAlign: 'center'
                            }}>
                                {
                                    isFavoriteBook ?
                                        moment().locale() == "tr" ?
                                            "Favorilerden Sil" : "Delete From Favorites"
                                        :
                                        moment().locale() == "tr" ?
                                            "Favorilere Ekle" : "Add To Favorites"
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
            }




        </SafeAreaView >
    )
}

export default BookDetails