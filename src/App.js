import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Practice from './Components/practice';
import Quiz from './Components/Quiz';
import Result from './Components/Result';
import { CheckUserExist } from './helper/helper';


// react routes
const router = createBrowserRouter([
  
  {
    path:'/',
    element:<Login></Login>
  },
  {
    path:'/home',
    element:<Home/>
  },
  {
    path:'/quiz',
    // element:<CheckUserExist><Quiz/></CheckUserExist>
    element:<Quiz/>
  },
  {
    path:'/result',
    // element:<CheckUserExist><Result/></CheckUserExist>
    element:<Result/>
  } 
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
      {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/quiz' element={<Quiz/>} />
        <Route path='/practice' element={<Practice/>} />
        <Route path='/result' element={<Result/>} />
      </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
