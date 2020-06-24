import React from 'react';
import { View } from 'react-native';
import { InputItem, Toast, Provider, } from '@ant-design/react-native';
import { Button } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import WithLoading from '../../component/withLoading';
import { actions as billActions } from '../../redux/billRedux';

const { createCustomer, getTables } = billActions;

class CreateBill extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      listTables: []
    };
  }

  componentDidMount() {
  }

  createCustomer = (data, props) => {
    console.log('before CreateBill:', data)
    this.props.createCustomer(data).then(res => {
      console.log('res cusomter => data:', res);
      let customer = res.response.data.data;

      this.props.getTables().then(
        res1 => {
          console.log("getListTable:", res1);
          this.setState({ listTables: res1.response.data.data })
          console.log('res cusomter => data:', customer);
          Toast.success('Success!', 0.5, () => {
            props.navigation.navigate('ChooseTable', { listTables: this.state.listTables, customer: customer })
          });
        },
        err2 => {
          Toast.fail('Có lỗi xảy ra:' + err2, 0.5);
        }
      )
    },
      err1 => {
        Toast.fail('Có lỗi xảy ra:' + err1, 0.5);
      }
    );
  }

  render() {
    return (
      <Provider>
        <View style={{ flex: 1 }}>
          <InputItem
            clear
            error={(this.state.name === '') ? true : false}
            value={this.state.name}
            onChange={value => {
              this.setState({
                name: value,
              });
            }}
            placeholder="Tên khách hàng"
          >
            Name
				</InputItem>
          <InputItem
            clear
            error={(this.state.phone === '') ? true : false}
            value={this.state.phone}
            onChange={value => {
              this.setState({
                phone: value,
              });
            }}
            placeholder="Số điện thoại"
          >
            Phone
				</InputItem>
          <Button
            buttonStyle={{
              borderRadius: 4,
              padding: 15,
              paddingTop: 4,
              paddingBottom: 4,
              backgroundColor: '#35b043',
            }}
            onPress={() => {
              this.createCustomer({
                full_name: this.state.name,
                phone: this.state.phone

              }, this.props);
            }

            }
            title="Đặt bàn"
            icon={<MaterialIcons name="payment" size={15} color="white" style={{ marginRight: 5 }} />}
          />
        </View >
      </Provider>
    );
  }
}

const mapStateToProps = (state) => {
  const { billReducer } = state;
  return {
    isFetching: billReducer.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createCustomer: (payload, meta) => dispatch(createCustomer(payload, meta)),
  getTables: () => dispatch(getTables())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((WithLoading(CreateBill)));
