CREATE TABLE entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  card_key TEXT NOT NULL,
  card_name TEXT NOT NULL,
  scores JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE UNIQUE INDEX idx_entries_email ON entries(email);
CREATE INDEX idx_entries_created_at ON entries(created_at DESC);

-- RLS activé sans policy = accès uniquement via service_role key
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;
