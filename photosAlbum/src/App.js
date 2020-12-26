import "./App.css";
import Card from "./component/Card";

const App = () => {
  return (
    <div className="App">
      <div>
        <header className="App-header">
          <div className="info">Data Base info </div>
        </header>
        <div
          className="content"
          style={{
            /*backgroundImage: `url(${data.data[photoId].picture})`,*/
            backgroundSize: "cover",
            overflow: "hidden",
          }}
        >
          <Card />
        </div>
        <footer className="App-footer">copywrites: Majd.Rekik</footer>
      </div>
      
    </div>
  );
};

export default App;
