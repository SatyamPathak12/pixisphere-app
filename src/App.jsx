import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoryListing from './pages/CategoryListing';
import PhotographerProfile from './pages/PhotographerProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategoryListing />} />
        <Route path="/photographer/:id" element={<PhotographerProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

