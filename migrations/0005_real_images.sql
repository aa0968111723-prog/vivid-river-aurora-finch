-- Real images the club already published.
-- Covers and thumbnails are their own IG crops, not generated photos.
-- Events stay ended: no capacity, no signup link.

update events set
  cover_image = '/images/ig/dvgr.jpg',
  ig_url = 'https://www.instagram.com/p/DVGrfkAk02g/',
  starts_at = '2026-03-04 19:00:00+08',
  ends_at = '2026-03-04 21:30:00+08',
  registration_mode = 'closed',
  registration_url = null,
  capacity = null,
  status_override = 'ended',
  updated_at = now()
where id = 'evt_brain_20260304';

update events set
  cover_image = '/images/ig/dvgr.jpg',
  ig_url = 'https://www.instagram.com/p/DVGrfkAk02g/',
  starts_at = '2026-03-11 19:00:00+08',
  ends_at = '2026-03-11 21:30:00+08',
  registration_mode = 'closed',
  registration_url = null,
  capacity = null,
  status_override = 'ended',
  updated_at = now()
where id = 'evt_rumination_20260311';

update events set
  cover_image = '/images/ig/dv5.jpg',
  ig_url = 'https://www.instagram.com/p/DV5AccUEaW-/',
  starts_at = '2026-03-18 19:00:00+08',
  ends_at = '2026-03-18 21:30:00+08',
  registration_mode = 'closed',
  registration_url = null,
  capacity = null,
  status_override = 'ended',
  updated_at = now()
where id = 'evt_focus_20260318';

update instagram_posts set
  thumbnail_url = '/images/ig/dvgr.jpg',
  caption = '期初演講：教授沒教的大腦休息法、靜定，跳出內耗黑洞。已結束。',
  published_on = '2026-02-23',
  featured = true,
  updated_at = now()
where id = 'ig_dvgr';

update instagram_posts set
  thumbnail_url = '/images/ig/dv5.jpg',
  caption = '社課：領袖禪－專注的力量。已結束。',
  published_on = '2026-03-14',
  featured = true,
  updated_at = now()
where id = 'ig_dv5a';

insert into event_assets (id, event_id, kind, url, preview_url, caption, sort_order) values
  (
    'ea_brain_poster',
    'evt_brain_20260304',
    'poster',
    '/images/ig/dvgr.jpg',
    '/images/ig/dvgr.jpg',
    'IG 文宣。同一則貼文也預告了 3/11。不是現場照。',
    1
  ),
  (
    'ea_focus_poster',
    'evt_focus_20260318',
    'poster',
    '/images/ig/dv5.jpg',
    '/images/ig/dv5.jpg',
    'IG 文宣，不是現場照。',
    1
  )
on conflict (id) do update set
  url = excluded.url,
  preview_url = excluded.preview_url,
  caption = excluded.caption,
  kind = excluded.kind;
