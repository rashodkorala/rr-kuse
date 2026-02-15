-- Migration: Replace venue_id (FK to venues) with venue_tag text field
-- venue_tag values: 'rob_roy', 'konfusion', 'both'

-- ============================================================
-- 1. Add venue_tag columns and populate from venues join
-- ============================================================

-- events
ALTER TABLE events ADD COLUMN venue_tag TEXT DEFAULT 'both';
UPDATE events SET venue_tag = CASE
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'rob-roy') THEN 'rob_roy'
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'konfusion') THEN 'konfusion'
  ELSE 'both'
END;
ALTER TABLE events ALTER COLUMN venue_tag SET NOT NULL;
ALTER TABLE events DROP COLUMN venue_id;
ALTER TABLE events ADD CONSTRAINT events_venue_tag_check CHECK (venue_tag IN ('rob_roy', 'konfusion', 'both'));
CREATE INDEX events_venue_tag_idx ON events (venue_tag);

-- deals
ALTER TABLE deals ADD COLUMN venue_tag TEXT DEFAULT 'both';
UPDATE deals SET venue_tag = CASE
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'rob-roy') THEN 'rob_roy'
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'konfusion') THEN 'konfusion'
  ELSE 'both'
END;
ALTER TABLE deals ALTER COLUMN venue_tag SET NOT NULL;
ALTER TABLE deals DROP COLUMN venue_id;
ALTER TABLE deals ADD CONSTRAINT deals_venue_tag_check CHECK (venue_tag IN ('rob_roy', 'konfusion', 'both'));
CREATE INDEX deals_venue_tag_idx ON deals (venue_tag);

-- gallery_images
ALTER TABLE gallery_images ADD COLUMN venue_tag TEXT DEFAULT 'both';
UPDATE gallery_images SET venue_tag = CASE
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'rob-roy') THEN 'rob_roy'
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'konfusion') THEN 'konfusion'
  ELSE 'both'
END;
ALTER TABLE gallery_images ALTER COLUMN venue_tag SET NOT NULL;
ALTER TABLE gallery_images DROP COLUMN venue_id;
ALTER TABLE gallery_images ADD CONSTRAINT gallery_images_venue_tag_check CHECK (venue_tag IN ('rob_roy', 'konfusion', 'both'));
CREATE INDEX gallery_images_venue_tag_idx ON gallery_images (venue_tag);

-- videos
ALTER TABLE videos ADD COLUMN venue_tag TEXT DEFAULT 'both';
UPDATE videos SET venue_tag = CASE
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'rob-roy') THEN 'rob_roy'
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'konfusion') THEN 'konfusion'
  ELSE 'both'
END;
ALTER TABLE videos ALTER COLUMN venue_tag SET NOT NULL;
ALTER TABLE videos DROP COLUMN venue_id;
ALTER TABLE videos ADD CONSTRAINT videos_venue_tag_check CHECK (venue_tag IN ('rob_roy', 'konfusion', 'both'));
CREATE INDEX videos_venue_tag_idx ON videos (venue_tag);

-- posts
ALTER TABLE posts ADD COLUMN venue_tag TEXT DEFAULT 'both';
UPDATE posts SET venue_tag = CASE
  WHEN venue_id IS NULL THEN 'both'
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'rob-roy') THEN 'rob_roy'
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'konfusion') THEN 'konfusion'
  ELSE 'both'
END;
ALTER TABLE posts ALTER COLUMN venue_tag SET NOT NULL;
ALTER TABLE posts DROP COLUMN venue_id;
ALTER TABLE posts ADD CONSTRAINT posts_venue_tag_check CHECK (venue_tag IN ('rob_roy', 'konfusion', 'both'));
CREATE INDEX posts_venue_tag_idx ON posts (venue_tag);

-- operating_hours
ALTER TABLE operating_hours ADD COLUMN venue_tag TEXT DEFAULT 'both';
UPDATE operating_hours SET venue_tag = CASE
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'rob-roy') THEN 'rob_roy'
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'konfusion') THEN 'konfusion'
  ELSE 'both'
END;
ALTER TABLE operating_hours ALTER COLUMN venue_tag SET NOT NULL;
-- Drop old unique constraint before dropping venue_id
ALTER TABLE operating_hours DROP CONSTRAINT IF EXISTS operating_hours_venue_day_unique;
ALTER TABLE operating_hours DROP COLUMN venue_id;
ALTER TABLE operating_hours ADD CONSTRAINT operating_hours_venue_tag_check CHECK (venue_tag IN ('rob_roy', 'konfusion', 'both'));
CREATE INDEX operating_hours_venue_tag_idx ON operating_hours (venue_tag);
ALTER TABLE operating_hours ADD CONSTRAINT operating_hours_venue_tag_day_unique UNIQUE (venue_tag, day_of_week);

-- special_offerings
ALTER TABLE special_offerings ADD COLUMN venue_tag TEXT DEFAULT 'both';
UPDATE special_offerings SET venue_tag = CASE
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'rob-roy') THEN 'rob_roy'
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'konfusion') THEN 'konfusion'
  ELSE 'both'
END;
ALTER TABLE special_offerings ALTER COLUMN venue_tag SET NOT NULL;
ALTER TABLE special_offerings DROP COLUMN venue_id;
ALTER TABLE special_offerings ADD CONSTRAINT special_offerings_venue_tag_check CHECK (venue_tag IN ('rob_roy', 'konfusion', 'both'));
CREATE INDEX special_offerings_venue_tag_idx ON special_offerings (venue_tag);

-- venue_content
ALTER TABLE venue_content ADD COLUMN venue_tag TEXT DEFAULT 'both';
UPDATE venue_content SET venue_tag = CASE
  WHEN venue_id IS NULL THEN 'both'
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'rob-roy') THEN 'rob_roy'
  WHEN venue_id = (SELECT id FROM venues WHERE slug = 'konfusion') THEN 'konfusion'
  ELSE 'both'
END;
ALTER TABLE venue_content ALTER COLUMN venue_tag SET NOT NULL;
-- Drop old unique constraint before dropping venue_id
ALTER TABLE venue_content DROP CONSTRAINT IF EXISTS venue_content_venue_key_unique;
ALTER TABLE venue_content DROP COLUMN venue_id;
ALTER TABLE venue_content ADD CONSTRAINT venue_content_venue_tag_check CHECK (venue_tag IN ('rob_roy', 'konfusion', 'both'));
CREATE INDEX venue_content_venue_tag_idx ON venue_content (venue_tag);
ALTER TABLE venue_content ADD CONSTRAINT venue_content_venue_tag_key_unique UNIQUE (venue_tag, content_key);

-- ============================================================
-- 2. Drop RLS policies on venues before dropping the table
-- ============================================================
DROP POLICY IF EXISTS "Allow public read access on venues" ON venues;
DROP POLICY IF EXISTS "Allow authenticated insert on venues" ON venues;
DROP POLICY IF EXISTS "Allow authenticated update on venues" ON venues;
DROP POLICY IF EXISTS "Allow authenticated delete on venues" ON venues;

-- ============================================================
-- 3. Drop the venues table
-- ============================================================
DROP TABLE venues;
