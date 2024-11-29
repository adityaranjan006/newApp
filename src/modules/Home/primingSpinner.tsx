import { Modal, StyleSheet, Text, View } from "react-native"; // Import Modal component
// ... existing imports ...

export default function PrimingSpinner({ isVisible }: { isVisible: boolean }) { // Add isVisible prop
    return (
        <>
            <Modal
                transparent={true}
                visible={isVisible} // Control visibility with isVisible prop
                animationType="fade"
                
            >
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Text>Priming...</Text>
                    </View>
                </View>
            </Modal>
        </>
    )
}

// ... existing styles ...

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",        
    },
    overlay: { // Add overlay style
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    }
})