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
import BookInfo from './Book/BookInfo'
import { List } from 'react-native-paper';

const Home = ({ navigation }) => {

  const isDarkMode = useColorScheme() === 'dark';

  const [psychologyBooksData, setPsychologyBooksData] = useState({});
  const [politicalBooksData, setPoliticalBooksData] = useState({});
  const [philosophyBooksData, setPhilosophyBooksData] = useState({});
  const [historyBooksData, setHistoryBooksData] = useState({});
  const [wantedBooksData, setWantedBooksData] = useState({});
  const { user } = useContext(AuthContext);
  const Psychology = 'https://www.googleapis.com/books/v1/volumes?q=subject:psychology&maxResults=40&key=AIzaSyCwKBtsbYyjTxHZkxgAI5tgFRLOrvd2WLk'
  const Political = 'https://www.googleapis.com/books/v1/volumes?q=subject:political&maxResults=40&key=AIzaSyCwKBtsbYyjTxHZkxgAI5tgFRLOrvd2WLk'
  const Philosophy = 'https://www.googleapis.com/books/v1/volumes?q=subject:philosophy&maxResults=40&key=AIzaSyCwKBtsbYyjTxHZkxgAI5tgFRLOrvd2WLk'
  const History = 'https://www.googleapis.com/books/v1/volumes?q=subject:history&maxResults=40&key=AIzaSyCwKBtsbYyjTxHZkxgAI5tgFRLOrvd2WLk'

  const getPsychologyBooks = async () => {
    const response1 = await fetch(Psychology);
    const json = await response1.json();
    setPsychologyBooksData(json.items);
  }

  const getPoliticalBooks = async () => {
    const response2 = await fetch(Political);
    const json = await response2.json();
    setPoliticalBooksData(json.items);
  }

  const getPhilosophyBooks = async () => {
    const response3 = await fetch(Philosophy);
    const json = await response3.json();
    setPhilosophyBooksData(json.items);
  }

  const getHistoryBooks = async () => {
    const response4 = await fetch(History);
    const json = await response4.json();
    setHistoryBooksData(json.items);
  }

  const getWantedBooks = async (search) => {
    if (search != undefined) {
      if (search != '') {
        const Search = `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&key=AIzaSyCwKBtsbYyjTxHZkxgAI5tgFRLOrvd2WLk`
        const response5 = await fetch(Search);
        const json = await response5.json();
        if (json.items != undefined) {
          const list = [];
          for (let i = 0; i < json.items.length; i++) {
            if (json.items[i].volumeInfo.title.includes(search)) {
              list.push(json.items[i]);
            }
          } setWantedBooksData(list)
        } else {

        }

      } else {
        setWantedBooksData(undefined)
      }
    } else {
      setWantedBooksData(undefined)
    }


  }

  function renderItem({ item, index }) {

    return (

      <React.Fragment>
        <BookInfo
          navigation={navigation}
          item={item}
        />
      </React.Fragment>

    )

  }

  useEffect(() => {

    getPsychologyBooks();
    getPoliticalBooks();
    getPhilosophyBooks();
    getHistoryBooks();
    getWantedBooks();

    return () => {
      setHistoryBooksData({});
      setPhilosophyBooksData({});
      setPoliticalBooksData({});
      setPsychologyBooksData({});
      setWantedBooksData({});
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
        padding: '2%',
        marginBottom: '11%'
      }}>

        <TextInput
          style={{
            width: '96%',
            padding: '2%',
            paddingLeft: '5%',
            paddingRight: '5%',
            marginLeft: '1%',
            marginRight: '1%',
            marginBottom: '1%',
            borderRadius: 50,
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
          }}
          placeholder={
            moment().locale() == "tr" ?
              "Kitap Ara" :
              "Search Book"
          }
          onChangeText={value => {

            getWantedBooks(value);

          }}
        />

        {
          wantedBooksData == undefined ?
            <ScrollView>
              <Text style={{
                color: isDarkMode ? Colors.white : Colors.black,
                marginBottom: '2%',
                fontWeight: 'bold',
                fontSize: 20
              }}>
                {
                  moment().locale() == "tr" ?
                    "Psikoloji" :
                    "Psychology"
                }
              </Text>

              {
                psychologyBooksData == undefined ?
                  <Text style={{
                    color: isDarkMode ? Colors.white : Colors.black,
                    textAlign: 'center'
                  }}>
                    {
                      moment().locale() == "tr" ?
                        "Üzgünüz Bir Hata Oluştu" :
                        "Sorry An Error Occurred"
                    }
                  </Text> :
                  <FlatList
                    horizontal
                    data={psychologyBooksData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                  />
              }

              <Text style={{
                color: isDarkMode ? Colors.white : Colors.black,
                marginBottom: '2%',
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: '5%'
              }}>
                {
                  moment().locale() == "tr" ?
                    "Siyasi" :
                    "Political"
                }
              </Text>

              {
                politicalBooksData == undefined ?
                  <Text style={{
                    color: isDarkMode ? Colors.white : Colors.black,
                    textAlign: 'center'
                  }}>
                    {
                      moment().locale() == "tr" ?
                        "Üzgünüz Bir Hata Oluştu" :
                        "Sorry An Error Occurred"
                    }
                  </Text> :
                  <FlatList
                    horizontal
                    data={politicalBooksData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                  />
              }

              <Text style={{
                color: isDarkMode ? Colors.white : Colors.black,
                marginBottom: '2%',
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: '5%'
              }}>
                {
                  moment().locale() == "tr" ?
                    "Felsefe" :
                    "Philosophy"
                }
              </Text>

              {
                philosophyBooksData == undefined ?
                  <Text style={{
                    color: isDarkMode ? Colors.white : Colors.black,
                    textAlign: 'center'
                  }}>
                    {
                      moment().locale() == "tr" ?
                        "Üzgünüz Bir Hata Oluştu" :
                        "Sorry An Error Occurred"
                    }
                  </Text> :
                  <FlatList
                    horizontal
                    data={philosophyBooksData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                  />
              }

              <Text style={{
                color: isDarkMode ? Colors.white : Colors.black,
                marginBottom: '2%',
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: '5%'
              }}>
                {
                  moment().locale() == "tr" ?
                    "Tarih" :
                    "History"
                }
              </Text>

              {
                historyBooksData == undefined ?
                  <Text style={{
                    color: isDarkMode ? Colors.white : Colors.black,
                    textAlign: 'center',
                    marginBottom: '10%'
                  }}>
                    {
                      moment().locale() == "tr" ?
                        "Üzgünüz Bir Hata Oluştu" :
                        "Sorry An Error Occurred"
                    }
                  </Text> :
                  <FlatList
                    horizontal
                    data={historyBooksData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                  />
              }

            </ScrollView>
            : wantedBooksData.length == 0 &&
            <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: isDarkMode ? Colors.white : Colors.black
            }}>
              {
                moment().locale() == "tr" ?
                  "Aradığınız Kitap Bulunamadı" :
                  "The Book You Are Looking For Could Not Be Found"
              }
            </Text> ||
            <FlatList
              numColumns={2}
              data={wantedBooksData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
        }

      </View>

    </SafeAreaView>
  )
}

export default Home