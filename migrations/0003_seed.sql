insert into event_categories (id, name_zh, sort_order) values
  ('tea', '茶會', 1),
  ('lecture', '期初演講', 2),
  ('class', '社課', 3),
  ('zen', '禪修', 4),
  ('outdoor', '戶外活動', 5),
  ('gathering', '聚會', 6),
  ('recruit', '招生', 7),
  ('other', '其他', 8)
on conflict (id) do nothing;

insert into site_settings (key, value) values
  ('club', '{"name":"淡江大學禪學社","nameEn":"TKU Zen Club","instagram":"https://www.instagram.com/tku_zc","campus":"淡江大學（淡水校園）","note":"想找我們，IG 私訊 @tku_zc 就好。"}'::jsonb),
  ('announcement', '{"title":"","body":"","href":"","visible":false}'::jsonb),
  ('seo', '{"title":"淡江大學禪學社","description":"在很忙的大學生活裡，留一點時間，認識自己。第一次來也沒關係。"}'::jsonb)
on conflict (key) do nothing;

insert into events (
  id, slug, title, subtitle, cover_image, category_id,
  starts_at, ends_at, location_name, location_detail, map_url,
  summary, body, audience,
  registration_mode, registration_url, registration_note,
  capacity, registered_count, status_override,
  ig_url, faq, published_at, status, is_demo, featured, sort_order
) values
(
  'evt_opening',
  'opening-talk-pause',
  '忙裡偷閒：大學生活的暫停鍵',
  '期初演講',
  '/images/lecture-hall.jpg',
  'lecture',
  '2026-10-01 19:00:00+08',
  '2026-10-01 21:30:00+08',
  '工學大樓 E310',
  '淡江大學淡水校園',
  'https://maps.google.com/?q=淡江大學工學大樓',
  '一場給第一次來的人聽的演講。不用懂禪，帶耳朵來就好。',
  $$期初最忙的時候，最需要一個暫停鍵。

這場演講會用很日常的話，談談怎麼讓腦袋休息一下、怎麼少一點內耗。沒有艱深名詞，也不會要你立刻開始打坐。

適合：大一新生、對社團還在觀望的人、單純想聽完再決定的人。

流程大概是：認識我們 → 聽一段話 → 問問題 → 如果想留下，再看下一場活動。$$,
  '第一次接觸禪學社的同學，尤其大一',
  'google_form',
  'https://forms.gle/GjA4LHP78CQ6qZ8g8',
  '報名後會再在 IG 提醒時間地點。',
  80,
  null,
  'open',
  'https://www.instagram.com/p/DVGrfkAk02g/',
  '[{"q":"一定要坐到結束嗎？","a":"希望你可以聽完。如果中途有事，安靜離開就好，沒有人會盯著你。"},{"q":"會不會一直傳教？","a":"不會。這是大學社團的演講，講的是怎麼讓生活慢一點。"}]'::jsonb,
  '2026-09-10 10:00:00+08',
  'published',
  true,
  true,
  1
),
(
  'evt_class',
  'weekly-class-rhythm',
  '週三社課：認識自己的節奏',
  '社課',
  '/images/club-class.jpg',
  'class',
  '2026-10-07 19:00:00+08',
  '2026-10-07 21:30:00+08',
  '宮燈教室 H116',
  '淡江大學淡水校園',
  'https://maps.google.com/?q=淡江大學',
  '每週三晚上。來坐坐、聽聽、認識一些人。',
  $$社課不是考試，也不是要你變成很會打坐的人。

比較像一群人每週留一個晚上，練習把注意力拉回來。有時候喝茶，有時候聽一段分享，有時候就是安靜一下。

18:50 開始報到。遲到也沒關係，輕輕進來找位子就好。$$,
  '想每週留一個晚上給自己的人',
  'instagram_dm',
  'https://ig.me/m/tku_zc',
  '私訊「社課」就可以。',
  40,
  null,
  'open',
  'https://www.instagram.com/p/DJ3SH8iTHQn/',
  '[{"q":"一定每週都要來嗎？","a":"不用。想來得來，這學期很忙也可以先來一次看看。"}]'::jsonb,
  '2026-09-12 10:00:00+08',
  'published',
  true,
  true,
  2
),
(
  'evt_fuyou',
  'fuyou-chan-guang',
  '浮游禪光',
  '茶會',
  '/images/floating-lights.jpg',
  'tea',
  '2026-10-08 18:30:00+08',
  '2026-10-08 21:00:00+08',
  '淡大覺軒花園',
  '新北市淡水區英專路 151 號',
  'https://maps.google.com/?q=淡江大學覺軒',
  '在花園裡喝杯茶。燈是暖的，人也不會很嚴肅。',
  $$浮游禪光是禪學社最容易踏進來的一場。

花園、茶、一點點光。你可以聊天，也可以什麼都不說。沒有儀式要跟，也沒有人會考你禪是什麼。

如果這學期你只想來一次，來這場就很好。$$,
  '想先認識環境、不想有壓力的人',
  'google_form',
  'https://forms.gle/GjA4LHP78CQ6qZ8g8',
  '名額有限，填了再來比較不會撲空。',
  36,
  28,
  'filling',
  'https://www.instagram.com/tku_zc',
  '[{"q":"會不會很冷？","a":"秋天的覺軒晚上會涼，帶一件薄外套剛剛好。"},{"q":"可以只待一下子嗎？","a":"可以。喝完茶想走就走。"}]'::jsonb,
  '2026-09-14 10:00:00+08',
  'published',
  true,
  true,
  3
),
(
  'evt_walk',
  'juexuan-walk',
  '覺軒花園散步',
  '戶外',
  '/images/garden-path.jpg',
  'outdoor',
  '2026-10-18 16:00:00+08',
  '2026-10-18 18:00:00+08',
  '淡大覺軒花園',
  '新北市淡水區英專路 151 號',
  'https://maps.google.com/?q=淡江大學覺軒',
  '傍晚走一圈花園。不需報名，到現場就好。',
  $$沒有流程表。就是一起走、一起停、看看花跟天空。

如果你平常都在趕課，這兩個小時可以什麼都不用趕。$$,
  '想出門又不太想社交壓力的人',
  'closed',
  null,
  '不需報名，準時到覺軒花園入口就好。',
  null,
  null,
  'upcoming',
  null,
  '[]'::jsonb,
  '2026-09-15 10:00:00+08',
  'published',
  true,
  false,
  4
),
(
  'evt_sit',
  'sit-and-see',
  '先來坐坐看',
  '禪修體驗',
  '/images/sit-quiet.jpg',
  'zen',
  '2026-10-22 19:00:00+08',
  '2026-10-22 21:00:00+08',
  '宮燈教室 H116',
  '淡江大學淡水校園',
  'https://maps.google.com/?q=淡江大學',
  '第一次打坐？沒關係。有人帶，坐不住也可以換姿勢。',
  $$這不是閉關，也不是考試。

會先講怎麼坐得比較不那麼痛，再一起試一下子。中間有休息。結束後可以留下來問「我剛才腦袋一直跑去想晚餐，這樣算失敗嗎？」（不算。）$$,
  '完全沒打坐過、只是想試試看的人',
  'instagram_dm',
  'https://ig.me/m/tku_zc',
  '私訊「我想坐坐看」。',
  24,
  null,
  'open',
  null,
  '[{"q":"一定要盤腿嗎？","a":"不用。椅子也可以。重點是你還在，不是姿勢漂不漂亮。"}]'::jsonb,
  '2026-09-16 10:00:00+08',
  'published',
  true,
  true,
  5
),
(
  'evt_brain',
  'brain-rest-2026',
  '教授沒教的大腦休息法',
  '期初演講・回顧',
  '/images/club-class.jpg',
  'lecture',
  '2026-03-04 19:00:00+08',
  '2026-03-04 21:30:00+08',
  '工學大樓 E310',
  '淡江大學淡水校園',
  null,
  '談怎麼讓大腦真的休息，而不是滑著手機假裝休息。',
  $$2026 年 3 月的期初演講。現場滿溫暖的，問問題的人也很多。

如果你錯過了，歡迎來看之後的社課或茶會。$$,
  null,
  'closed',
  null,
  null,
  null,
  null,
  'ended',
  'https://www.instagram.com/p/DVGrfkAk02g/',
  '[]'::jsonb,
  '2026-02-20 10:00:00+08',
  'published',
  true,
  false,
  10
),
(
  'evt_rumination',
  'leave-rumination-2026',
  '靜定，跳出內耗黑洞',
  '期初演講・回顧',
  '/images/sit-quiet.jpg',
  'lecture',
  '2026-03-11 19:00:00+08',
  '2026-03-11 21:30:00+08',
  '工學大樓 E310',
  '淡江大學淡水校園',
  null,
  '談內耗是怎麼發生的，以及停下來的幾種方法。',
  $$很多人聽完說：「原來不是只有我會這樣。」

活動已經結束。下一場可以從茶會或社課開始。$$,
  null,
  'closed',
  null,
  null,
  null,
  null,
  'ended',
  'https://www.instagram.com/p/DVGrfkAk02g/',
  '[]'::jsonb,
  '2026-02-20 10:00:00+08',
  'published',
  true,
  false,
  11
)
on conflict (id) do nothing;

