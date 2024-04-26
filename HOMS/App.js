import Nav from './nav';
import axios from 'axios';

axios.defaults.baseURL='http://192.168.224.128:8080/'
const App = () => {
  return (
   <Nav />
  );
};

export default App; 