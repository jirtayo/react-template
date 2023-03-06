import { Button } from "antd";
import { ImagePreview } from "./components/ImagePreview";
function App() {
  return (
    <div className="App">
      hello{" "}
      <Button
        onClick={() => {
          ImagePreview.show(
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          );
        }}
      >
        haha
      </Button>
    </div>
  );
}

export default App;
