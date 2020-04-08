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
        <Text style={myStyles.myTextStyle} test={"'$widget.title'"}>This is a simple text</Text>
        <Text text={'xxx'}/>
    </Container>
);
