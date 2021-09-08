import React, {useState} from 'react';
import {TabBar, SceneMap, TabView} from 'react-native-tab-view';

// import Medicao from './Medicao';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Tabs/Home';

export default function Tabs({
  screenLoading,
  dados,
  medicoesAluno,
  nomeAluno,
  navigation,
}) {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {
      key: 'home',
      icon: 'account',
      dados: dados,
      navigation: navigation,
    },
    // {
    //   key: 'medicao',
    //   icon: 'arm-flex',
    //   medicoesAluno: medicoesAluno,
    //   nomeAluno: nomeAluno,
    //   screenLoading: screenLoading?.medicao,
    // },
  ]);

  function renderIcon({route, color}) {
    return <Icon name={route.icon} size={25} color={color} />;
  }

  const renderScene = SceneMap({
    home: Home,
    // medicao: Medicao,
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
    <>
      <TabView
        style={{paddingHorizontal: 15}}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTab}
      />
    </>
  );
}