insert into event_assets (id, event_id, kind, url, caption, sort_order) values
  ('ea_fuyou_1', 'evt_fuyou', 'photo', '/images/floating-lights.jpg', '花園裡的光', 1),
  ('ea_fuyou_2', 'evt_fuyou', 'photo', '/images/still-tea.jpg', '茶', 2),
  ('ea_fuyou_3', 'evt_fuyou', 'photo', '/images/tea-gathering.jpg', '坐下來聊聊', 3),
  ('ea_walk_1', 'evt_walk', 'photo', '/images/garden-path.jpg', '覺軒小徑', 1),
  ('ea_walk_2', 'evt_walk', 'photo', '/images/campus-dusk.jpg', '傍晚的校園', 2),
  ('ea_brain_1', 'evt_brain', 'photo', '/images/club-class.jpg', '現場', 1),
  ('ea_brain_2', 'evt_brain', 'photo', '/images/grass-circle.jpg', '講完後的聊天', 2)
on conflict (id) do nothing;

insert into stories (
  id, slug, quote, body, display_name, role_label, photo_url, joined_label,
  related_event_id, consent, published_at, status, is_demo, sort_order
) values
(
  'st_an',
  'just-tagging-along',
  '我原本只是陪朋友來。',
  $$大一的時候我其實沒有想參加任何社團。朋友說茶會有喝的，我就跟著走。

到了才發現大家講話都蠻普通的，沒有人要我立刻相信什麼。後來社課我也去了幾次，慢慢變成每週三晚上會空下來的那種人。

如果你也是被拖去的，沒關係。被拖去，有時候是最好的開始。$$,
  '小安',
  '社員',
  '/images/story-mei.jpg',
  '2024 年加入',
  'evt_fuyou',
  true,
  '2026-09-01 10:00:00+08',
  'published',
  true,
  1
),
(
  'st_zhe',
  'first-was-tea',
  '第一次參加是茶會。',
  $$我本來以為禪學社會很安靜、很嚴肅，結果茶會吵得剛剛好。有人在聊期中、有人在聊家裡的事，也有人什麼都不講，坐著看燈。

那種「我可以只是在這裡」的感覺，大學很少給。$$,
  '阿哲',
  '社員',
  '/images/story-hao.jpg',
  '2025 年加入',
  'evt_fuyou',
  true,
  '2026-09-01 10:00:00+08',
  'published',
  true,
  2
),
(
  'st_yu',
  'thought-it-was-boring',
  '我本來以為禪修會很無聊。',
  $$坐了十分鐘我就想拿出手機。後來才知道原來大家都這樣，只是沒講。

學長說：「跑掉就跑掉，把注意力帶回來就算一次。」聽完之後，我對自己沒那麼兇了。

大學裡終於找到一個可以慢下來的地方。$$,
  '小雨',
  '社員',
  '/images/story-lin.jpg',
  '2025 年加入',
  'evt_sit',
  true,
  '2026-09-01 10:00:00+08',
  'published',
  true,
  3
)
on conflict (id) do nothing;

