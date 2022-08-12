import { View, Text, useColorScheme, TouchableOpacity } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const BookInfo = ({ navigation, item }) => {

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("BookDetails", {
                item: item
            })
        }} style={{
            padding: 15,
            borderWidth: 1,
            borderColor: isDarkMode ? Colors.dark : Colors.light,
            borderRadius: 10,
            margin: 5,
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        }}>
            <FastImage style={{
                width: 150,
                height: 200
            }}
                source={{
                    uri: item.volumeInfo.imageLinks != undefined ?
                        item.volumeInfo.imageLinks.thumbnail :
                        "https://spsajans.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png",
                    priority: FastImage.priority.normal
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={{
                width: 150,
                height: 40,
                color: isDarkMode ? Colors.white : Colors.black
            }}>
                {
                    item.volumeInfo.title
                }
            </Text>
        </TouchableOpacity>
    )
}

export default BookInfo