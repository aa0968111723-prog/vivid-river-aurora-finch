# 淡江大學禪學社｜TKU Zen Club

淡江學生的數位入口：認識社團、看活動、報名、追 IG、加入。

主要使用者是第一次聽到「禪學社」的大一新生。不是宗教網站。

## 產品定位

讓學生在 5–10 秒內感覺：這是一群很好相處的人，一個人來也沒關係。

完整旅程：認識 → 產生興趣 → 瀏覽活動 → 報名 → 追 IG → 加入 → 持續參與。

## Tech stack

- TanStack Start + Router + React 19 + TypeScript
- Tailwind CSS v4
- Postgres（部署為 Neon；預覽為 PGLite）
- Better Auth（Google / X）給後台
- 圖片放 `public/images/`

## Architecture

```
src/routes          前台頁面 + /admin 後台
src/components      UI、首頁區塊、活動卡
src/lib/server      公開讀取 / 後台寫入
src/lib/integrations  Instagram / Canva / Drive adapter
migrations          schema。0003 是會被 0004 清掉的 demo；上線內容以真實資料為準
```

公開內容沒有 `user_id`（世界可讀）。後台變更走登入 + Admin / Editor / Viewer。

## 頁面

| 路徑 | 用途 |
|---|---|
| `/` | 首頁漏斗 |
| `/events` | 活動列表 |
| `/events/:slug` | 活動詳情與報名 CTA |
| `/first-time` | 第一次來 |
| `/about` | 認識我們 |
| `/stories` | 社員故事 |
| `/gallery` | 活動回顧 |
| `/join` | 加入我們 |
| `/admin/layout` | 首頁區塊、開場、固定頁文案 |
| `/admin` | 後台 |
| `/login` | 後台登入 |

## Setup

平台會注入 `DATABASE_URL` 與 auth 憑證。預覽不需要 `.env`。

本專案 **不會** commit `.env` 或任何 secret。

可選（未來正式串接時由部署環境提供，不要放到前端）：

| 變數 | 用途 |
|---|---|
| `DATABASE_URL` | Neon Postgres（部署時由平台注入） |
| Instagram Graph token | 尚未接上；現在用後台精選貼文 |
| Canva / Drive secrets | 尚未接上；現在用網址欄位 |

## Development / Build / Deploy

- `npm run dev` — 開發
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- 部署目標為 Vercel；`migrations/*.sql` 會在 build 時 migrate

## Database

`migrations/0001_auth.sql` Better Auth  
`migrations/0002_schema.sql` 活動、故事、FAQ、IG、素材、設定、分析  
`migrations/0003_seed.sql` 開發用 demo（`is_demo = true`）  
`migrations/0004_real_content.sql` 清掉 demo，只留下已核對的 FAQ、兩則 IG、三場已結束回顧  
`migrations/0005_real_images.sql` 把這兩則 IG 的真實縮圖接到活動封面，並修正 3/18 的貼文連結。時間 19:00–21:30 來自社團自己的 IG 文案。報名維持關閉。

前台查詢一律 `is_demo = false`。沒有活動、故事或 IG 時顯示空狀態，不補假卡、假人名、假名額。

可以放上網站的活動只有這三場，而且都已結束、不開放報名：

- 2026-03-04 教授沒教的大腦休息法／工學大樓 E310
- 2026-03-11 靜定，跳出內耗黑洞／工學大樓 E310
- 2026-03-18 領袖禪-專注的力量／宮燈 H117

IG 只收這兩則：<https://www.instagram.com/p/DVGrfkAk02g/>（3/4 與 3/11）、<https://www.instagram.com/p/DV5AccUEaW-/>（3/18）。縮圖是貼文本身的圖，放在 `public/images/ig/`。

文宣是從社團已公開的 IG 截圖裁出來的，個人 Line 與舊報名 QR 已從圖上拿掉。IG 縮圖是平台給的預覽，字有時被裁掉，所以只放在 IG 區塊，不拿來當活動封面。

## 幹部上線後要補

- 本學期已確認、還沒貼上網站的新活動（日期、教室、報名連結）
- 本人同意公開、且願意具名的社員故事
- 社費金額（確認前不要寫）
- 更多現場照時，仍不要把生成圖、內部申請表或名冊放上前台

## Admin

第一位登入的人會成為 admin。之後的人預設 viewer，需由管理者調整 `profiles.role`。

後台可：新增/編輯活動、報名網址、狀態、封面、IG 精選、故事、FAQ、素材網址、公告。

`/admin/layout`（editor / admin 可存，viewer 只能看）：

- 首頁區塊排序、顯示或隱藏、標題與副標
- 龜龜開場：開啟／預設跳過／關閉、六句台詞、要不要顯示龜龜
- Hero 主標、副標、兩顆按鈕、背景圖
- 認識我們、第一次來、加入我們、Footer 文案

沒有存過排版時，網站用程式裡的預設文案。改完會立刻出現在前台。

## Instagram / Canva / Google Drive

- Instagram：沒有 Graph API 時，後台貼入 Post URL + 縮圖 + caption。首頁壞掉時顯示「最近的 IG 貼文正在路上」。帳號 [@tku_zc](https://www.instagram.com/tku_zc)
- Canva：活動與素材上的 `canva_url`，Canva 不是 CMS
- Drive：adapter 已預留。尚未授權時請貼公開連結，OAuth secret 只放伺服器環境變數

## Analytics

隱私友善：只記 CTA 名稱、路徑、utm、活動 id。不記姓名、email、學號。

## Troubleshooting

- 預覽資料庫是記憶體 PGLite，重啟 dev server 會重跑 seed
- 後台 401：先走 `/login`
- IG 區塊空白：去後台「內容」貼精選，不要以為 API 已接通
- 報名人數不是即時 Google Form 同步，是社員手填
