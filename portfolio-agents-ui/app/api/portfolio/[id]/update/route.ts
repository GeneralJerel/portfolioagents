import { NextRequest, NextResponse } from 'next/server';
import { updatePortfolio } from '@/lib/storage/supabase-storage';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { resume_data, user_preferences, voice_agent_id } = body;

    await updatePortfolio(params.id, {
      resume_data,
      user_preferences,
      voice_agent_id,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating portfolio:', error);
    
    return NextResponse.json(
      { error: 'Failed to update portfolio', message: error.message },
      { status: 500 }
    );
  }
}
