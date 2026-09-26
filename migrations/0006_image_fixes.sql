-- IG og:image crops cut through the lettering. Keep them as post thumbnails
-- only; do not use them as event covers or gallery posters.

update events
set cover_image = null,
    updated_at = now()
where cover_image like '/images/ig/%';

delete from event_assets
where url like '/images/ig/%';
