import AppRoutes from './routes';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <ScrollToTop />
      <div className="flex-1 flex flex-col">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;