import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, RefreshControl, StatusBar, Image, TouchableOpacity } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component';
import { Button } from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';
import {
  Modal,
  Provider,
  Toast
} from '@ant-design/react-native'
import WithLoading from '../../component/withLoading';
import { connect } from 'react-redux';
import { actions as foodActions } from '../../redux/foodRedux';
const { getFoods, updateFood, insertFood, deleteFood } = foodActions;

import Colors from '../../utils/Colors'
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
class Food extends Component {
  constructor(props) {
    super(props);

    this.del = (element) => (
      <Button
        buttonStyle={{ width: 20, height: 20, backgroundColor: '#ffffff', borderRadius: 15, padding: 0 }}
        icon={
          <AntIcon name="delete" size={20} color="red" />
        }
        onPress={() => {
          this.props.deleteFood(element.id).then(res => {
            Toast.success('Success!', 0.5, () => {
              this.loadFood();
            });
          }, err => {
            Toast.fail('Error:' + err1, 0.5);
          });
        }}
      />
    );
    this.edit = (element) => (
      <Button
        buttonStyle={{ width: 20, height: 20, backgroundColor: '#ffffff', borderRadius: 15, padding: 0 }}
        icon={
          <AntIcon name="edit" size={20} color="#000000" />
        }
        onPress={() => {
          console.log('edit:', element)
          this.setState(
            {
              openModal: true,
              titleModal: 'Cập nhật món ăn',
              name: element.name,
              price: element.price,
              food_group: element.food_group,
              img: element.img,
              id: element.id
            })
        }}

      />
    );
    this.del_edit = (element) => (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}>
        <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          {this.edit(element)}
        </View>
        <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          {this.del(element)}
        </View>
      </View>
    );

