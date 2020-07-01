import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  processColor,
  TouchableOpacity
} from 'react-native';
import moment from 'moment'
import axios from 'axios'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
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
const baseUrl = 'http://45.32.23.158:8000/api/statistic'
export default class MoneyChart extends Component {
  constructor() {
    super();

    this.state = {
      dataX: {},
      dataY: {}
    }

  }

  componentDidMount() {
    axios.get(baseUrl).then(res => {
      console.log('res:', moment(res.data.data.statistic[0].date).day())

      let temp1 = [];
      let temp2 = [];
      for (let i = 0; i < res.data.data.statistic.length; i++) {
        temp1.push({ y: res.data.data.statistic[i].total_money })
        temp2.push(res.data.data.statistic[i].date)
      }
      this.setState({
        dataY: {
          dataSets: [{
            label: "Doanh thu 1 ngày",
            values: temp1,
            config: {
              textSize: 14,
              color: processColor('teal'),
            }
          }],
        },
        dataX: {
          valueFormatter: temp2,
          granularityEnabled: true,
          granularity: 1,
        }
      })
      console.log('state:', temp1)
    })
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

          flexDirection: 'row',
          width: screenWidth

        }}>
          <View style={{ width: 30 }}>
            <TouchableOpacity
              style={{ width: 30, height: 30 }}
              onPress={() => {
                this.props.navigation.navigate('ManagerDashboard')
              }}>
              <AntDesignIcon name="left" size={25} color={Colors.blackMain} />
            </TouchableOpacity>
          </View>
          <View style={{ width: screenWidth - 30, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Biểu đồ doanh thu</Text>
          </View>
        </View>
        <View style={{ flex: 1, marginVertical: 10 }}>

          <View style={styles.container}>
            <BarChart style={styles.chart}
              data={this.state.dataY}
              xAxis={this.state.dataX}
              chartDescription={{ text: '' }}
              legend={{
                enabled: true,
                textSize: 14,
                form: 'SQUARE',
                formSize: 14,
                xEntrySpace: 10,
                yEntrySpace: 5,
                formToTextSpace: 5,
                wordWrapEnabled: true,
                maxSizePercent: 0.5
              }}
            />
          </View>
        </View>

      </View>
    );
  }
}
