import { Navbar } from '@/components/layout/navbar';
import { ProtectedRoute } from '@/components/auth/protected-route';
export default function ProjectsLayout({ children }) {
    return (<ProtectedRoute>
      <Navbar />
      <main>{children}</main>
    </ProtectedRoute>);
}
