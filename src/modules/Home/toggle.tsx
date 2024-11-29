import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import { Bed } from '../../BedStore';
import PowerOn from '../../../assets/icons/powerOn.svg'
import PowerOff from '../../../assets/icons/powerOff.svg'
import { constants } from '../../constants/CONSTANTS';
import { useHub } from '../../common/hooks/useHub';

interface Props {
    bed: Bed;
    setActive: () => void;
}

enum ActiveButton {
    Active = 'Active',
    Inactive = 'Inactive',
}


const ToggleComponent: React.FC<Props> = ({ bed, setActive }) => {
    const { disabledState } = useHub();
    const icon = bed.isActive
        ? <PowerOn />
        : <PowerOff />

    const handleToggle = () => {
        setActive();
    };
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {bed.isActive ? ActiveButton.Active : ActiveButton.Inactive}
            </Text >
            <View>
            <TouchableOpacity
                    disabled={disabledState}
                    onPress={handleToggle}
                    style={styles.btn}
                >
                    {icon}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 5, // Adjusted marginTop for better placement
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: constants['text-primary-active-color'],
        fontWeight: "bold",
    },
    btn: { 
        width: wp('10%'),
        height: hp('10%'),
        justifyContent: 'center', 
        alignItems: 'center',
    }
    
});

export default ToggleComponent;
