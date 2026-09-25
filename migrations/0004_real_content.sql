-- Remove demo content. Keep only verified public facts.
-- Past lectures are ended retrospectives, not open registration.

delete from event_registrations
where event_id in (select id from events where is_demo = true);

delete from event_assets
where event_id in (select id from events where is_demo = true);

delete from assets
where event_id in (select id from events where is_demo = true)
   or id in ('as_tea', 'as_lights');

delete from stories
where is_demo = true
   or display_name in ('小安', '阿哲', '小雨')
   or photo_url in ('/images/story-mei.jpg', '/images/story-hao.jpg', '/images/story-lin.jpg');

delete from events where is_demo = true;

delete from instagram_posts
where id in ('ig_opening', 'ig_leader', 'ig_class', 'ig_tea', 'ig_garden', 'ig_dusk')
   or post_url = 'https://www.instagram.com/tku_zc';

delete from faq
where id not in ('faq_alone', 'faq_sit', 'faq_religion', 'faq_once', 'faq_when', 'faq_join');

insert into faq (id, question, answer, icon, sort_order, published) values
  ('faq_alone', '一個人來可以嗎？', '可以。', 'user', 1, true),
  ('faq_sit', '一定要會打坐嗎？', '不用。', 'leaf', 2, true),
  ('faq_religion', '需要特定宗教信仰嗎？', '不需要，這是大學社團。', 'sun', 3, true),
  ('faq_once', '可以只來一次嗎？', '可以。', 'calendar', 4, true),
  ('faq_when', '活動時間怎麼看？', '看本站活動頁，或追 IG @tku_zc。', 'clock', 5, true),
  ('faq_join', '想加入怎麼辦？', '先來一場，或私訊 @tku_zc。', 'heart', 6, true)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  icon = excluded.icon,
  sort_order = excluded.sort_order,
  published = true,
  updated_at = now();

insert into events (
  id, slug, title, subtitle, cover_image, category_id,
  starts_at, ends_at, location_name, location_detail,
  summary, body,
  registration_mode, registration_url, registration_note,
  capacity, registered_count, status_override,
  ig_url, faq, published_at, status, is_demo, featured, sort_order
) values
(
  'evt_brain_20260304',
  'brain-rest-20260304',
  '教授沒教的大腦休息法',
  '已結束',
  null,
  'lecture',
  '2026-03-04 00:00:00+08',
  '2026-03-04 23:59:00+08',
  '工學大樓 E310',
  '淡江大學淡水校園',
  '2026 年 3 月 4 日的演講，已經結束。',
  '這場已經結束，不是目前報名中的活動。下一場時間以活動頁與 IG @tku_zc 為準。',
  'closed',
  null,
  null,
  null,
  null,
  'ended',
  'https://www.instagram.com/p/DVGrfkAk02g/',
  '[]'::jsonb,
  '2026-03-04 12:00:00+08',
  'published',
  false,
  false,
  1
),
(
  'evt_rumination_20260311',
  'leave-rumination-20260311',
  '靜定，跳出內耗黑洞',
  '已結束',
  null,
  'lecture',
  '2026-03-11 00:00:00+08',
  '2026-03-11 23:59:00+08',
  '工學大樓 E310',
  '淡江大學淡水校園',
  '2026 年 3 月 11 日的演講，已經結束。',
  '這場已經結束，不是目前報名中的活動。下一場時間以活動頁與 IG @tku_zc 為準。',
  'closed',
  null,
  null,
  null,
  null,
  'ended',
  'https://www.instagram.com/p/DV5AccUEaW-/',
  '[]'::jsonb,
  '2026-03-11 12:00:00+08',
  'published',
  false,
  false,
  2
),
(
  'evt_focus_20260318',
  'focus-20260318',
  '領袖禪-專注的力量',
  '已結束',
  null,
  'class',
  '2026-03-18 00:00:00+08',
  '2026-03-18 23:59:00+08',
  '宮燈 H117',
  '淡江大學淡水校園',
  '2026 年 3 月 18 日的社課，已經結束。',
  '這場已經結束，不是目前報名中的活動。地點與時間之後仍以當週 IG 為準。',
  'closed',
  null,
  null,
  null,
  null,
  'ended',
  null,
  '[]'::jsonb,
  '2026-03-18 12:00:00+08',
  'published',
  false,
  false,
  3
)
on conflict (id) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  cover_image = null,
  category_id = excluded.category_id,
  starts_at = excluded.starts_at,
  ends_at = excluded.ends_at,
  location_name = excluded.location_name,
  summary = excluded.summary,
  body = excluded.body,
  registration_mode = 'closed',
  registration_url = null,
  capacity = null,
  registered_count = null,
  status_override = 'ended',
  ig_url = excluded.ig_url,
  status = 'published',
  is_demo = false,
  updated_at = now();

insert into instagram_posts (id, post_url, thumbnail_url, caption, post_type, published_on, featured, sort_order) values
  ('ig_dvgr', 'https://www.instagram.com/p/DVGrfkAk02g/', null, '期初演講回顧。', 'image', '2026-03-04', true, 1),
  ('ig_dv5a', 'https://www.instagram.com/p/DV5AccUEaW-/', null, '期初演講回顧。', 'image', '2026-03-11', true, 2)
on conflict (id) do update set
  post_url = excluded.post_url,
  thumbnail_url = null,
  caption = excluded.caption,
  featured = true,
  updated_at = now();
