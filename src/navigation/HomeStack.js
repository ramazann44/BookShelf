import { useColorScheme, View, Text, AppState, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import database from '@react-native-firebase/database'
import { AuthContext } from './AuthProvider'
import { mainColor, sideColor } from '../utils/ThemeColors'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconII from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home/Home'
import FavoriteBooks from '../screens/Home/Favorite/FavoriteBooks'
import Social from '../screens/Home/Social'
import Profile from '../screens/Home/Profile/Profile'
import ProfileEdit from '../screens/Home/Profile/ProfileEdit'
import AddPost from '../screens/Home/AddPost'
import PostDetails from '../screens/Home/PostDetails/PostDetails'
import TargetUserProfile from '../screens/Home/TargetUser/TargetUserProfile'
import BookDetails from '../screens/Home/Book/BookDetails'
import PostComments from '../screens/Home/PostComment/PostComments'

const HomeStack = () => {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const [currentUser, setCurrentUser] = useState({})

  const { user } = useContext(AuthContext);
  const [aState, setAppState] = useState(AppState.currentState);

  const getCurrentUser = () => {

    const reference = database().ref('/BookShelf/userList/' + user.uid);

    reference
      .on('value', snapshot => {

        setCurrentUser(snapshot.val());

      });

  }

  useEffect(() => {
    getCurrentUser();
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {

        if (nextAppState == "active") {

          const activeReference = database().ref('/BookShelf/userList/' + user.uid);

          activeReference
            .update({
              OnlineStatus: true
            });


          setAppState(nextAppState);

        } else {

          const inactiveReference = database().ref('/BookShelf/userList/' + user.uid);

          inactiveReference
            .update({
              OnlineStatus: false
            });

          setAppState(nextAppState);

        }

      },
    );
    return () => {
      appStateListener?.remove();
    };
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const TabStack = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              return <IconFA5 name='home' color={focused ? mainColor : isDarkMode && Colors.white || Colors.black} size={30} />
            } else if (route.name === 'Social') {
              return <IconMCI name='account-group' color={focused ? mainColor : isDarkMode && Colors.white || Colors.black} size={30} />
            } else if (route.name === 'FavoriteBooks') {
              return <IconII name='heart' color={focused ? mainColor : isDarkMode && Colors.white || Colors.black} size={30} />
            } else {
              return <FastImage
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  borderWidth: 1,
                  borderColor: isDarkMode ? Colors.white : Colors.black
                }}
                source={{
                  uri: currentUser.ImageUrl,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            }
          },
          tabBarActiveTintColor: mainColor,
          tabBarInactiveTintColor: '#aaa',
          headerShown: false,
          tabBarStyle: { backgroundColor: isDarkMode ? Colors.black : Colors.white },
          tabBarHideOnKeyboard: true
        })} >
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            headerShown: false,
            tabBarShowLabel: false
          }} />
        <Tab.Screen
          name='Social'
          component={Social}
          options={{
            headerShown: false,
            tabBarShowLabel: false
          }}
        />
        <Tab.Screen
          name='FavoriteBooks'
          component={FavoriteBooks}
          options={{
            headerShown: false,
            tabBarShowLabel: false
          }} />
        <Tab.Screen
          name='Profile'
          component={Profile}
          options={{
            headerShown: false,
            tabBarShowLabel: false
          }} />
      </Tab.Navigator>
    )
  }
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name='HomeScreen'
          component={TabStack}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name='FavoriteBooks'
          component={FavoriteBooks}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name='Social'
          component={Social}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name='ProfileEdit'
          component={ProfileEdit}
          options={{
            title: moment().locale() == "tr" ?
              "Profili Düzenle"
              :
              "Profile Edit",
            headerTintColor: mainColor,
            headerStyle: {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }
          }}
        />

        <Stack.Screen
          name='AddPost'
          component={AddPost}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name='PostDetails'
          component={PostDetails}
          options={{
            title: moment().locale() == "tr" ?
              "Gönderi Detayı"
              :
              "Post Detail",
            headerTintColor: mainColor,
            headerStyle: {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }
          }}
        />

        <Stack.Screen
          name='TargetUserProfile'
          component={TargetUserProfile}
          options={{
            title: moment().locale() == "tr" ?
              "Kullanıcı Profili"
              :
              "User Profile",
            headerTintColor: mainColor,
            headerStyle: {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }
          }}
        />

        <Stack.Screen
          name='BookDetails'
          component={BookDetails}
          options={{
            title: moment().locale() == "tr" ?
              "Kitap Detayı"
              :
              "Book Detail",
            headerTintColor: mainColor,
            headerStyle: {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }
          }}
        />

        <Stack.Screen
          name='PostComments'
          component={PostComments}
          options={{
            title: moment().locale() == "tr" ?
              "Gönderi Yorumları"
              :
              "Post Comments",
            headerTintColor: mainColor,
            headerStyle: {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

export default HomeStack
/*
<Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          
        }} />

      <Tab.Screen
        name="DiscoverStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false
        }} />

      <Tab.Screen
        name="ProfileStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false
        }} />
*/