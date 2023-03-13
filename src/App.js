import {GRAPHIC_URL} from "./constants";
import Form from "./components/Form";
import "../src/styles.css"

function App() {
  return (
    <>
      <div >
      <div className="container">
    <img src={GRAPHIC_URL} alt="Payment Graphic" />
      <Form />
      </div>
      </div>
    </>
  );
}

export default App;
