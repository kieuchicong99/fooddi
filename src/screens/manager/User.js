import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import userAPI from '../../../src/repository/user_repository';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Button } from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import {
  Modal,
  Provider,
  Toast

} from '@ant-design/react-native'
const { getListUser, delUser, updateUser, createUser } = userAPI
import axios from 'axios';
const baseUrl = 'http://45.32.23.158:8000/api';

let openModal = false;
export default class User extends Component {
  constructor(props) {
    super(props);

    this.del = (element) => (
      <Button
        buttonStyle={{ width: 20, height: 20, backgroundColor: '#ffffff', borderRadius: 15, padding: 0 }}
        icon={
          <AntIcon name="delete" size={20} color="red" />
        }
        onPress={() => {
          delUser(element.id).then(res => {
            Toast.success('Success!', 0.5, () => {
              this.getUsers();
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
          this.setState(
            {
              openModal: true,
              titleModal: 'Cập nhật tài khoản',
              username: element.username,
              full_name: element.full_name,
              password: element.password,
              office: element.office,
              office_name: element.office_name,
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
      tableHead: ['Chức vụ', 'Tài khoản', "Tên", "Hành động"],
      tableData: [
        ['1', '2', '3', this.del_edit()],
        ['a', 'b', 'c', this.del_edit()],
        ['1', '2', '3', this.del_edit()],
        ['a', 'b', 'c', this.del_edit()]
      ],
      openModal: false,
      titleModal: 'Tạo tài khoản',
      username: '',
      password: '',
      full_name: '',
      office: '',
      office_name: '',
      id: ''
    }

  }

  onSubmit = () => {
    let { id, username, full_name, office, password } = this.state
    let payload = { username, full_name, office, password }
    if (this.state.titleModal === 'Cập nhật tài khoản') {
      console.log('onSubmit => id, payload:', id, payload);
      updateUser(id, payload).then(res => {
        console.log('res of upDateUser => data:', res);
        this.setState({ id: '', username: '', full_name: '', office: '', password: '' })
        Toast.success('Success!', 0.5, () => {
          this.getUsers();
        });
      },
        err1 => {
          Toast.fail('Error:' + err1, 0.5);
        }
      );
    }
    createUser(payload).then(res => {
      console.log('res of upDateUser => data:', res);
      this.setState({ id: '', username: '', full_name: '', office: '', password: '' })
      Toast.success('Success!', 0.5, () => {
        this.getUsers();
      });
    },
      err1 => {
        Toast.fail('Error:' + err1, 0.5);
      }
    );


  }

  getUsers = () => {
    getListUser().then(res => {
      console.log("res:", res.data.data)
      const data = res.data.data;
      const tem = [];
      data.forEach(element => {
        let tem_el = [element.username, element.full_name, element.office_name, this.del_edit(element)];
        tem.push(tem_el)
      });
      console.log('format:', tem)
      this.setState({
        tableData: [...tem]
      })
    });
  }

  componentDidMount() {
    this.getUsers();
  };

  render() {
    console.log('open Modal: ', openModal)
    return (
      <Provider>
        <ScrollView style={{ ...styles.container, paddingTop: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ fontSize: 18, width: '60%' }}>
              <Text style={{ fontSize: 18, textTransform: 'uppercase' }}>Danh sách người dùng</Text>
            </View>
            <View style={{ width: '40%', alignItems: 'flex-end' }}>
              <Button
                buttonStyle={{ width: 120, height: 30, borderRadius: 15, padding: 15, paddingTop: 10, paddingBottom: 10, marginBottom: 15 }}
                title='Thêm'
                icon={
                  <AntIcon name="plus" size={20} color="#FFFFFF" />
                }
                onPress={() => {
                  this.setState({ openModal: true, titleModal: 'Tạo tài khoản' })
                }}
              />
            </View>
          </View>


          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={this.state.tableData} textStyle={styles.text} />
          </Table>
        </ScrollView>
        <Modal
          style={{ width: '85%', height: '60%', marginTop: -50, minHeight: 300 }}
          title={<Text style={{ textAlign: 'center', fontSize: 18 }}>{this.state.titleModal}</Text>}
          transparent
          onClose={
            () => {
              console.log('onClose');
              this.setState({ id: '', username: '', full_name: '', office: '', password: '' });
              this.setState({ openModal: false })
            }
          }
          visible={this.state.openModal}
          closable

        >
          <ScrollView style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                borderColor: '#D2D2D2',
                backgroundColor: '#F6F6F8',
                borderWidth: 1,
                borderRadius: 4,
                marginBottom: 10
              }}>
              <View
                style={{
                  width: '30%',
                  borderRightColor: '#D2D2D2',
                  borderRightWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <FontAwesome name="user" size={25} /> */}
                <Text>Chức vụ</Text>
              </View>
              <View style={{ width: '70%' }}>
                <RNPickerSelect
                  onValueChange={(value) => { this.setState({ office: value }) }}
                  // value={this.state.office}
                  placeholder={{ label: this.state.office_name !== '' ? this.state.office_name : 'Chọn chức vụ' }}
                  items={[
                    { label: 'Quản lý', value: 1 },
                    { label: 'Đầu bếp', value: 2 },
                    { label: 'Thu ngân', value: 3 },
                    { label: 'Phục vụ', value: 4 },
                  ]}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderColor: '#D2D2D2',
                backgroundColor: '#F6F6F8',
                borderWidth: 1,
                borderRadius: 4,
                marginBottom: 10
              }}>
              <View
                style={{
                  width: '30%',
                  borderRightColor: '#D2D2D2',
                  borderRightWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <FontAwesome name="user" size={25} /> */}
                <Text>Tài khoản</Text>
              </View>
              <View style={{ width: '70%' }}>
                <TextInput
                  placeholder="username"
                  placeholderTextColor="#363636"
                  style={{
                    backgroundColor: '#F6F6F8',
                    fontFamily: 'Helvetica Neue',
                    textAlign: 'left',
                    fontSize: 16,
                    paddingLeft: 15,
                    height: 40,
                    color: '#363636',
                  }}
                  value={this.state.username}
                  onChangeText={value => {
                    this.setState({
                      username: value,
                    });
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderColor: '#D2D2D2',
                backgroundColor: '#F6F6F8',
                borderWidth: 1,
                borderRadius: 4,
                marginBottom: 10
              }}>
              <View
                style={{
                  width: '30%',
                  borderRightColor: '#D2D2D2',
                  borderRightWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <FontAwesome name="user" size={25} /> */}
                <Text>Mật khẩu</Text>
              </View>
              <View style={{ width: '70%' }}>
                <TextInput
                  placeholder="password"
                  placeholderTextColor="#363636"
                  style={{
                    backgroundColor: '#F6F6F8',
                    fontFamily: 'Helvetica Neue',
                    textAlign: 'left',
                    fontSize: 16,
                    paddingLeft: 15,
                    height: 40,
                    color: '#363636',
                  }}
                  value={this.state.password}
                  onChangeText={value => {
                    this.setState({
                      password: value,
                    });
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderColor: '#D2D2D2',
                backgroundColor: '#F6F6F8',
                borderWidth: 1,
                borderRadius: 4,
                marginBottom: 10
              }}>
              <View
                style={{
                  width: '30%',
                  borderRightColor: '#D2D2D2',
                  borderRightWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <FontAwesome name="user" size={25} /> */}
                <Text>Tên</Text>
              </View>
              <View style={{ width: '70%' }}>
                <TextInput
                  placeholder="full_name"
                  placeholderTextColor="#363636"
                  style={{
                    backgroundColor: '#F6F6F8',
                    fontFamily: 'Helvetica Neue',
                    textAlign: 'left',
                    fontSize: 16,
                    paddingLeft: 15,
                    height: 40,
                    color: '#363636',
                  }}
                  value={this.state.full_name}
                  onChangeText={value => {
                    this.setState({
                      full_name: value,
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
                    this.setState({ id: '', username: '', full_name: '', office: '', password: '' })
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
      </Provider >


    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});