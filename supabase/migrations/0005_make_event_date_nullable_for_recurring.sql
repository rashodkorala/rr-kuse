-- Recurring events only need day + time; no specific date required.
-- Make event_date nullable so recurring events can omit it and use start_time/end_time only.
ALTER TABLE events ALTER COLUMN event_date DROP NOT NULL;
