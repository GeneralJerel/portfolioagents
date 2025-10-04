import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioBySlug } from '@/lib/storage/supabase-storage';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const portfolio = await getPortfolioBySlug(params.slug);
    
    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(portfolio);
  } catch (error: any) {
    console.error('Error fetching portfolio by slug:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch portfolio', message: error.message },
      { status: 500 }
    );
  }
}
