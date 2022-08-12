import { useColorScheme, View, Text, FlatList } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import TargetUserPostInfo from './TargetUserPostInfo'

const TargetUserPost = ({ navigation, postList, targetUserId }) => {

  const isDarkMode = useColorScheme() === 'dark';

  function renderItem({ item, index }) {

    return (
      <React.Fragment>
        <TargetUserPostInfo
          navigation={navigation}
          postId={item.PostId}
          targetUserId={targetUserId}
        />
      </React.Fragment>
    )

  }

  return (
    <View>
      {
        postList.length == undefined &&
        <View style={{ width: '100%', position: 'absolute', alignItems: 'center', marginTop: '100%' }}>
          <Text style={{ fontSize: 24, color: isDarkMode ? Colors.white : Colors.black, textAlign: 'center' }}>
            {
              moment().locale() == "tr" ?
                "Kullanıcının Henüz Hiçbir Gönderisi Bulunmamaktadır."
                :
                "The User Has No Posts Yet."
            }
          </Text>
        </View>
        ||
        <FlatList
        style={{ marginTop: '1%', width: '100%',height:'68%' }}
          data={postList}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      }
    </View>
  )
}

export default TargetUserPost