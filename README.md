# ポートフォリオサイト / Portfolio Website

LITALICO（litalico.co.jp）への応募を想定して制作した、個人ポートフォリオサイトです。
あたたかく・やさしく・ちょっと手描き（涂鸦／doodle）な世界観で、LITALICOのブランドトーンに寄せています。

A warm, friendly, doodle-flavored single-page portfolio — tuned to LITALICO's brand tone.

## 構成 / Sections

1. **首页（Hero + Works）** — 3つのカテゴリーで作品を分類表示
   - ① **UI/UX システム**（3点）
   - ② **イラスト**（5〜6点）
   - ③ **大学時代のデザイン**（グラフィック）
2. **About（私について）** — 自己紹介 + 職務経歴タイムライン
3. **Contact（お問い合わせ）** — 2種類の連絡方法（Email / Instagram）

## 使い方 / Run it

ビルド不要の静的サイトです。ローカルで開くだけ：

```bash
# どちらでもOK
open index.html
# または簡易サーバー
python3 -m http.server 8000   # → http://localhost:8000
```

## 差し替えるべきプレースホルダー / Replace these placeholders

検索して、ご自身の情報に置き換えてください（`index.html`）：

| プレースホルダー | 内容 |
| --- | --- |
| `YOUR NAME` / `お名前` | あなたの名前 |
| `your.name@example.com` | メールアドレス |
| `@your_id` / `instagram.com/your_id` | SNSアカウント |
| 経歴（`○○株式会社` など） | 実際の職歴・学歴 |
| 各作品の `card-title` / `card-text` | 実際のプロジェクト名・説明 |

### 画像の差し替え / Swapping in real images

現在、作品は **SVGのプレースホルダー** で表示しています。実画像に差し替えるには：

1. 画像を `assets/img/` に置く
2. 該当する `<svg class="mock">…</svg>` を次のように置換：

```html
<img class="mock" src="assets/img/your-work.png" alt="作品の説明" />
```

イラスト（`illust-card`）は絵文字をプレースホルダーにしています。
`<div class="illust-art">…</div>` の中身を `<img>` に差し替えてください。

## デザインの考え方 / Design notes

- **配色**：コーラル（主役）＋ イエロー・ティール・ピンク・ブルー（遊びのアクセント）。LITALICOのあたたかさを意識。
- **フォント**：`Zen Maru Gothic`（丸ゴシックでやさしく）＋ `Caveat`（手書きアクセント）。
- **手描き要素**：星・キラキラ・波線・矢印などをSVGスプライトで散りばめ、涂鸦感を演出。
- **アクセシビリティ**：`prefers-reduced-motion` 対応、十分なコントラスト、キーボード操作・代替テキストに配慮。

## ファイル / Files

```
index.html              # マークアップ（全セクション）
assets/css/style.css    # デザインシステム・スタイル
assets/js/main.js       # ナビ・フィルター・スクロール演出
assets/img/             # 実画像の置き場所（差し替え用）
```
