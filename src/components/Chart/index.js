import React from 'react';
import {View} from 'react-native';
import IOSIcon from 'react-native-vector-icons/Ionicons';
import {PieChart} from 'react-native-svg-charts';
import {CardChart, TextChart} from './styles';
import {useState} from 'react';
import {useEffect} from 'react';

export default function Chart({data = [], label}) {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const pie = data.map((item, index) => ({
      value: item.value,
      svg: {
        fill: item.color,
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
    }));

    setPieData(pie);
  }, [data]);

  return (
    <>
      <TextChart bold>{label}</TextChart>
      <CardChart width={'80%'} height={'180%'}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {data.map((itemChart, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                alignItems: 'center',
              }}>
              <IOSIcon
                name="man"
                size={30}
                color={itemChart.color}
                style={{marginRight: 5}}
              />
              <View style={{flex: 1, marginRight: 5}}>
                <TextChart size={16}>{itemChart.label}</TextChart>
                <TextChart size={16}>{itemChart.value}</TextChart>
              </View>
            </View>
          ))}
        </View>
        <View>
          <PieChart
            animate
            outerRadius={40}
            innerRadius={30}
            style={{height: 180, width: 100}}
            data={pieData}
          />
        </View>
      </CardChart>
    </>
  );
}
