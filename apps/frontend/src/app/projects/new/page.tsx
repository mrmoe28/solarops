'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddressForm } from '@solarops/ui';
import { CREATE_PROJECT } from '@/lib/graphql/queries';
import { CreateProjectInput } from '@solarops/shared';

export default function NewProjectPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [createProject, { loading }] = useMutation(CREATE_PROJECT, {
    onCompleted: (data) => {
      router.push(`/projects/${data.createProject.id}`);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (data: CreateProjectInput) => {
    setError(null);
    await createProject({ variables: { input: data } });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Start New Solar Project</CardTitle>
          <CardDescription>
            Enter the property address to begin the automated solar analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {error}
            </div>
          )}
          <AddressForm onSubmit={handleSubmit} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}
