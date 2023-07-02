import { StyleSheet } from "react-native";
import { Colors } from "./colors";

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.background,
      },
      //logout button styles
      logoutButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
      },
      logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.headerLightBg,
      },
      modalButtonText: {
        color: Colors.headerLightBg,
        fontSize: 16,
      },
})