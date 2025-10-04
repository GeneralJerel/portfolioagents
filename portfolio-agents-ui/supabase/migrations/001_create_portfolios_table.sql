-- Create portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  resume_data JSONB NOT NULL,
  user_preferences JSONB,
  voice_agent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_portfolios_slug ON portfolios(slug);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_portfolios_created_at ON portfolios(created_at DESC);

-- Create index on voice_agent_id for lookups
CREATE INDEX IF NOT EXISTS idx_portfolios_voice_agent ON portfolios(voice_agent_id) WHERE voice_agent_id IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON portfolios
  FOR SELECT USING (true);

-- Create policy to allow anyone to insert
CREATE POLICY "Allow public insert access" ON portfolios
  FOR INSERT WITH CHECK (true);

-- Create policy to allow updates (for voice agent configuration)
CREATE POLICY "Allow public update access" ON portfolios
  FOR UPDATE USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to call the function before any update
CREATE TRIGGER update_portfolios_updated_at 
  BEFORE UPDATE ON portfolios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add helpful comment
COMMENT ON TABLE portfolios IS 'Stores parsed resume data and associated voice agent configurations';
COMMENT ON COLUMN portfolios.id IS 'Unique identifier (nanoid)';
COMMENT ON COLUMN portfolios.slug IS 'URL-safe slug from person name';
COMMENT ON COLUMN portfolios.resume_data IS 'Structured JSON data from parsed resume';
COMMENT ON COLUMN portfolios.user_preferences IS 'Voice agent personality preferences';
COMMENT ON COLUMN portfolios.voice_agent_id IS 'Reference to VAPI assistant ID';
