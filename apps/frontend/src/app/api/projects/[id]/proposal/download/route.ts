import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    
    // Get the authorization header from the request
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Call the backend GraphQL mutation to generate download token
    const response = await fetch(`${BACKEND_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({
        query: `
          mutation GenerateProposalDownload($id: ID!) {
            generateProposalDownload(id: $id)
          }
        `,
        variables: { id: projectId },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate download token');
    }

    const result = await response.json();
    
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    const downloadToken = result.data.generateProposalDownload;

    // Redirect to the actual download endpoint
    const downloadUrl = `${BACKEND_URL}/api/proposals/download/${downloadToken}`;
    
    return NextResponse.redirect(downloadUrl);
  } catch (error) {
    console.error('Proposal download error:', error);
    return NextResponse.json(
      { error: 'Failed to generate proposal download' },
      { status: 500 }
    );
  }
} 