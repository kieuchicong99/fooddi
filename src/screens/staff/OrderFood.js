import React from 'react';
import { View, Provider } from 'react-native';
import { Tabs, Toast } from '@ant-design/react-native';
import ListFoods from '../general/ListFoods';
import { connect } from 'react-redux';
import WithLoading from '../../component/withLoading';
import { actions as billActions } from '../../redux/billRedux';

const { getFoods, orderFoods } = billActions;

class OrderFood extends React.Component {
  constructor() {
    super();
    this.state = {
      foodGroup: [],
      groupName: [],
      billId: ''
    }
  }
  onSubmitFood = (value) => {
    console.log("OrderFood => onSubmitFood:", value)
    this.props.orderFoods(value).then(res => {
      console.log("OrderFood => res:", res);
      if (res.response.data.success === true) {
        Toast.success('Đặt món thành công!', 0.5, () => {
          // props.navigation.navigate('OrderFood', { customer: this.state.customer, bill: res.response.data.bill })
        });
      } 123
    })
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
  orderFoods: (payload) => dispatch(orderFoods(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((WithLoading(OrderFood)));
