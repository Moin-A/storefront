import { NextResponse } from "next/server";
import { SolidusAPI } from '../../../../../service/api';
import {SOLIDUS_ROUTES} from "../../../../../lib/routes";
export async function GET(request: Request,
    { params }: { params: { id: string } }
) {
    const {id} = await params;
    try {
        const api = new SolidusAPI();
       
        
        
       
        const requestConfig = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include' as RequestCredentials
        };
      
        const response = await api.request(SOLIDUS_ROUTES.api.taxon_products(id), requestConfig);
        
     
        return NextResponse.json(response, {
            status: 200
        });
        
    } catch (error) {      
        return NextResponse.json( 
            { error: JSON.parse((error as any).message)},
            { status: (error as any)?.status || 500 }
        );
    }
}