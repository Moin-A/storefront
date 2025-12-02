import { NextRequest } from "next/server";
import { SolidusAPI } from "../../../../../../service/api";


export async function POST(request: NextRequest,
  { params }: { params: { id: string, product_id: string } }
) {
    const api = new SolidusAPI();

    const { id, product_id } = params;

    const { rating, comment } = await request.json();

    const cookies = request.headers.get('cookie') || '';

    const requestConfig = {
        method: 'POST',
        body: JSON.stringify({
            review: {
                rating,
                comment,
            }
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': cookies
        },
        credentials: 'include' as RequestCredentials
    };

    const response = await api.request('/api/orders/current/line_items', requestConfig);
        
    return response;

}