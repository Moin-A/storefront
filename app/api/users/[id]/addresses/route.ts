import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest,
  { params }: { params: { id: string } }
) {

   const { id } = await params;
   const cookies = request.headers.get('cookie') || '';
   console.log("api_url",process.env.SOLIDUS_API_URL)
    const response = fetch(`${process.env.API_URL}/api/addresses`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies
      },
        credentials: 'include' as RequestCredentials
    });
      
    
    return response;

}

