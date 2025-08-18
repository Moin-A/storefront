import { NextResponse } from "next/server";
import { SolidusAPI } from '../../../service/api';
import {SOLIDUS_ROUTES} from "../../../lib/routes";
export async function GET(request: Request) {
    
    const { searchParams } = new URL(request.url);
    try {
        const api = new SolidusAPI();
        const taxon_id = searchParams.get('taxon_id');
        
        
        
       
        const requestConfig = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include' as RequestCredentials
        };
        // /admin/products/:product_id/product_properties(.:format)
      
        const response = await api.request(SOLIDUS_ROUTES.api.products + `?taxon_id=${taxon_id}`, requestConfig);
        return response;

    } catch (error) {
        return NextResponse.json( 
            { error: (error as any)},
            { status: (error as any)?.status || 500 }
        );
    }
}