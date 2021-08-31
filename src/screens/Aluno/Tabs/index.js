import React, {useState} from 'react';
import {TabBar, SceneMap, TabView} from 'react-native-tab-view';
import Home from './Home';
import Medicao from './Medicao';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Tabs({dadosAluno, medicoesAluno, nomeAluno}) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'home', icon: 'account', dadosAluno: dadosAluno},
    {
      key: 'medicao',
      icon: 'arm-flex',
      medicoesAluno: medicoesAluno,
      nomeAluno: nomeAluno,
    },
  ]);

  function renderIcon({route, color}) {
    return <Icon name={route.icon} size={25} color={color} />;
  }

  const renderScene = SceneMap({
    home: Home,
    medicao: Medicao,
  });

  function renderTab({...props}) {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: 'transparent'}}
        renderIcon={renderIcon}
        activeColor="#257AC9"
        style={{
          backgroundColor: '#2A2B2C',
          height: 50,
          elevation: 0,
          marginTop: 15,
          borderRadius: 6,
        }}
      />
    );
  }

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTab}
    />
  );
}
