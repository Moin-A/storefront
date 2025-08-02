import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: storeId } = await params;

  try {
    const response = await fetch(`http://0.0.0.0:3001/api/stores/${storeId}`, {
      headers: { Accept: "application/json" },
    });

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
