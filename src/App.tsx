import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import InvitationPage from './pages/InvitationPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvitationPage side="both" />} />
        <Route path="/nha-trai" element={<InvitationPage side="nha-trai" />} />
        <Route path="/nha-gai" element={<InvitationPage side="nha-gai" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
