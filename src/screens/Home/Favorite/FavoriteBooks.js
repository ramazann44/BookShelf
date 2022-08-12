import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Button, FlatList } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import { Formik, validateYupSchema } from 'formik'
import * as yup from 'yup'
import BottomNavigator from '../BottomNavigator'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import { mainColor, sideColor } from '../../../utils/ThemeColors'
import { AuthContext } from '../../../navigation/AuthProvider'
import database from '@react-native-firebase/database'
import FavoriteBookInfo from './FavoriteBookInfo'

const FavoriteBooks = ({ navigation }) => {

  const isDarkMode = useColorScheme() === 'dark';

  const [favoriteBooks, setFavoriteBooks] = useState({})
  const { user } = useContext(AuthContext);

  function getFavoriteBooks(wantedFavorite) {

    if (wantedFavorite == '') {
      const reference1 = database().ref("/BookShelf/FavoriteBooks/" + user.uid);
      reference1
        .on('value', snapshot => {
          if (snapshot.val() != null) {
            setFavoriteBooks(Object.values(snapshot.val()));
          } else {
            setFavoriteBooks({});
          }
        });
    } else {
      const reference2 = database().ref("/BookShelf/FavoriteBooks/" + user.uid);
      reference2
        .on('value', snapshot => {
          const list = [];
          if (snapshot.val() != null) {

            for (let i = 0; i < Object.values(snapshot.val()).length; i++) {
              if (Object.values(snapshot.val())[i].volumeInfo.title.includes(wantedFavorite)) {

                list.push(Object.values(snapshot.val())[i]);

              }
            } setFavoriteBooks(list);

          } else {
            //setFavoriteBooks({});
          }
        });
    }


  }

  function renderItem({ item, index }) {

    return (
      <React.Fragment>
        <FavoriteBookInfo
          navigation={navigation}
          item={item}
        />
      </React.Fragment>
    )

  }

  useEffect(() => {

    getFavoriteBooks('');

    return () => {
      setFavoriteBooks({});
    }
  }, [])


  return (
    <SafeAreaView style={{
      width: '100%',
      height: '100%',
      backgroundColor: isDarkMode ? Colors.black : Colors.white
    }}>

      <TextInput style={{
        width: '96%',
        padding: '2%',
        paddingLeft: '5%',
        paddingRight: '5%',
        borderRadius: 20,
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        margin: '2%'
      }}
        placeholder={
          moment().locale() == "tr" ?
            "Favorilerde Ara" :
            "Search in Favorites"
        }
        placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
        color={isDarkMode ? Colors.white : Colors.black}
        onChangeText={value => { getFavoriteBooks(value); }}
      />

      {
        favoriteBooks.length == undefined ?
          <Text style={{
            width: '96%',
            position: 'absolute',
            top: '50%',
            color: isDarkMode ? Colors.white : Colors.black,
            fontSize:24,
            textAlign:'center',
            margin:'2%'
          }}>
            {
              moment().locale() == "tr" ?
                "Henüz Favoriye Eklemiş Olduğunuz Bir Kitap Bulunmamaktadır." :
                "There Is No Book You Have Added To Favorites Yet."
            }
          </Text>
          :
          <FlatList
            data={favoriteBooks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
      }

    </SafeAreaView>
  )
}

export default FavoriteBooks