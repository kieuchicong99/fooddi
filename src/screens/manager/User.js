import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, RefreshControl, StatusBar, TouchableOpacity } from 'react-native'
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
import { actions as userActions } from '../../redux/userRedux';
import Colors from '../../utils/Colors'
const { getUsers, updateUser, insertUser, deleteUser } = userActions;
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
class User extends Component {
  constructor(props) {
    super(props);

    this.del = (element) => (
      <Button
        buttonStyle={{ width: 20, height: 20, backgroundColor: '#ffffff', borderRadius: 15, padding: 0 }}
        icon={
          <AntIcon name="delete" size={20} color="red" />
        }
        onPress={() => {
          this.props.deleteUser(element.id).then(res => {
            Toast.success('Success!', 0.5, () => {
              this.loadUser();
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
      tableHead: ['Tên TK', 'Tên NV', "Tên CV", "Hành động"],
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
      id: '',
      refreshing: false,
    }

  }

  onSubmit = () => {
    let { id, username, full_name, office, password } = this.state
    let payload = { username, full_name, office, password }
    if (this.state.titleModal === 'Cập nhật tài khoản') {
      console.log('onSubmit => id, payload:', id, payload);
      this.props.updateUser(id, payload, undefined).then(res => {
        console.log('res of upDateUser => data:', res);
        this.setState({ id: '', username: '', full_name: '', office: '', password: '' })
        Toast.success('Success!', 0.5, () => {
          this.loadUser();
        });
      },
        err1 => {
          Toast.fail('Error:' + err1, 0.5);
        }
      );
    }
    else {
      this.props.insertUser(payload).then(res => {
        console.log('res of insertUser => data:', res);
        this.setState({ id: '', username: '', full_name: '', office: '', password: '' })
        Toast.success('Success!', 0.5, () => {
          this.loadUser();
        });
      },
        err1 => {
          Toast.fail('Error:' + err1, 0.5);
        }
      );
    }
  }

  loadUser = () => {
    this.props.getUsers().then(
      res => {
        this.formatForRender()
      }
    );
  }

  formatForRender = () => {
    const tem = [];
    this.props.users.forEach(element => {
      let tem_el = [element.username, element.full_name, element.office_name, this.del_edit(element)];
      tem.push(tem_el)
    });
    console.log('format:', tem)
    this.setState({
      tableData: [...tem]
    })
  }

  async componentDidMount() {
    await this.props.getUsers();
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
        <FlatList
          style={{ backgroundColor: Colors.white }}
          data={[1]}
          renderItem={({ item }) => <>
            <View style={{ flexDirection: 'row', padding: 10, paddingTop: 25, height: 70, paddingBottom: 0, backgroundColor: Colors.grayLightMain }}>
              <View style={{ width: 30 }}>
                <TouchableOpacity
                  style={{ width: 30, height: 30 }}
                  onPress={() => {
                    this.props.navigation.navigate('ManagerDashboard')
                  }}>
                  <AntIcon name="left" size={25} color={Colors.blackMain} />
                </TouchableOpacity>
              </View>
              <View style={{ fontSize: 18, width: screenWidth * 0.6 - 50 }}>
                <Text style={{ fontSize: 18 }}>Danh sách người dùng</Text>
              </View>
              <View style={{ width: 0.4 * screenWidth, alignItems: 'flex-end' }}>
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
                    <Text>Chức vụ</Text>
                  </View>
                  <View style={{ width: '70%' }}>
                    <RNPickerSelect
                      onValueChange={(value) => { this.setState({ office: value }) }}
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
                    <Text>Tài khoản</Text>
                  </View>
                  <View style={{ width: '70%' }}>
                    <TextInput
                      placeholder="username"
                      placeholderTextColor="#363636"
                      style={{
                        ...styles.input
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
                    <Text>Mật khẩu</Text>
                  </View>
                  <View style={{ width: '70%' }}>
                    <TextInput
                      placeholder="password"
                      placeholderTextColor="#363636"
                      style={{
                        ...styles.input
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
                    <Text>Tên</Text>
                  </View>
                  <View style={{ width: '70%' }}>
                    <TextInput
                      placeholder="full_name"
                      placeholderTextColor="#363636"
                      style={{
                        ...styles.input
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

          </>}
          keyExtractor={item => item.id}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => {
            this.props.getUsers()
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
  const { userReducer } = state;
  return {
    users: userReducer.items,
    isFetching: userReducer.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  updateUser: (userId, payload, meta) => dispatch(updateUser(userId, payload, meta)),
  insertUser: (payload, meta) => dispatch(insertUser(payload, meta)),
  deleteUser: (userId, meta) => dispatch(deleteUser(userId, meta)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((WithLoading(User)));
