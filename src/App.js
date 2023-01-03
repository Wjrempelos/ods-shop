import {Routes, Route } from 'react-router-dom';
import Home from './components/routes/home/home';
import Navigation from './components/routes/navigation/navigation';
import Authentication from './components/routes/authentication/authentication';

const Shop = () => {
  return <h1>Welcome to the shop</h1>
}

const App = () => {
  return (
  <Routes>
    <Route path='/' element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path='shop' element={<Shop />} />
      <Route path='auth' element={<Authentication />} />
    </Route>
  </Routes>
  );
};

export default App;
