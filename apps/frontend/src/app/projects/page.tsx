'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_PROJECTS } from '@/lib/graphql/queries';
import { ProjectStatus } from '@solarops/shared';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowRight, Sun, DollarSign } from 'lucide-react';

export default function ProjectsPage() {
  const { data, loading } = useQuery(GET_PROJECTS);

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.COMPLETED:
        return 'default';
      case ProjectStatus.IN_PROGRESS:
        return 'secondary';
      case ProjectStatus.FAILED:
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const projects = data?.projects || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Solar Projects</h1>
        <Link href="/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Sun className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No projects yet</h2>
            <p className="text-gray-600 mb-6">
              Start your first solar project to see the power of AI-driven analysis
            </p>
            <Link href="/projects/new">
              <Button>Create Your First Project</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
                </div>
                <CardDescription>
                  {project.address}, {project.city}, {project.state}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 mb-4">
                  Created {formatDate(project.createdAt)}
                </div>

                {project.status === ProjectStatus.COMPLETED && (
                  <div className="space-y-2">
                    {project.solarDesign && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">System Size</span>
                        </div>
                        <span className="font-semibold">{project.solarDesign.systemSize} kW</span>
                      </div>
                    )}
                    {project.proposal && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-sm">System Cost</span>
                        </div>
                        <span className="font-semibold">
                          ${project.proposal.systemCost?.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Link href={`/projects/${project.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
