import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';

const Request = ({request, setSelectedReqest, setShowSelectedReqest}) => {
  const {name, description, contact} = request;
  return (
    <TouchableHighlight
      onPress={() => {
        setSelectedReqest(request);
        setShowSelectedReqest(true);
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
        <Text style={styles.title}>{name}</Text>
        <Text>{description}</Text>
        <Text>{contact}</Text>
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
    height: 180,
  },
  title: {
    fontSize: 30,
  },
});
export default Request;
