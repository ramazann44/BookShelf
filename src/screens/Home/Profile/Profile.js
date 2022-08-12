import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import database from '@react-native-firebase/database'
import FastImage from 'react-native-fast-image'
import { mainColor, sideColor } from '../../../utils/ThemeColors'
import { AuthContext } from '../../../navigation/AuthProvider'
import IconOI from 'react-native-vector-icons/Octicons'
import IconII from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomNavigator from '../BottomNavigator'
import ProfilePostInfo from './ProfilePostInfo'

const Profile = ({ navigation }) => {

  const isDarkMode = useColorScheme() === 'dark';

  const { user, signOut } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [userPostsList, setUserPostsList] = useState({});

  const getCurrentUser = () => {

    const reference = database().ref('/BookShelf/userList/' + user.uid);

    reference
      .on('value', snapshot => {

        setCurrentUser(snapshot.val());

      });

  }

  const getUserPosts = () => {

    const reference = database().ref('/BookShelf/usersPosts/' + user.uid);

    reference.on('value', snapshot => {
      const list = [];
      const listt = [];
      if (snapshot.val() != null) {

        snapshot.forEach(c => {
          const i = c.val();
          list.push(i);

        });

        for (let i = list.length; i > 0; i--) {

          listt.push(list[i - 1]);

        }

        setUserPostsList(listt);

      } else {
        setUserPostsList({})
      }

    });

  }

  function renderItem({ item, index }) {
    return (
      <React.Fragment>
        <ProfilePostInfo
          postId={item.PostId}
          navigation={navigation}
        />
      </React.Fragment>
    )
  }


  useEffect(() => {
    getCurrentUser();
    getUserPosts();

    return () => {
      setCurrentUser({});
      setUserPostsList({})
    }
  }, []);


  return (
    <SafeAreaView style={{
      width: '100%',
      height: '100%',
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
    }}>

      <View style={{
        width: '100%',
        padding: '2%'
      }}>

        <View style={{
          width: '100%',
          flexDirection: 'row',
          paddingLeft: '1%',
          paddingRight: '1%'
        }}>

          <View style={{
            flex: 3,
          }}>

            <Text style={{
              color: isDarkMode ? Colors.white : Colors.black,
              fontSize: 24
            }}>
              {currentUser.NickName}
            </Text>

          </View>

          <View style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row'
          }}>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddPost")
              }}
              style={{
                flex: 1,
                alignItems: 'center'
              }}>

              <IconII name='add-circle-outline' size={24} color={isDarkMode ? Colors.white : Colors.black} />

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                signOut()
              }}
              style={{
                flex: 1,
                alignItems: 'center'
              }}>

              <IconOI name='sign-out' size={24} color={isDarkMode ? Colors.white : Colors.black} />

            </TouchableOpacity>

          </View>


        </View>

        <View style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>

          <FastImage
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginLeft: '15%',
              marginRight: '15%',
              borderWidth: 1,
              borderColor: isDarkMode ? Colors.white : Colors.black
            }}
            source={{
              uri: currentUser.ImageUrl,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />


        </View>

        <View style={{
          width: '98%',
          margin: '1%'
        }}>

          <Text style={{
            color: isDarkMode ? Colors.white : Colors.black,
            fontWeight: 'bold'
          }}>
            {currentUser.Name}
          </Text>

          {
            currentUser.Biography != "" &&
            <Text style={{
              color: isDarkMode ? Colors.white : Colors.black,
            }}>
              {currentUser.Biography}
            </Text>
          }

          {
            currentUser.WebSite != "" &&
            <TouchableOpacity onPress={() => {
              Linking.openURL(currentUser.WebSite);
            }}>
              <Text style={{
                color: isDarkMode ? '#00a8ff' : '#00f',
              }}>
                {currentUser.WebSite}
              </Text>
            </TouchableOpacity>
          }

          <TouchableOpacity style={{
            width: '100%',
            marginTop: '2%',
            backgroundColor: mainColor,
            padding: 10,
            justifyContent: 'center',
            borderRadius: 50
          }} onPress={() => {
            navigation.navigate("ProfileEdit");
          }}>
            <Text style={{
              color: '#fff',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              {
                moment().locale() == "tr" ?
                  "Profili Güncelle"
                  :
                  "Edit Profile"
              }
            </Text>
          </TouchableOpacity>

        </View>


        <View style={{
          width: '98%',
          margin: '1%'
        }}>
          <Text style={{
            color: isDarkMode ? Colors.white : Colors.black,
            fontWeight: 'bold'
          }}>
            {
              moment().locale() == "tr" ?
                currentUser.Post + "  Gönderi"
                :
                currentUser.Post + "  Post"
            }
          </Text>
        </View>


        {
          userPostsList.length == undefined ?
            <View style={{ width: '100%', position: 'absolute', alignItems: 'center', marginTop: '100%' }}>
              <Text style={{ fontSize: 24, color: isDarkMode ? Colors.white : Colors.black, textAlign: 'center' }}>Henüz Hiçbir Gönderiniz Bulunmamaktadır.</Text>
            </View>
            :
            <FlatList
              style={{ marginTop: '1%', width: '100%' }}
              data={userPostsList}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
        }

      </View>

    </SafeAreaView>
  )
}

export default Profile