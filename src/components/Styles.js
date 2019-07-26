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
        marginBottom: 30
    },
    buttonContainer: {
        marginTop: 20
    },
    inputSectionStyle: {
        marginBottom: 25
    },
    datePickerStyle: {
        width: 200
    },
    inputTitleStyle: {
        fontSize: 18,
        color: '#055607',
        fontWeight: 'bold'
    },
    aboutTitleStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    aboutMainBlurbStyle: {
        fontSize: 15,
        paddingBottom: 10
    },
    aboutSignatureText: {
        fontSize: 15,
        paddingBottom: 10,
        fontFamily: 'Zapfino'
    },
    aboutTheAppSection: {
        margin: 15
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
        marginTop: 10,
    },
    discussionNameButtonStyle: {
        fontSize: 20,
        // paddingBottom: 10
    },
    discussionInfoButtonStyle: {
        fontSize: 10,
        fontWeight: '700',
        color: '#6C6C6C'
    },
    discussionContainerStyle: {
        borderColor: '#7A7E7B',
        borderBottomWidth: 0.5,
        paddingTop: 13, 
        paddingBottom: 13
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
        fontSize: 25,
        color: '#055607'
    },
    plantSectionNameText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#055607'
    },
    plantImageStyle: {
        width: 125, 
        height: 125,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 7,
        borderRadius: 120 / 2,
        borderColor: '#055607',
        borderWidth: 0.5
    },
    plantNoNotesStyle: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 5
    },
    mainPlantSectionStyle: {
        marginLeft: 10,
        marginRight: 10,
    },
    plantDateStyle: {
        flexDirection: 'row'
    },
    plantLogSectionNameText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#055607',
        marginBottom: 5
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
    addButtonContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cancelButtonTouchStyle: {
        margin: 10,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#000',
        shadowColor: '#8B8B8B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1.5,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#CBCBCB',
    },
    addButtonTouchStyle: {
        margin: 10,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#055607',
        shadowColor: '#055607',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1.5,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#BDE1C9',
    },
    cancelButtonTextStyle: {
        fontSize: 20
    },
    addButtonTextStyle: {
        fontSize: 20
    },
    addThreadButtonTextStyle: {
        textAlign: 'center',
        fontSize: 15,
        margin: 5,
        fontWeight: '600'
    },
    addThreadButtonTouchStyle: {
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#055607',
        shadowColor: '#055607',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1.5,
        marginLeft: 110,
        marginRight: 110,
        backgroundColor: '#BDE1C9',
        margin: 3
    },
    photoChoiceButtonSectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15
    },
    photoChoiceTextStyle: {
        fontSize: 15,
        fontWeight: '700',
        shadowColor: '#858585',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 0.8,
    },
    deletePhotoTextStyle: {
        fontSize: 15,
        fontWeight: '700',
        shadowColor: '#858585',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 0.8,
        textAlign: 'center'
    },
    photoChoiceTouchStyle: {
        margin: 10,
        justifyContent: 'center'
    },
    discussionMainSectionStyle: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 8,
    },
    discussionHeader: {
        fontWeight: 'bold',
        color: '#7A7E7B',
        fontSize: 15,
        marginTop: 10
    },
    questionTitleStyle: {
        marginTop: 20,
        paddingBottom: 12,
        borderColor: '#055607',
        borderBottomWidth: 1,
    },
    questionTitleText: {
        fontSize: 30,
    },
    aboutPostText: {
        fontWeight: '700',
        color: '#7A7E7B',
        fontSize: 10,
        marginTop: 10
    },
    postBodyStyle: {
        marginTop: 15,
        fontSize: 17
    },
    discussionCommentSection: {
        margin: 10, 
    },
    noCommentsNoticeStyle: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 25
    },
    commentNumber: {
        marginBottom: 10,
        fontWeight: 'bold'
    },
    commentUserNameStyle: {
        color: '#055607',
        fontWeight: '700',
        marginBottom: 10
    },
    commentUserDateStyle: {
        color: '#A09E9E',
        paddingLeft: 5
    },
    commentUserSection: {
        flexDirection: 'row',
    },
    commentSectionStyle: {
        borderColor: '#055607',
        borderBottomWidth: 0.5,
        paddingTop: 10, 
        paddingBottom: 10
    },
    commentButtonSection: {
        flexDirection: 'row',
        marginTop: 9
    },
    deleteCommentButtonStyle: {
        marginLeft: 10,
        fontWeight: '700',
    },
    editCommentButtonStyle: {
        fontWeight: '700',
        color: '#6A6A6A'
    },
    discussionButtonContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    discussionButtonTouchStyle: {
        marginLeft: 7,
        marginRight: 7
    },
    discussionEditButton: {
        fontWeight: '700',
        color: '#6A6A6A'
    },
    discussionDeleteButton: {
        fontWeight: '700',
    },
    addCommentButtonTouchStyle: {
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#055607',
        shadowColor: '#055607',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1.5,
        marginLeft: 110,
        marginRight: 110,
        backgroundColor: '#BDE1C9',
        marginTop: 10
    },
    loadingPlantsListStyle: {
        paddingTop: 50
    },
    loadingDiscussionImageStyle: {
        paddingTop: 25
    },
    myConvoMainStyle: {
        paddingTop: 20,
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    },
    mainConvoViewingSection: {
        paddingTop: 15,
        marginBottom: 20
    },
    convoSectionHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: '#BDE1C9',
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: 'black',
        borderWidth: 0.5,
    },
    convoListPostSection: { 
        paddingBottom: 10
    },
    convoContainerStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        paddingTop: 10,
        paddingBottom: 10
    },
    convoDateButtonStyle: {
        paddingLeft: 5,
        fontStyle: 'italic'
    },
    convoSectionContainerStyle: {
        marginBottom: 10
    },
    plantDropletTouchStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    waterButtonTextStyle: {
        marginTop: 2,
        marginLeft: 2,
        fontWeight: '700',
        color: '#908F8F'
    },
    fertilizeButtonTextStyle: {
        marginTop: 7,
        fontWeight: '700',
        color: '#908F8F'
    },
    deletePlantButtonTouchStyle: {
        margin: 10,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#000',
        shadowColor: '#8B8B8B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1.5,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#CBCBCB',
        justifyContent: 'center',
        marginLeft: 110,
        marginRight: 110
    },
    deletePlantButtonTextStyle: {
        textAlign: 'center',
        fontSize: 15
    },
    editPlantTouchStyle: {
        justifyContent: 'center'
    },
    editPlantTextStyle: {
        textAlign: 'center',
        fontWeight: '600',
        color: '#908F8F'
    },
    plantImageSectionStyle: {
        marginBottom: 20
    },
    plantGeneralSection: {
        borderBottomWidth: 0.5, 
        paddingBottom: 15,
        borderColor: '#055607',
        marginBottom: 15, 
    },
    editPlantGeneralTextStyle: {
        fontWeight: '600',
        color: '#908F8F'
    },
    datePickerSection: {
        marginBottom: 20
    },
    editInputTextSection: {
        marginBottom: 50
    }
})

export default styles;