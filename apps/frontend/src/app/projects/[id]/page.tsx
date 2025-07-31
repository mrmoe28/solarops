'use client';

import { useEffect } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { useParams } from 'next/navigation';
import {
  GET_PROJECT,
  START_PROJECT_ANALYSIS,
  AGENT_TASKS,
  AGENT_TASK_UPDATED,
} from '@/lib/graphql/queries';
import { ProjectStatus, AgentType, TaskStatus } from '@solarops/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Loader2, FileText, Home, Sun, FileCheck } from 'lucide-react';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;

  const { data, loading, refetch, error } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
  });

  const { data: tasksData } = useQuery(AGENT_TASKS, {
    variables: { projectId },
  });

  const { data: subscriptionData } = useSubscription(AGENT_TASK_UPDATED, {
    variables: { projectId },
  });

  const [startAnalysis, { loading: analysisLoading }] = useMutation(START_PROJECT_ANALYSIS, {
    onCompleted: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (subscriptionData) {
      refetch();
    }
  }, [subscriptionData, refetch]);

  const project = data?.project;
  const tasks = tasksData?.agentTasks || [];

  // Debug logging - moved here before any conditional returns
  useEffect(() => {
    if (tasksData) {
      console.log('Tasks data:', tasksData);
      console.log('Number of tasks:', tasks.length);
    }
  }, [tasksData, tasks]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <XCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
            <p className="text-red-600">Error loading project: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  // Check if project exists after loading
  if (!loading && !error && !project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-center">Project Not Found</CardTitle>
              <CardDescription className="text-center">
                This project doesn't exist or you don't have permission to view it.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button
                onClick={() => window.location.href = '/projects'}
                variant="outline"
              >
                Back to Projects
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getAgentIcon = (agentType: AgentType) => {
    switch (agentType) {
      case AgentType.PERMIT_OFFICE:
        return <FileCheck className="h-5 w-5" />;
      case AgentType.PARCEL_INFO:
        return <Home className="h-5 w-5" />;
      case AgentType.OPEN_SOLAR:
        return <Sun className="h-5 w-5" />;
      case AgentType.PROPOSAL:
        return <FileText className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case TaskStatus.FAILED:
        return <XCircle className="h-5 w-5 text-red-600" />;
      case TaskStatus.IN_PROGRESS:
        return <Loader2 className="h-5 w-5 animate-spin text-blue-600" />;
      default:
        return null;
    }
  };

  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter((task: any) => task.status === TaskStatus.COMPLETED).length;
    return (completedTasks / tasks.length) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
        <p className="text-gray-600">
          {project.address}, {project.city}, {project.state} {project.zipCode}
        </p>
      </div>

      {project.status === ProjectStatus.PENDING && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ready to Start Analysis</CardTitle>
            <CardDescription>
              Click the button below to start the automated solar analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => startAnalysis({ variables: { projectId } })}
              disabled={analysisLoading}
              size="lg"
            >
              {analysisLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Start Solar Analysis
            </Button>
          </CardContent>
        </Card>
      )}

      {project.status === ProjectStatus.IN_PROGRESS && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analysis in Progress</CardTitle>
            <CardDescription>
              AI agents are gathering information for your solar project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={calculateProgress()} className="mb-4" />
            <div className="space-y-3">
              {tasks.map((task: any) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getAgentIcon(task.agentType)}
                    <span className="font-medium">{task.agentType.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        task.status === TaskStatus.COMPLETED
                          ? 'default'
                          : task.status === TaskStatus.FAILED
                            ? 'destructive'
                            : 'secondary'
                      }
                    >
                      {task.status}
                    </Badge>
                    {getStatusIcon(task.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {project.status === ProjectStatus.COMPLETED && (
        <>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {project.solarDesign && (
              <Card>
                <CardHeader>
                  <CardTitle>Solar System Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">System Size</span>
                      <span className="font-semibold">{project.solarDesign.systemSize} kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Panel Count</span>
                      <span className="font-semibold">{project.solarDesign.panelCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Production</span>
                      <span className="font-semibold">
                        {project.solarDesign.annualProduction?.toLocaleString()} kWh
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {project.proposal && (
              <Card>
                <CardHeader>
                  <CardTitle>Financial Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">System Cost</span>
                      <span className="font-semibold">
                        ${project.proposal.systemCost?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Savings</span>
                      <span className="font-semibold text-green-600">
                        $
                        {(() => {
                          try {
                            const savings = JSON.parse(project.proposal.savings || '{}');
                            return savings.annual?.toLocaleString() || '0';
                          } catch {
                            return '0';
                          }
                        })()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payback Period</span>
                      <span className="font-semibold">{project.proposal.paybackPeriod} years</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Download Proposal</CardTitle>
              <CardDescription>Your comprehensive solar proposal is ready</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                onClick={() => {
                  // TODO: Implement actual PDF download
                  // For now, we'll use a placeholder
                  window.open(`/api/projects/${projectId}/proposal/download`, '_blank');
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                Download PDF Proposal
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
