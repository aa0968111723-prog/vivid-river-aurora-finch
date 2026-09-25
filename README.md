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
migrations          schema + demo seed（is_demo = true）
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
`migrations/0003_seed.sql` 少量 demo（`is_demo = true`，可刪）

Demo 活動含：浮游禪光、期初演講、週三社課、覺軒花園散步、禪修體驗。

## Admin

第一位登入的人會成為 admin。之後的人預設 viewer，需由管理者調整 `profiles.role`。

後台可：新增/編輯活動、報名網址、狀態、封面、IG 精選、故事、FAQ、素材網址、公告。

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
