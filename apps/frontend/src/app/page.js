import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Sun, FileText, Search, Zap } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
export default function HomePage() {
    return (<>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <Sun className="h-16 w-16 text-yellow-500"/>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Solar Project Management
              <span className="text-blue-600"> Powered by AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Streamline your solar installations with automated permit research, intelligent design
              generation, and professional proposal creation.
            </p>
            <Link href="/projects/new">
              <Button size="lg" className="text-lg px-8">
                Start New Project
                <ArrowRight className="ml-2 h-5 w-5"/>
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">How SolarOps Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-blue-600"/>
              </div>
              <h3 className="text-xl font-semibold mb-2">Automated Research</h3>
              <p className="text-gray-600">
                Our AI agents automatically research permit requirements, fees, and application
                processes for any address.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-600"/>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Design Generation</h3>
              <p className="text-gray-600">
                Integration with OpenSolar creates optimized system designs and generates complete
                bill of materials.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-purple-600"/>
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Proposals</h3>
              <p className="text-gray-600">
                Automatically generate comprehensive proposals with system details, costs, and savings
                projections.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Accelerate Your Solar Business?</h2>
            <p className="text-xl mb-8 text-gray-300">
              Join hundreds of installers saving hours on every project.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>);
}
