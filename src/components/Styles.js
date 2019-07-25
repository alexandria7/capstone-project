import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    authScreenStyle: {
        flex: 1, 
        backgroundColor: '#BDE1C9'
    },
    aboutAppMainStyle: {
        flex: 1,
        backgroundColor: 'white', 
    },
    headerStyle: {
      height: 70,
      paddingTop: 30, 
      borderColor: '#7A7E7B',
      borderBottomWidth: 0.5,
      justifyContent: 'space-around',
      backgroundColor: '#EFDECE'
    },
    headerText: {
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 22,
      color: '#055607',
      fontWeight: 'bold',
      paddingBottom: 58,
      paddingTop: 0,
      fontFamily: 'Bangla Sangam MN',
    },
    headerImageStyle: {
      width: 28, 
      height: 28,
      marginLeft: 10,
      marginTop: 10
    },
    mainEditSectionStyle: {
        paddingTop: 20,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    editTextHeaderStyle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#055607',
        textAlign: 'center',
        marginBottom: 20
    },
    noteTextArea: {
        height: 100,
        justifyContent: "flex-start"
    },
    textAreaContainer: {
        borderWidth: 0.5,
    },
    buttonContainer: {
        marginTop: 20
    },
    inputSectionStyle: {
        marginBottom: 20
    },
    datePickerStyle: {
        width: 200
    },
    inputTitleStyle: {
        fontSize: 15,
        color: '#055607',
        fontWeight: 'bold'
    },
    aboutTitleStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10
    },
    aboutMainBlurbStyle: {
        fontSize: 15
    },
    titleStyle: {
        fontSize: 50,
        color: '#055607',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 50,
        paddingTop: 10,
        fontFamily: 'Bangla Sangam MN',
        paddingLeft: 5, 
        paddingRight: 5,
        textAlign: 'center',
    },
    imageStyle: {
      width: 85, 
      height: 85,
      alignSelf: 'center',
      marginTop: 30,
      marginBottom: 30
    },
    greetingStyle: {
      justifyContent: 'center', 
      alignItems: 'center',
    },
    greetingText: {
      fontSize: 20,
      color: '#055607',
      fontWeight: 'bold'
    },
    greetingButtonText: {
      fontSize: 15,
      color: '#055607'
    },
    buttonContainerStyle: {
      marginTop: 50
    },
    homeButtonContainerStyle: {
        marginTop: 30,
        justifyContent: 'center',
    },
    homeButtonTextStyle: {
        textAlign: 'center',
        fontSize: 20,
        margin: 5
    },
    homeButtonTouchStyle: {
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#055607',
        shadowColor: '#055607',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1.5,
        marginLeft: 80,
        marginRight: 80,
        backgroundColor: '#BDE1C9',
        margin: 3
    },
    aboutAppStyle: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%',
      position: 'absolute',
      bottom: 5,
    },
    aboutAppButtonText: {
      fontSize: 15,
      color: '#055607'
    },
    mainPlantListSection: {
        paddingTop: 20,
        flex: 1
    },
    plantListTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#055607',
        textAlign: 'center',
    },
    listOfPlantsStyle: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
    },
    noticeStyleName : {
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 25
    },
    plantNameButtonStyle: {
        fontSize: 20,
    },
    plantContainerStyle: {
        borderBottomWidth: 0.5,
        paddingTop: 10, 
        paddingBottom: 10,
        borderColor: '#055607',
    },
    addDiscussionBlurb: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '800',
        marginBottom: 20
    },
    subTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#7A7E7B',
        fontSize: 20,
        marginBottom: 20
    },
    mainDiscussionListSection: {
        paddingTop: 20,
    },
    ListTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#055607',
        textAlign: 'center',
    },
    listOfDiscussionsStyle: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
    },
    discussionNameButtonStyle: {
        fontSize: 20,
        paddingBottom: 10
    },
    discussionContainerStyle: {
        borderColor: '#7A7E7B',
        borderBottomWidth: 0.5,
        paddingTop: 10, 
        paddingBottom: 10
    },
    mainLoadingContainer: {
        flex: 1,
        backgroundColor: '#BDE1C9',
        justifyContent: 'center' 
    },
    loadingImageStyle: {
        width: 95, 
        height: 95,
        alignSelf: 'center',
        marginBottom: 30,
    },
    loadingTextStyle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 30
    },
    plantNameTitle: {
        marginTop: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25
    },
    plantSectionNameText: {
        fontWeight: 'bold',
        fontSize: 15
    },
    plantImageStyle: {
        width: 125, 
        height: 125,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 120 / 2
    },
    plantNoNotesStyle: {
        fontStyle: 'italic',
        textAlign: 'center',
    },
    mainPlantSectionStyle: {
        // paddingTop: 20,
        // flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    plantDateStyle: {
        flexDirection: 'row'
    },
    plantLogSectionNameText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15
    },
    plantLogDatesDisplay: {
        borderColor: '#7A7E7B',
        borderWidth: 0.5,
        marginLeft: 15,
        marginRight: 15
    },
    dateLogStyle: {
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
        fontSize: 15
    },
    editCommentContextSection: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 25
    },
    signInTextStyle: {
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '500',
        color: 'white'
    },
    signInContainerStyle: {
        marginTop: 50
    },
    signInTouchStyle: {
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#055607',
        shadowColor: '#055607',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginLeft: 60,
        marginRight: 60,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#055607'
    },
    bigButtonTextStyle: {
        textAlign: 'center',
        fontSize: 15,
        margin: 5,
        fontWeight: '600'
    },
    bigButtonTouchStyle: {
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#055607',
        shadowColor: '#055607',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1.5,
        marginLeft: 130,
        marginRight: 130,
        backgroundColor: '#BDE1C9',
        margin: 3
    },
})

export default styles;