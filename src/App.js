import { LoginPage } from "./Views/LoginPage/LoginPage";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { Home } from "./Views/Home/Home";
import { Router } from "./routes/routes";
import store from "./app/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { addUser } from "./reducers/UserReducer";
// import { detectOverflow } from '@popperjs/core;


function App() {
  const [user,setUser] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (localStorage.getItem('userss')) {
        let user = JSON.parse(localStorage.getItem('userss') ?? null);
        dispatch(addUser(user));
      }else{
        dispatch(addUser(null));
      }
    })();
  }, []);


  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  );
}

export default App;
