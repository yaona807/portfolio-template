# portfolio-template

エンジニア・クリエイター向けの自己紹介・実績公開用ポートフォリオサイトのテンプレートです。React（TypeScript）+ MUI製。設定ファイルを書き換えるだけで誰でも簡単に自分専用のポートフォリオを作成できます。

## 主な特徴
- 設定ファイル（portfolio.json）でプロフィール・SNS・スキル・職務経歴などを簡単カスタマイズ
- ダークモード対応
- レスポンシブデザイン
- プロジェクト詳細は外部Markdownで記述可能
- アイコン画像・faviconも設定ファイルで切り替え可能
- MITライセンスで商用・個人利用問わず自由に利用可能

---

## セットアップ

```sh
git clone https://github.com/yaona807/portfolio-template.git
cd portfolio-template
npm install
npm start
```

---

## 設定ファイル（public/portfolio.json）のカスタマイズ

### 基本情報
- `name`: サイトに表示する名前
- `icon`: アイコン画像ファイル名（public配下に配置）
- `about`: 自己紹介文

### SNSリンク
`sns` 配列にSNS名・URL・アイコン名を追加できます。
`icon` には `GitHub` や `X` など、MUIのアイコン名を指定してください。

### Skills（スキル）
`skills` 配列にスキル名を追加できます。スキル名から自動で色が割り当てられます。

### 職務経歴・プロジェクト詳細
- `workExperience` 配列で職歴・プロジェクトを管理
- 各プロジェクトの詳細は `descriptionFile` で外部Markdownファイルを指定可能

---

## アイコン・faviconのカスタマイズ

`portfolio.json` の `icon` プロパティで任意の画像（例: my-icon.png）を指定すると、ヘッダーのアバター画像・faviconの両方に反映されます。

---

## ライセンス

MIT License.
