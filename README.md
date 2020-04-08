#Flutter.js Transpile JSX to dart widgets
> Coming soon ... (on development)

Hello Home !

I will run a node.js webserver and watch for .jsx changed after that update .dart file

As you know better <a href='https://flutter.dev'>Flutter</a> comes with dirty syntax, therefore I decided to start developing jsx for flutter.

>I have Uploade my first Tests, and source code is available.

1 - Dart File
```
class HomePageView extends StatelessWidget {
  static final jsxView = "./HomePageView.jsx"; // here

  build() {
    // here will update when .jsx updated    
  }
}
```

2 - And JSX :) is shown bellow:

```
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
        {/* or Also <Text style={myStyles.myTextStyle}>'This is a simple text'</Text>*/}
    </Container>
);

```
3 - Current Output

> I wish to make it prettier in future.
```
Container( 
      child: Text("This is a simple text", style: TextStyle(fontSize: 20)), 
padding: 32, color: 0xFF000000      
    ),
```


That's it Javascript + Flutter will kill it.