    this.state = {
      tableHead: [
        <Text style={{ textAlign: 'center' }}>Tên Món</Text>,
        <Text style={{ textAlign: 'center' }}>Ảnh</Text>,
        <Text style={{ textAlign: 'center' }}>Nhóm</Text>,
        <Text style={{ textAlign: 'center' }}>Hành động</Text>,
      ]
      ,
      tableData: [
        ['1', '2', '3', this.del_edit()],
        ['a', 'b', 'c', this.del_edit()],
        ['1', '2', '3', this.del_edit()],
        ['a', 'b', 'c', this.del_edit()]
      ],
      openModal: false,
      titleModal: 'Tạo món ăn',
      name: '',
      price: '',
      img: '',
      food_group: '',
      id: '',
      refreshing: false,
    }

  }

  onSubmit = () => {
    let { id, img, name, food_group, price } = this.state
    let payload = { img, name, food_group, price: parseInt(price) }
    if (this.state.titleModal === 'Cập nhật món ăn') {
      console.log('onSubmit => id, payload:', id, payload);
      this.props.updateFood(id, payload, undefined).then(res => {
        console.log('res of upDateFood => data:', res);
        this.setState({ id: '', img: '', name: '', name: '', food_group: '', price: '' })
        Toast.success('Success!', 0.5, () => {
          this.loadFood();
        });
      },
        err1 => {
          ``
          Toast.fail('Error:' + err1, 0.5);
        }
      );
    }
    else {
      this.props.insertFood(payload).then(res => {
        console.log('res of insertFood => data:', res);
        this.setState({ id: '', img: '', name: '', food_group: '', price: '' })
        Toast.success('Success!', 0.5, () => {
          this.loadFood();
        });
      },
        err1 => {
          Toast.fail('Error:' + err1, 0.5);
        }
      );
    }
  }

  loadFood = () => {
    this.props.getFoods().then(
      res => {
        this.formatForRender()
      }
    );
  }

  formatForRender = () => {
    const tem = [];
    this.props.foods.forEach(element => {
      let tem_el = [
        <Text style={{ textAlign: 'center' }}>{element.name}</Text>,
        <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 5 }}>
          <Image source={{ uri: element.img, height: 40, width: 60 }}></Image>
        </View>
        ,
        <Text style={{ textAlign: 'center' }}>
          {element.food_group === 1 ? 'Lẩu' : element.food_group === 2 ? 'Nướng' : element.food_group === 3 ? 'Cơm' : element.food_group === 4 ? 'Bún' : element.food_group === 5 ? 'Phở' : ''}
        </Text>,
        this.del_edit(element)];
      tem.push(tem_el)
    });
    console.log('format:', tem)
    this.setState({
      tableData: [...tem]
    })
  }

  async componentDidMount() {
    await this.props.getFoods();
    this.formatForRender()
  };


  render() {
    console.log('state: ', this.state)
    return (
      <Provider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={{ flexDirection: 'row', padding: 10, marginTop: 20, width: screenWidth }}>
          <View style={{ width: 30 }}>
            <TouchableOpacity
              style={{ width: 30, height: 30 }}
              onPress={() => {
                this.props.navigation.navigate('ManagerDashboard')
              }}>
              <AntIcon name="left" size={25} color={Colors.blackMain} />
            </TouchableOpacity>
          </View>
          <View style={{ fontSize: 18, width: screenWidth * 0.6 - 30 }}>
            <Text style={{ fontSize: 18, }}>Danh sách món ăn</Text>
          </View>
          <View style={{ width: '40%', alignItems: 'flex-end' }}>
            <Button
              buttonStyle={{ width: 120, height: 30, borderRadius: 15, padding: 15, paddingTop: 10, paddingBottom: 10, marginBottom: 15 }}
              title='Thêm'
              icon={
                <AntIcon name="plus" size={20} color="#FFFFFF" />
              }
              onPress={() => {
                this.setState({ openModal: true, titleModal: 'Tạo món ăn' })
              }}
            />
          </View>
        </View>
        <FlatList
          data={[1]}
          renderItem={({ item }) => <>


            <ScrollView style={{ ...styles.container, paddingTop: 10 }}>
              <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }} style={{ marginBottom: 40 }}>
                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                <Rows data={this.state.tableData} textStyle={styles.text} />
              </Table>
            </ScrollView>
            <Modal
              style={{ width: '85%', height: '55%', marginTop: -50, minHeight: 310 }}
              title={<Text style={{ textAlign: 'center', fontSize: 18 }}>{this.state.titleModal}</Text>}
              transparent
              onClose={
                () => {
                  console.log('onClose');
                  this.setState({ id: '', img: '', name: '', food_group: '', price: '' });
                  this.setState({ openModal: false })
                }
              }
              visible={this.state.openModal}
              closable

            >
              <ScrollView style={{ marginTop: 10 }}>
                <View
                  style={{
                    ...styles.rowInput
                  }}>
                  <View
                    style={{
                      width: '30%',
                      borderRightColor: '#D2D2D2',
                      borderRightWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text>Nhóm</Text>
                  </View>
                  <View style={{ width: '70%' }}>
                    <RNPickerSelect
                      onValueChange={(value) => { this.setState({ food_group: value }) }}
                      placeholder={{
                        label: this.state.food_group === 1 ? 'Lẩu' : this.state.food_group === 2 ? 'Nướng' : this.state.food_group === 3 ? 'Cơm' : this.state.food_group === 4 ? 'Bún' : this.state.food_group === 5 ? 'Phở' : 'Chọn nhóm'
                      }}
                      items={[
                        { label: 'Bún', value: 4 },
                        { label: 'Cơm', value: 3 },
                        { label: 'Lẩu', value: 1 },
                        { label: 'Nướng', value: 2 },
                        { label: 'Phở', value: 5 },
                      ]}
                    />
                  </View>
                </View>
                <View
                  style={{
                    ...styles.rowInput
                  }}>
                  <View
                    style={{
                      width: '30%',
                      borderRightColor: '#D2D2D2',
                      borderRightWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text>Tên món</Text>
                  </View>
                  <View style={{ width: '70%' }}>
                    <TextInput
                      placeholder="name"
                      placeholderTextColor="#363636"
                      style={{
                        ...styles.input
                      }}
                      value={this.state.name}
                      onChangeText={value => {
                        this.setState({
                          name: value,
                        });
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    ...styles.rowInput
                  }}>
                  <View
                    style={{
                      width: '30%',
                      borderRightColor: '#D2D2D2',
                      borderRightWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text>Giá</Text>
                  </View>
                  <View style={{ width: '70%' }}>
                    <TextInput
                      placeholder="price"
                      placeholderTextColor="#363636"
                      style={{
                        ...styles.input
                      }}
                      value={`${this.state.price}`}
                      onChangeText={value => {
                        this.setState({
                          price: value,
                        });
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    ...styles.rowInput
                  }}>
                  <View
                    style={{
                      width: '30%',
                      borderRightColor: '#D2D2D2',
                      borderRightWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text>Ảnh</Text>
                  </View>
                  <View style={{ width: '70%' }}>
                    <TextInput
                      placeholder="img"
                      placeholderTextColor="#363636"
                      style={{
                        ...styles.input
                      }}
                      value={this.state.img}
                      onChangeText={value => {
                        this.setState({
                          img: value,
                        });
                      }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <View style={{ alignItems: 'flex-start', width: '50%' }}>
                    <Button
                      buttonStyle={{ height: 30, borderRadius: 15, backgroundColor: 'white', padding: 15, paddingTop: 10, paddingBottom: 10, marginBottom: 15 }}
                      title='Hủy'
                      titleStyle={{ color: 'red' }}
                      icon={
                        <AntIcon name="close" size={20} color="red" />
                      }
                      onPress={() => {
                        this.setState({ id: '', name: '', name: '', food_group: '', price: '' })
                        this.setState({ openModal: false })
                      }}
                    />
                  </View>
                  <View style={{ width: '50%', alignItems: 'flex-end' }}>
                    <Button
                      buttonStyle={{ height: 30, borderRadius: 15, backgroundColor: 'white', padding: 15, paddingTop: 10, paddingBottom: 10, marginBottom: 15 }}
                      title='Chọn'
                      titleStyle={{ color: '#2089DC' }}
                      icon={
                        <AntIcon name="save" size={20} color="#2089DC" />
                      }
                      onPress={() => {
                        this.onSubmit()
                        this.setState({ openModal: false })
                      }}
                    />
                  </View>
                </View>
              </ScrollView>
            </Modal>

          </>}
          keyExtractor={item => item.id}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => {
            this.props.getFoods()
          }} />}
          contentContainerStyle={styles.list} />

      </Provider >
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  input: {
    backgroundColor: '#F6F6F8',
    fontFamily: 'Helvetica Neue',
    textAlign: 'left',
    fontSize: 16,
    paddingLeft: 15,
    height: 40,
    color: '#363636',
  },
  rowInput: {
    flexDirection: 'row',
    borderColor: '#D2D2D2',
    backgroundColor: '#F6F6F8',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10
  },
});

const mapStateToProps = (state) => {
  const { foodReducer } = state;
  return {
    foods: foodReducer.items,
    isFetching: foodReducer.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getFoods: () => dispatch(getFoods()),
  updateFood: (foodId, payload, meta) => dispatch(updateFood(foodId, payload, meta)),
  insertFood: (payload, meta) => dispatch(insertFood(payload, meta)),
  deleteFood: (foodId, meta) => dispatch(deleteFood(foodId, meta)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((WithLoading(Food)));
