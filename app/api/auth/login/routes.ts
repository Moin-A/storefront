import { NextResponse } from "next/server";
import { SolidusAPI } from '../../../../service/api';


export async function POST(request: Request) {
    const api = new SolidusAPI()
    const response = api.request('/api/auth/login', {
            method: 'POST',
            body: await request.text(),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include' as RequestCredentials
        })
    return NextResponse.json(response, {
        status: 200
    })
            
}