import { createServerClient } from '@/lib/supabase/client';
import { ResumeJSON } from '@/lib/schemas/resume-schema';

export async function savePortfolio(
  id: string,
  data: ResumeJSON,
  voiceAgentId?: string
): Promise<void> {
  const supabase = createServerClient();

  const { error } = await supabase
    .from('portfolios')
    .insert({
      id,
      slug: data.page.slug,
      resume_data: data as any,
      voice_agent_id: voiceAgentId || null,
      user_preferences: null,
    });

  if (error) {
    throw new Error(`Failed to save portfolio: ${error.message}`);
  }
}

export async function getPortfolio(id: string): Promise<ResumeJSON | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('portfolios')
    .select('resume_data')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    throw new Error(`Failed to get portfolio: ${error.message}`);
  }

  return data?.resume_data as ResumeJSON;
}

export async function getPortfolioBySlug(slug: string): Promise<ResumeJSON | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('portfolios')
    .select('resume_data')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    throw new Error(`Failed to get portfolio by slug: ${error.message}`);
  }

  return data?.resume_data as ResumeJSON;
}

export async function updatePortfolio(
  id: string,
  updates: {
    resume_data?: ResumeJSON;
    user_preferences?: any;
    voice_agent_id?: string;
  }
): Promise<void> {
  const supabase = createServerClient();

  const updateData: any = {};
  if (updates.resume_data) updateData.resume_data = updates.resume_data;
  if (updates.user_preferences) updateData.user_preferences = updates.user_preferences;
  if (updates.voice_agent_id) updateData.voice_agent_id = updates.voice_agent_id;

  const { error } = await supabase
    .from('portfolios')
    .update(updateData)
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to update portfolio: ${error.message}`);
  }
}

export async function getAllPortfolios(): Promise<ResumeJSON[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('portfolios')
    .select('resume_data')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to get portfolios: ${error.message}`);
  }

  return (data || []).map(item => item.resume_data as ResumeJSON);
}

export async function deletePortfolio(id: string): Promise<void> {
  const supabase = createServerClient();

  const { error } = await supabase
    .from('portfolios')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete portfolio: ${error.message}`);
  }
}

export async function portfolioExists(slug: string): Promise<boolean> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('portfolios')
    .select('id')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to check portfolio existence: ${error.message}`);
  }

  return !!data;
}
