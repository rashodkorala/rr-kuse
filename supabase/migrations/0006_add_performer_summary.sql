-- Short summary for performer cards; full bio shown in popup.
ALTER TABLE performers ADD COLUMN IF NOT EXISTS summary text;
