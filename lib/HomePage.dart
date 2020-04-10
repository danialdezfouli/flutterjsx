class HomePageView extends StatelessWidget {
  static final jsxView = "./HomePageView.jsx";
  static final spaces = "  ";

  build(BuildContext context) {
  return Container( 
  	child: Text("This is a simple text", style: TextStyle(	fontSize: 21,
	color: Color(0xFF111111),)), 
	padding: EdgeInsets.all(32.0),
	margin: EdgeInsets.only(top:30, bottom:10),
	color: Colors.red,      
); 
  }
  // afterBuild
}
