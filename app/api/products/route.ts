import { NextResponse } from "next/server";
import { SolidusAPI } from '../../../service/api';
import {SOLIDUS_ROUTES} from "../../../lib/routes";
export async function GET(request: Request) {
    
    const { searchParams } = new URL(request.url);
    try {
        const api = new SolidusAPI();
        const [taxon_id] = await searchParams;
        const [taxon] = await searchParams;
        
       
        const requestConfig = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include' as RequestCredentials
        };
        // /admin/products/:product_id/product_properties(.:format)
      
        const response = await api.request(SOLIDUS_ROUTES.api.products + `?taxon_id=${taxon_id||taxon}`, requestConfig);
        
     
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