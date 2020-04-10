# Flutter.js Transpile JSX to dart widgets

[![NPM Version][npm-image]][npm-url]



> Coming soon ... (on development)

Hello Home !

I will run a node.js webserver and watch for .jsx changed after that update .dart file

As you know better <a href='https://flutter.dev'>Flutter</a> comes with dirty syntax, therefore I decided to start developing jsx for flutter.

> I Uploaded my first tries.

1 - Dart File

```
class HomePageView extends StatelessWidget {
  static final jsxView = "./HomePageView.jsx";
  static final spaces = "  ";

  build(BuildContext context) {
  }
  // afterBuild
}

```

2 - And JSX :) is shown bellow:

```
const style = {
  wrapper: {
    padding: "32.0",
    margin: { top: 30, bottom: 10 },
    color: "#000000",
  },
  text: {
    fontSize: 20,
  },
};

export default (
  <Container {...style.wrapper}>
    <Text style={style.text} text={"This is a simple text"} />
  </Container>
);
```

3 - Current Output

> I wish to make it prettier in future.

```
class HomePageView extends StatelessWidget {
  static final jsxView = "./HomePageView.jsx";
  static final spaces = "  ";

  build(BuildContext context) {
  return Container(
  	child: Text("This is a simple text", style: TextStyle(fontSize: 20)),
	padding: EdgeInsets.all(32.0),
	margin: EdgeInsets.only(top:30, bottom:10),
	color: Color(0xFF000000),
);
  }
  // afterBuild
}

```

That's it Javascript + Flutter will kill it.


[npm-image]: https://img.shields.io/npm/v/flutterjsx.svg?style=flat
[npm-url]: https://www.npmjs.com/package/flutterjsx
