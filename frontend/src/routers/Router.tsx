import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/clients/Dashboard'
import Message from '../pages/clients/Message'
import LayoutClinet from '../components/layouts/LayoutClinet'
import LayoutMessage from '../components/layouts/LayoutMessage'
import OnlineClassroom from '../pages/clients/OnlineClassroom'
import Wallet from '../pages/clients/Wallet'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<LayoutClinet/>}>
                <Route path="/lich-trinh" element={<Dashboard />} />
                <Route path="/phong-hoc" element={<OnlineClassroom />} />
                <Route path="/vi" element={<Wallet />} />
            </Route>
            <Route path='/tro-chuyen' element={<LayoutMessage/>}>
                <Route path="/tro-chuyen" element={<Message />} />
            </Route>
        </Routes>
    )
}

export default Router