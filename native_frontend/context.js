import React, {useState, useContext, useEffect, useCallback} from 'react';
import axios from 'axios';
import {getUniqueId} from 'react-native-device-info';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [userId, setUserId] = useState('');

  const fetchId = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4200/api/user/get');
      const users = response.data.result;
      const deviceId = getUniqueId();

      const target = users.find(user => user.name === deviceId);

      if (target) {
        console.log('id found');
        setUserId(target.id);
      } else {
        console.log('id not found');
        await axios.post('http://localhost:4200/api/user/add', {
          name: deviceId,
        });
        fetchId();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchId();
  }, [fetchId]);

  return <AppContext.Provider value={{userId}}>{children}</AppContext.Provider>;
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export {AppContext, AppProvider, useGlobalContext};
