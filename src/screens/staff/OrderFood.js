import React from 'react';
import { View, } from 'react-native';
import { Tabs, Toast, Provider, ActivityIndicator } from '@ant-design/react-native';
import ListFoods from '../general/ListFoods';
import { connect } from 'react-redux';
import WithLoading from '../../component/withLoading';
import { actions as billActions } from '../../redux/billRedux';
import Colors from '../../utils/Colors';

const { getFoods, orderFoods } = billActions;

class OrderFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodGroup: [],
      groupName: [],
      billId: '',
      client: new WebSocket('ws://45.32.23.158:8000/ws/chat/order/'),
      isFetching: false
    }

    this.state.client.onmessage = (message) => {
      console.log('message', message.data);
      const { type } = JSON.parse(message.data)
      if (type && type === 'confirm') {

        this.setState({ isFetching: false })
        Toast.success('Success!', 0.5, () => {
          this.setState({ openModal: false, numMade: 0 })
        });
      }
      else {
        let data = JSON.parse(message.data)
        this.setState({ isFetching: false })

      }
    };
  }
  onSubmitFood = (value) => {
    console.log("OrderFood => onSubmitFood:", value)
    let payload = {
      data: value
    }
    // this.props.orderFoods(value).then(res => {
    //   console.log("OrderFood => res:", res);
    //   if (res.response.data.success === true) {
    //     Toast.success('Đặt món thành công!', 0.5, () => {
    //       // props.navigation.navigate('OrderFood', { customer: this.state.customer, bill: res.response.data.bill })
    //     });
    //   }
    // })

    this.state.client.send(JSON.stringify(payload))
    this.setState({ isFetching: true })
  }

  componentDidMount() {
    this.props.getFoods()
      .then(res => {
        console.log('food group:', res);
        this.setState({
          foodGroup: res.response.data.data
        })
        let tmp = []
        res.response.data.data.forEach(element => {
          tmp.push({ title: element.name })
        });
        console.log(tmp)
        this.setState({ groupName: [...tmp] })
      });
    console.log('OrderFood: => route.params:', this.props.route.params)
    const { customer } = this.props.route.params;
    this.setState({ billId: this.props.route.params.bill.id })
    this.props.navigation.setOptions({ title: `KH :  ${customer.full_name}` });
  }

  render() {
    const { foodGroup } = this.state;
    return (
      <Provider>
        <ActivityIndicator
          size="large"
          color={Colors.greenMain}
          animating={this.state.isFetching}
          style={{
            backgroundColor: 'rgba(0, 166, 81, 0)',
            position: 'absolute',
            zIndex: 1000,
            top: '40%',
            left: '48%',
          }}
        />
        <View style={{ flex: 1 }}>
          <Tabs tabs={this.state.groupName}>
            {
              foodGroup.map(element => {
                return (
                  <View style={{ flex: 1 }}>
                    <ListFoods foods={element.foods} onSubmitFood={this.onSubmitFood} billId={this.state.billId} />
                  </View>
                )
              })
            }
          </Tabs>
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
  getFoods: () => dispatch(getFoods()),
  // orderFoods: (payload) => dispatch(orderFoods(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderFood);

// export default OrderFood;