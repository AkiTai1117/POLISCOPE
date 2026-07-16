# POLISCOPE — 政治傾向診断

30の質問への回答から、政治的な傾向を「左 −100〜右 +100」の1軸で表示するレスポンシブWebアプリです。

> この診断は簡易的なコンテンツです。学術的な尺度ではなく、特定の政党・政治団体とも関係ありません。

## 主な機能

- 5段階で回答する全30問の診断
- 10問ずつ3ページに分けたステップ形式
- ページごとの未回答チェックと進捗表示
- 傾向スコア、判定名、スペクトラムバーによる結果表示
- Web Share APIとクリップボードによる結果共有
- PC・タブレット・スマートフォン対応
- 回答をサーバーやブラウザーストレージへ保存しない設計

## 技術構成

- Next.js 16 / React 19 / TypeScript
- Vinext / Vite
- CSS（外部UIライブラリ不使用）

## 開発環境

- Node.js 22.13.0以上
- npm

```bash
npm install
npm run dev
```

本番用のビルド確認は次のコマンドで行えます。

```bash
npm run build
```

## 保守・変更する場所

| 変更内容 | ファイル |
| --- | --- |
| 質問文と左右方向 | `lib/questions.ts` |
| 1ページの質問数 | `lib/questions.ts` の `QUESTIONS_PER_PAGE` |
| 回答の選択肢と点数 | `lib/questions.ts` の `ANSWER_OPTIONS` |
| スコア計算と判定境界 | `lib/diagnosis.ts` |
| 画面遷移と操作 | `components/diagnosis-app.tsx` |
| 色・レイアウト・スマホ対応 | `app/globals.css` |
| タイトルと説明文 | `app/layout.tsx` |

### 質問を追加・編集する

`lib/questions.ts` の `QUESTIONS` を編集します。各質問の `direction` は、その設問への賛成がどちらへ加点されるかを示します。

- `direction: -1`: 賛成すると左方向へ加点
- `direction: 1`: 賛成すると右方向へ加点

質問数を変更してもページ数は自動計算されます。質問の `id` は重複しない連番にしてください。

## 採点方法

各回答を `-2〜+2` とし、設問の `direction` を掛けて合計します。その合計を質問数に応じた最大値で正規化し、`-100〜+100` の整数として表示します。

同数の左向き・右向き設問を収録しているため、すべての質問へ同じ回答を選んだ場合は中道になります。

## ディレクトリ構成

```text
app/
  globals.css          # 全画面のスタイル
  layout.tsx           # メタデータと共通レイアウト
  page.tsx             # アプリの入口
components/
  diagnosis-app.tsx    # 診断UIと画面遷移
lib/
  diagnosis.ts         # 採点ロジック
  questions.ts         # 質問・回答・ページ設定
```

## 公開時の注意

クライアントのみで完結しており、データベースや実行ファイルは使用しません。GitHub Pagesなどへ静的配置する場合は、利用するホスティング環境に合わせてNext.jsの出力設定を追加してください。
