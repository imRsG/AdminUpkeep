import { BrowserRouter } from "react-router-dom";
import "mdb-ui-kit/css/mdb.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "../Components/Header/HeaderComponent";
// import FooterComponent from "../Components/FooterComponent";
// import Createlandlord from "../Components/BodyComponent/CreateData/Createlandlord";
function home() {
    return (
        <BrowserRouter>
            <HeaderComponent />
            {/* <FooterComponent /> */}
        </BrowserRouter>
    );
}
export default home;