insert into faq (id, question, answer, icon, sort_order, published) values
  ('faq_alone', '一個人來可以嗎？', '可以，而且很常見。很多人都是一個人來的。到現場會有人跟你說今天大概怎麼走，不用自己找話題。', 'user', 1, true),
  ('faq_awkward', '第一次參加會很尷尬嗎？', '一開始當然會有一點點。可是沒有人會要你自我介紹到很完整，也沒有破冰遊戲要你表演。先找位子坐下，就已經算參加了。', 'smile', 2, true),
  ('faq_sit', '一定要會打坐嗎？', '不用。不會打坐才是正常的。想學再學，不想學也可以來喝茶、聽演講、走花園。', 'leaf', 3, true),
  ('faq_religion', '需要宗教信仰嗎？', '不需要。這裡是大學社團，不是寺廟報到。你可以有信仰，也可以沒有，都歡迎。', 'sun', 4, true),
  ('faq_once', '可以只來一次嗎？', '可以。先來坐坐看。加入之後也沒有人會每天點名。', 'calendar', 5, true),
  ('faq_wear', '穿什麼？', '校園平常的衣服就好。不用白衣服、不用運動服。花園晚上會涼，帶一件薄外套比較舒服。', 'shirt', 6, true),
  ('faq_serious', '活動會很嚴肅嗎？', '偶爾會安靜一下子，但整體比較像一群很好相處的人坐在一起。會笑、會聊天、也會發呆。', 'coffee', 7, true),
  ('faq_class', '社課都在做什麼？', '每週三晚上。有時候喝茶聊天，有時候聽一段分享，有時候練習把注意力拉回來。不是一直盤腿。', 'book', 8, true),
  ('faq_weekly', '加入社團之後一定每週都要來嗎？', '不用。期中很忙就先顧課。社團還在，人可以來去。', 'repeat', 9, true)
