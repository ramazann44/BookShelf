import { useColorScheme, View, Text, FlatList } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import TargetUserFavoriteBookInfo from './TargetUserFavoriteBookInfo'

const TargetUserFavoriteBooks = ({ navigation, favoriteBooksList }) => {

    function renderItem({ item, index }) {

        return (
            <React.Fragment>
                <TargetUserFavoriteBookInfo
                    navigation={navigation}
                    item={item}
                />
            </React.Fragment>
        )

    }

    return (
        <View>
            {
                favoriteBooksList.length == undefined &&
                <View style={{ width: '100%', position: 'absolute', alignItems: 'center', marginTop: '100%' }}>
                    <Text style={{ fontSize: 24, color: isDarkMode ? Colors.white : Colors.black, textAlign: 'center' }}>
                        {
                            moment().locale() == "tr" ?
                                "Kullanıcının Henüz Favori Kitabı Yok."
                                :
                                "The User Has No Favorite Book Yet."
                        }
                    </Text>
                </View>
                ||
                <FlatList
                    style={{ marginTop: '1%', width: '100%',height:'68%' }}
                    data={favoriteBooksList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            }
        </View>
    )
}

export default TargetUserFavoriteBooks