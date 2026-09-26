# 頁面編輯器與龜龜動畫的選擇

## 編輯器只用 Puck

採用 `@puckeditor/core` 0.23.0（MIT，React 19 peer，Node 20 以上）。

選它的原因：

- 它是 React 視覺化編輯器，區塊、欄位、拖曳、插槽和預覽寬度都有現成能力。
- 頁面存成我們自己的 JSON。公開網站用同一份區塊設定渲染，不需要把網站綁到另一個 CMS。
- 雙欄和三欄用 Puck 的 slot。不需要再裝第二套編輯核心。

沒有同時安裝 Craft.js（https://github.com/prevwong/craft.js ，MIT）。Craft.js 的節點樹可以做巢狀容器，但 Puck 的 slot 已經能做有約束的雙欄和三欄。兩套拖曳核心會讓儲存格式和操作互相打架。

Puck 的 `onPublish` 不是公開網站的發布開關。草稿、發布、還原和角色檢查在 `src/lib/pages/`，伺服器會再驗一次。

## 資料格式

`PageStore` 版本 1。每個頁面有 `draft` 和 `published`，以及更新者和時間。區塊只存版型、視覺和資料來源（例如 `upcoming`、`ended`、`featuredIg`、手動 id）。活動內文留在活動資料表。舊的 `SiteLayout` JSON 會在讀取時合併進新欄位，缺的欄位用預設值補上，已寫過的標題保留。

## 龜龜動畫

場景用 React Three Fiber v9 和 Drei，模型是 `public/models/turtle.glb`（手機用 `turtle-lite.glb`）。這是專案自己寫的低多邊形幾何，不是生成模型。

Theatre Studio 是 AGPL-3.0，不能放進正式網站。`@theatre/core` 也沒有裝，因為入場、說話、禪定、醒來已經由可測試的狀態機加上 GLB 裡的 AnimationMixer 片段負責。狀態切換時姿勢先維持原樣，再緩緩跟上，避免突然跳姿勢。
