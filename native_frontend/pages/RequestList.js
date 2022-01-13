import React, {useCallback, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  Modal,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from '../components/Icon';

import Request from '../components/Request';
import axios from 'axios';
import {useGlobalContext} from '../context';

const sampleRequests = [
  {
    id: 123124124123,
    name: 'David',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem laborum id ad. Officia dicta molestias, deleniti, iusto placeat nulla quo modi aliquid atque neque tempore sequi nobis. Odit, consequatur inventore!',
  },
  {
    id: 12412421312312,
    name: 'John',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem laborum id ad. Officia dicta molestias, deleniti, iusto placeat nulla quo modi aliquid atque neque tempore sequi nobis. Odit, consequatur inventore!',
  },
];

const RequestList = ({route}) => {
  const {postId} = route.params;

  const [myRequests, setMyRequests] = useState([]);

  const [selectedReqeust, setSelectedRequest] = useState({});
  const [showSelectedRequest, setShowSelectedRequest] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const fetchRequests = useCallback(async () => {
    const response = await axios.get(
      'http://localhost:4200/api/todo/post/requests',
      {
        params: {postId: postId},
      },
    );
    const data = response.data.result.reverse();
    const requests = data.map(request => {
      return {
        id: request.id,
        name: request.name,
        description: request.description,
        contact: request.contact,
      };
    });
    setMyRequests(requests);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchRequests();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleAccept = async () => {
    setShowSelectedRequest(false);
    setSelectedRequest({});
  };

  const handleReject = async () => {
    setShowSelectedRequest(false);
    setSelectedRequest({});
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={showSelectedRequest}
        animationType="slide">
        <TouchableOpacity
          onPress={() => {
            setShowSelectedRequest(false);
            setSelectedRequest({});
          }}>
          <View
            style={{
              height: '60%',
            }}></View>
        </TouchableOpacity>
        <View style={styles.modalConatiner}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {selectedReqeust.name}
            </Text>
            <Text style={{fontSize: 18}}>{selectedReqeust.description}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              borderTopWidth: 1,
              paddingTop: 10,
              marginTop: 10,
              width: '100%',
            }}>
            <View style={{paddingTop: '3%', paddingLeft: '10%'}}>
              <Icon
                iconName="close"
                buttonFunction={() => {
                  setShowSelectedRequest(false);
                  setSelectedRequest({});
                }}
                height={30}
                width={30}
              />
            </View>
            <View
              style={{
                backgroundColor: 'gray',
                height: '25%',
                width: '35%',
                marginLeft: 10,
                borderRadius: 30,
                justifyContent: 'center',
              }}>
              <Button
                onPress={() => {
                  handleAccept();
                }}
                title="Reject"
                color="white"
              />
            </View>
            <View
              style={{
                backgroundColor: 'blue',
                height: '25%',
                width: '35%',
                marginLeft: 10,
                borderRadius: 30,
                justifyContent: 'center',
              }}>
              <Button
                onPress={() => {
                  handleReject();
                }}
                title="Accept"
                color="white"
              />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <View style={[styles.buttonContainer, {marginLeft: 20}]}>
          <Icon iconName="closeHome" height={25} width={25} />
        </View>
        <View style={{flex: 3}}>
          <Text style={{fontSize: 30, textAlign: 'center', marginTop: 40}}>
            Request List
          </Text>
        </View>
        <View style={[styles.buttonContainer, {marginRight: 10}]}>
          {/* <Icon iconName="search" /> */}
        </View>
      </View>
      <View style={{flex: 8, backgroundColor: 'lightblue'}}>
        <FlatList
          data={myRequests}
          renderItem={({item}) => {
            return (
              <Request
                request={item}
                setSelectedReqest={setSelectedRequest}
                setShowSelectedReqest={setShowSelectedRequest}
              />
            );
          }}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightblue',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
  },
  modalConatiner: {
    height: '50%',
    marginTop: '5%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default RequestList;
