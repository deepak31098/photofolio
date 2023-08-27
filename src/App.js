import Album from "./pages/album";
import Navbar from "./component/NavBar";
import {ToastContainer, Zoom} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Zoom}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar />
      <Album />
    </div>
  );
}

export default App;
