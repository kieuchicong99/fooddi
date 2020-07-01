import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar

} from 'react-native';

import { LineChart, BarChart } from 'react-native-charts-wrapper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});
import { Dimensions } from "react-native";
import Colors from '../../utils/Colors';
const screenWidth = Dimensions.get("window").width;
export default class Chart extends Component {
  constructor() {
    super();

    this.state = {}

  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={{
          height: 70,
          paddingTop: 25,
          paddingLeft: 20,
          backgroundColor: Colors.grayLightMain,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,

        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Biểu đồ</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ paddingVertical: 10, paddingLeft: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 16 }}>Biểu đồ doanh thu</Text>
          </View>
          <View style={styles.container}>
            <BarChart style={styles.chart}
              data={{
                dataSets: [{
                  label: "Doanh thu 1 ngày",
                  values: [
                    { x: 0, y: 90 },
                    { x: 10, y: 130 },
                    { x: 50, y: 200, marker: "eat more" },
                    { x: 80, y: 150, marker: "eat less" }
                  ],
                }],
                config: { barWidth: 4 }
              }}
              chartDescription={{ text: '' }}
            />
          </View>
        </View>

      </View>
    );
  }
}
