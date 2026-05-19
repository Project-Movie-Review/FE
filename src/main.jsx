import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom' // Thêm dòng này

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter> {/* Bọc App ở đây */}
      <App />
    </BrowserRouter>
)