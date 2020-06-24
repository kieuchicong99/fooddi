import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { List, Provider, Toast, Radio } from '@ant-design/react-native';
import { connect } from 'react-redux';
import WithLoading from '../../component/withLoading';
import { actions as billActions } from '../../redux/billRedux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import headerCategory from '../../component/headerCategory';
const { createBill, getTables } = billActions;

const RadioItem = Radio.RadioItem;
const Item = List.Item;
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: 140,
    borderRadius: 4,
  }
});

class ChooseTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListTables: [
      ],
      customer: {},
      chooseTable: '',
      statusBar: false
    };
  }

  componentDidMount() {
    console.log('prams:', this.props.route.params)
    this.setState({ ListTables: this.props.route.params.listTables })
    this.setState({ customer: this.props.route.params.customer })
    this.props.navigation.setOptions({ headerShown: false });
  }

  addTable(table) {
    this.setState({ chooseTable: table.id });
    console.log("chooseTable:", this.state.chooseTable)
  }

  createBill = (props) => {
    console.log('create Bill:', { table: this.state.chooseTable, customer: this.state.customer, status: 'Or' })
    this.props.createBill({ table: this.state.chooseTable, customer: this.state.customer.id, status: 'Or' })
      .then(res => {
        console.log('Create bill res => data:', res);
        if (res.response.data.success === true) {
          Toast.success('Success!', 0.5, () => {
            props.navigation.navigate('OrderFood', { customer: this.state.customer, bill: res.response.data.bill })
          });
        }
        if (res.response.data.success === false) {
          Toast.fail(`${res.response.data.message} \nVui lòng đặt bàn khác`, 0.5);
        }

      }, err => {
        Toast.fail('Có lỗi xảy ra:' + err, 0.5);
      });
  }

  renderTable = (table, index) => {
    return (
      <RadioItem key={`${index}`} style={{ ...styles.item, alignItems: 'center', backgroundColor: this.state.chooseTable === table.id ? '#aaafb5' : '#ffffff', fontSize: 18 }}
        checked={this.state.chooseTable === table.id}
        onChange={event => {
          if (event.target.checked) {
            this.setState({ chooseTable: table.id });
          }
        }}
      >
        {table.name}
      </RadioItem>
    );
  }
  render() {
    return (
      <Provider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        {this.state.statusBar
          ? headerCategory('showInBackgroundImage', this.props)
          : headerCategory('showInBackgroundColor', this.props)}
        <ParallaxScrollView
          backgroundColor="white"
          contentBackgroundColor="white"
          parallaxHeaderHeight={140}
          onChangeHeaderVisibility={(event) => {
            console.log('event:', event);
            // eslint-disable-next-line no-unused-expressions
            if (event === true) {
              StatusBar.setBarStyle('light-content');
              this.setState({ statusBar: true });

            } else {
              StatusBar.setBarStyle('dark-content');
              this.setState({ statusBar: false });
            }
            if (this.state.statusBar === true) {
              this.props.getTables();
            }
          }}
          stickyHeaderHeight={90}
          renderForeground={() => (
            <>
              <View>
                <ImageBackground
                  source={{
                    uri:
                      'https://cf.shopee.vn/file/86542db17b76c659f9a2a3f96cb36fde',
                  }}
                  style={{ ...styles.image }}
                />
              </View>
            </>
          )}>
          <View style={{ marginVetical: 20 }}>
            <View style={{ flex: 1 }}>
              <View
                style={{ backgroundColor: '#f5f5f9' }}
              >
                <List >
                  {
                    this.state.ListTables.map((table, i) => this.renderTable(table, i))
                  }
                </List>
              </View>

              <View />
            </View>
          </View>
        </ParallaxScrollView>
        <View style={{
          alignItems: 'center', paddingVertical: 10
        }}>
          {this.state.chooseTable !== '' ? (<Button
            buttonStyle={{
              borderRadius: 40,
              padding: 10,
              backgroundColor: '#4682c2',
              height: 40,
              minWidth: 120
            }}
            onPress={() =>
              this.createBill(this.props)
            }
            titleStyle={{
              color: "#ffffff",
              textAlign: 'center'
            }}
            title="Hoàn Thành"
          />) : null}
        </View>
      </Provider >
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
  createBill: (payload, meta) => dispatch(createBill(payload, meta)),
  getTables: () => dispatch(getTables())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((WithLoading(ChooseTable)));
