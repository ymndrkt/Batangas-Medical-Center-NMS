import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Login} from "./component/login";
import {Home} from "./component/Home";
import {Navigation} from './component/navigation';
import {Logout} from './component/logout';
import Devices from "./component/Devices";
import Manage from "./component/Manage";
import Scan from "./component/Scan";

function App() {
    return <BrowserRouter>
    <Navigation></Navigation>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/devices" element={<Devices/>} />
            <Route path="/manage" element={<Manage/>} />
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/scan" element={<Scan/>}/>
        </Routes>
    </BrowserRouter>;
}

export default App;
