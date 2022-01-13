import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';

const Post = ({post, pressable, setSelectedPost, setShowSelectedPost}) => {
  const {title, description, time} = post;
  return (
    <TouchableHighlight
      onPress={() => {
        if (pressable) {
          setShowSelectedPost(true);
          setSelectedPost(post);
        }
      }}
      underlayColor="gray"
      style={{
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        borderRadius: 10,
      }}>
      <View style={styles.container}>
        <View style={{minHeight: '75%'}}>
          <Text style={styles.title}>{title}</Text>
          <Text>{description}</Text>
        </View>
        <View>
          <Text>
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }).format(time)}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginLeft: 20,
    // marginRight: 20,
    // marginTop: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
    height: 170,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
});
export default Post;
