import React from 'react';
import { View } from 'react-native';
import { InputItem } from '@ant-design/react-native';
import { Button } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
const baseUrl = 'https://quanlynhahanguet.herokuapp.com/api';
class CreateBill extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			phone: '',
			listTables: []
		}
	}
	componentDidMount() {

	}
	// getListTable() {
	// 	axios.get(baseUrl + '/tables').then(
	// 		res => {
	// 			console.log("getListTable:", res);
	// 			this.setState({ listTable: res.data.data })
	// 		}
	// 	)

	// }
	createBill(data, props) {
		console.log('before CreateBill:', data)
		axios.post(baseUrl + '/customers', data)
			.then(res => {
				let customer = res.data.data;
				// console.log('res cusomter => data:', customer);
				axios.get(baseUrl + '/tables').then(
					res1 => {
						console.log("getListTable:", res1);
						this.setState({ listTables: res1.data.data })
						console.log('res cusomter => data:', customer);
						props.navigation.navigate('ChooseTable', { listTables: this.state.listTables, customer: customer.id })
					}
				)
			});
	}

	render() {
		return (
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
						borderRadius: 40,
						padding: 15,
						paddingTop: 4,
						paddingBottom: 4,
						backgroundColor: '#35b043',
					}}
					onPress={() => {
						this.createBill({
							full_name: this.state.name,
							phone: this.state.phone

						}, this.props);
						// this.props.navigation.navigate('OrderFood', { customer: this.state })
					}

					}
					title="Đặt bàn"
					icon={<MaterialIcons name="payment" size={15} color="white" style={{ marginRight: 5 }} />}
				/>
			</View >
		);
	}
}

export default CreateBill;
