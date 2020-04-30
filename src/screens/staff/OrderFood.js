import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import ListFoods from '../general/ListFoods';
const renderContent = (tab) => {
    const banStyle = {
        minHeight: 100,
        paddingVertical: 10,
        backgroundColor: '#ddd',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#ddd',
    };
    const content = tab.map((e, i) => {
        return (
            <View key={`${e} ${i}`} style={banStyle}>
                <Text style={{ width: '50%' }}>
                    {e.title}
                </Text >
                <View style={{ width: '50%' }}>
                    {
                        e.choosenFoods?.map((item, index) => {
                            return (
                                <Text key={`${item} ${index}`}>
                                    {item.title}
                                </Text>
                            );


                        })
                    }

                </View>
            </View>
        );
    });
    return <ScrollView style={{ backgroundColor: '#fff' }}>{content}</ScrollView>;
};
class OrderFood extends React.Component {
    render() {
        const tabs = [
            { title: 'Lẩu' },
            { title: 'Nướng' },
            { title: 'Cơm' },
            { title: 'Bún' },
            { title: 'Phở' },
            { title: 'Tráng miệng' },
            { title: 'Đồ uống' },
        ];
        const tabs2 = [
            { title: 'Tầng 1' },
            { title: 'Tầng 2' },
            { title: 'Tầng 3' },
            { title: 'Tầng 4' },
            { title: 'Tầng 5' },
            { title: 'Tầng 6' },
            { title: 'Tầng 7' },

        ];

        const ban = [
            {
                title: 'Bàn 1',
                choosenFoods: [
                    {
                        title: 'bánh mì',
                    },
                    {
                        title: 'phở',
                    },
                    {
                        title: 'bún',
                    },
                    {
                        title: 'cơm gà',
                    },
                    {
                        title: 'cơm chiên',
                    },
                    {
                        title: 'cơm nguội',
                    },


                ],
            },
            { title: 'Bàn 2' },
            { title: 'Bàn 3' },
            { title: 'Bàn 4' },
            { title: 'Bàn 5' },
            { title: 'Bàn 6' },
            { title: 'Bàn 7' },
            { title: 'Bàn 8' },
            { title: 'Bàn 9' },
            { title: 'Bàn 10' },

        ];


        return (
            <View style={{ flex: 3 }}>
                <Tabs tabs={tabs} style={{ flex: 2 }}>
                    <View >
                        <ListFoods foodImageStyle={{ width: '100%', height: 200 }} textStyle={{ fontSize: 16 }} />
                    </View>
                    <View>
                        <Text>Content of Second Tab</Text>
                    </View>
                    <View >
                        <Text>Content of Third Tab</Text>
                    </View>
                </Tabs>
                {/* <Text style={{ paddingBottom: 12, paddingLeft: 10, fontSize: 24 }}>Đặt món ăn</Text>

                <View style={{ flex: 1 }}>
                    <Tabs tabs={tabs2} initialPage={1} tabBarPosition="top">
                        {renderContent(ban)}
                    </Tabs>
                </View> */}
            </View >
        );
    }
}

export default OrderFood;