on conflict (id) do nothing;

insert into instagram_posts (id, post_url, thumbnail_url, caption, post_type, published_on, featured, sort_order) values
  ('ig_opening', 'https://www.instagram.com/p/DVGrfkAk02g/', '/images/lecture-hall.jpg', '禪學社期初活動。從大腦的深層休息，到跳脫內耗。', 'image', '2026-02-23', true, 1),
  ('ig_leader', 'https://www.instagram.com/p/DPayg3oketv/', '/images/sit-quiet.jpg', '靜定的力量｜領袖學禪的啟程', 'image', '2025-10-05', true, 2),
  ('ig_class', 'https://www.instagram.com/p/DJ3SH8iTHQn/', '/images/club-class.jpg', '週三社課。做自己和別人生命中的光。', 'image', '2025-05-19', true, 3),
  ('ig_tea', 'https://www.instagram.com/tku_zc', '/images/tea-gathering.jpg', '茶會現場。一個人來也沒關係。', 'image', '2026-06-01', true, 4),
  ('ig_garden', 'https://www.instagram.com/tku_zc', '/images/garden-path.jpg', '覺軒花園。', 'image', '2026-04-12', true, 5),
  ('ig_dusk', 'https://www.instagram.com/tku_zc', '/images/campus-dusk.jpg', '淡水的傍晚。', 'image', '2026-05-02', true, 6)
on conflict (id) do nothing;

insert into assets (id, title, url, preview_url, asset_type, event_id, tags, published_at) values
  ('as_hero', '首頁花園', '/images/hero-garden.jpg', '/images/hero-garden.jpg', 'image', null, 'homepage,garden', now()),
  ('as_turtle', '龜龜', '/images/turtle.jpg', '/images/turtle.jpg', 'image', null, 'mascot', now()),
  ('as_tea', '茶會', '/images/tea-gathering.jpg', '/images/tea-gathering.jpg', 'image', 'evt_fuyou', 'tea', now()),
  ('as_lights', '浮游禪光', '/images/floating-lights.jpg', '/images/floating-lights.jpg', 'poster', 'evt_fuyou', 'tea,canva', now())
on conflict (id) do nothing;

insert into content_blocks (id, page, block_key, title, body, sort_order, visible) values
  ('cb_hero', 'home', 'hero', '在很忙的大學生活裡，留一點時間，認識自己。', '第一次來也沒關係', 1, true),
  ('cb_events', 'home', 'events', '最近有什麼活動？', '想參加，選一場就好。', 2, true)
on conflict (id) do nothing;
