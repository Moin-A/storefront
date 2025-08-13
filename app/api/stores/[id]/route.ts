import { type NextRequest, NextResponse } from "next/server";
import { SolidusAPI } from "../../../../service/api";
import { SOLIDUS_ROUTES } from "../../../../lib/routes";


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: storeId } = await params;


  const requestConfig = {
    method: 'GET',
    credentials: 'include' as RequestCredentials
  };

  const api = new SolidusAPI()

  try {
    const api = new SolidusAPI();
    const response = await api.request(`${SOLIDUS_ROUTES.api.stores}/${storeId}`, requestConfig)

    if (!response.ok) {
      return NextResponse.json(
        { error: "Store not found or upstream error" },
        { status: response.status }
      );
    }
  
    const store = await response.json();
    return NextResponse.json(store);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch store data" },
      { status: 500 }
    );
  }
}
