import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { List } from '@ant-design/react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
const baseUrl = 'https://quanlynhahanguet.herokuapp.com/api';
const Item = List.Item;
const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
});

export default class ChooseTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListTables: [

            ],
            customer: '',
            chooseTable: ''
        };
    }

    componentDidMount() {
        console.log('prams:', this.props.route.params)
        this.setState({ ListTables: this.props.route.params.listTables })
        this.setState({ customer: this.props.route.params.customer })
    }

    addTable(table) {
        this.setState({ chooseTable: table.id });
        console.log("chooseTable:", this.state.chooseTable)
    }

    createBill = () => {
        // console.log('before CreateBill:', table, customer, status)
        console.log('create Bill:', [{ table: this.state.chooseTable, customer: this.state.customer, status: 'Or' }])
        axios.post(baseUrl + '/bills', [{ table: this.state.chooseTable, customer: this.state.customer, status: 'Or' }])
            .then(res => {
                let customer = res.data;
                console.log('Create bill res => data:', res);

            });
    }
    extraComponent = (props, table) => {
        return (
            <View style={{ ...styles.item, width: '100%' }}>
                <View style={{ width: '40%', alignItems: 'flex-end' }}>
                    <Button
                        buttonStyle={{
                            borderRadius: 30,
                            padding: 10,
                            paddingTop: 3,
                            paddingBottom: 3,
                            backgroundColor: '#ffffff'
                        }}
                        onPress={() =>

                            // props.navigation.navigate('OrderFood')
                            this.addTable(table)
                        }
                        title=""
                    // icon={<SimpleLineIcons name="note" size={20} color="#0099ff" style={{ marginRight: 5 }} />}
                    />
                </View>
                <View style={{ width: '10%' }} />
                <View style={{ width: '50%', alignItems: 'flex-end' }}>
                    <Button
                        buttonStyle={{
                            borderRadius: 40,
                            padding: 15,
                            paddingTop: 4,
                            paddingBottom: 4,
                            backgroundColor: '',
                        }}
                        // onPress={() => props.navigation.navigate('Payment', table)}
                        onPress={() =>

                            // props.navigation.navigate('OrderFood')
                            this.addTable(table)
                        }
                        title=""

                        icon={<AntIcons name="check" size={25} color="#35b043" style={{ marginRight: 5 }} />}


                    />
                </View>
            </View>
        );
    };
    renderTable = (table, index) => {
        return (
            <Item disabled key={`${index}`}>
                <View style={{ ...styles.item, alignItems: 'center' }}>
                    <Text
                        style={{
                            width: '30%',
                            minWidth: 100,
                            fontSize: 18,
                        }}
                    >
                        {table.name}
                    </Text>
                    <View style={{ width: '70%', minWidth: 100 }}>
                        {this.extraComponent(this.props, table)}
                    </View>
                </View>
            </Item>
        );
    }
    render() {
        // console.log(this.props.route.params);

        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                    style={{ backgroundColor: '#f5f5f9' }}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <List renderHeader={'Danh sách bàn ăn'}>
                        {
                            this.state.ListTables.map((table, i) => this.renderTable(table, i))
                        }
                    </List>
                </ScrollView>
                <Button
                    buttonStyle={{
                        borderRadius: 40,
                        padding: 15,
                        paddingTop: 4,
                        paddingBottom: 4,
                        backgroundColor: '',
                    }}

                    onPress={() =>
                        this.createBill()
                    }
                    title=""

                    icon={<AntIcons name="check" size={25} color="#35b043" style={{ marginRight: 5 }} />}


                />
                <View />
            </View>
        );
    }
}
