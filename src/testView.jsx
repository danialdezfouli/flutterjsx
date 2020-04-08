const myStyles = {
    myContainer: {
        padding: 32,
        color: "#000000",
    },
    myTextStyle: {
        fontSize: 20,
    },
};

export default (
    <Container {...myStyles.myContainer}>
        <Text style={myStyles.myTextStyle} text={'This is a simple text'}/>
    </Container>
);
