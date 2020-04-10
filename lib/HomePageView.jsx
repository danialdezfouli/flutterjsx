const style = {
  wrapper: {
    padding: "32.0",
    margin: { top: 30, bottom: 10 },
    // color: "#f20",
    color: "Colors.red",
  },
  text: {
    fontSize: 21,
    color: "#111",
  },
};

export default (
  <Container {...style.wrapper}>
    <Text style={style.text} text={"This is a simple text"} />
  </Container>
);
