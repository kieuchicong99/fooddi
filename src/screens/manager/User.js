import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import userAPI from '../../../src/repository/user_repository';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Button } from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';

import {

	Modal,
	Provider
} from '@ant-design/react-native'
const { getListUser, delUser } = userAPI




export default class User extends Component {
	constructor(props) {
		super(props);

		// 	this.del = (element) => (
		// 		<Button
		// 			buttonStyle={{ width: 20, height: 20, backgroundColor: '#ffffff', borderRadius: 15, padding: 0 }}
		// 			icon={
		// 				<AntIcon name="delete" size={20} color="red" />
		// 			}
		// 			onPress={() => {
		// 				delUser(element.id);
		// 			}}
		// 		/>
		// 	);
		// 	this.edit = (element) => (
		// 		<Button
		// 			buttonStyle={{ width: 20, height: 20, backgroundColor: '#ffffff', borderRadius: 15, padding: 0 }}
		// 			icon={
		// 				<AntIcon name="edit" size={20} color="#000000" />
		// 			}
		// 			onPress={() => {
		// 			}}
		// 		/>
		// 	);
		// 	this.del_edit = (element) => (
		// 		<View style={{
		// 			flex: 1,
		// 			flexDirection: 'row',
		// 			alignItems: 'center',
		// 			justifyContent: 'center',
		// 			height: '100%'
		// 		}}>
		// 			<View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
		// 				{this.edit(element)}
		// 			</View>
		// 			<View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
		// 				{this.del(element)}
		// 			</View>
		// 		</View>
		// 	);

		// 	this.state = {
		// 		tableHead: ['Chức vụ', 'Tài khoản', "Tên", "Hành động"],
		// 		tableData: [
		// 			['1', '2', '3', this.del_edit()],
		// 			['a', 'b', 'c', this.del_edit()],
		// 			['1', '2', '3', this.del_edit()],
		// 			['a', 'b', 'c', this.del_edit()]
		// 		]
		// 	}

		// }

		// componentDidMount() {
		// getListUser().then(res => {
		// 	console.log("res:", res.data.data)
		// 	const data = res.data.data;
		// 	const tem = [];
		// 	data.forEach(element => {
		// 		let tem_el = [element.username, element.full_name, element.office_name, this.del_edit(element)];
		// 		tem.push(tem_el)
		// 	});
		// 	console.log('format:', tem)
		// 	this.setState({
		// 		tableData: [...tem]
		// 	})
		// });
		// };
	}


	render() {
		return (
			// <Provider>
			// 	<View style={styles.container}>
			// 		<Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
			// 			<Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
			// 			<Rows data={this.state.tableData} textStyle={styles.text} />
			// 		</Table>
			// 	</View>
			// 	<Modal
			// 		title="Title"
			// 		transparent
			// 		// onClose={}
			// 		maskClosable
			// 		visible={true}
			// 		closable
			// 		footer={[
			// 			{ text: 'Cancel', onPress: () => console.log('cancel') },
			// 			{ text: 'Ok', onPress: () => console.log('ok') },
			// 		]}
			// 	>
			// 		<Text>
			// 			hi
			// 		</Text>

			// 	</Modal>
			// </Provider>
			<Text>
				HELO
			</Text>

		);
	}
}
// const styles = StyleSheet.create({
// 	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
// 	head: { height: 40, backgroundColor: '#f1f8ff' },
// 	text: { margin: 6 }
// });