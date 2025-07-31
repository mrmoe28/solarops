export default function AuthLayout({ children }) {
    return (<div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">{children}</div>
    </div>);
}
