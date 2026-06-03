# わかば個別指導塾 LP

静的ランディングページ（FLOCSS構成）

## ディレクトリ構成

```
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css          # コンパイル後のCSS
│   ├── scss/
│   │   ├── global/
│   │   ├── foundation/
│   │   ├── layout/            # _header, _footer, _mv, _section, _inner
│   │   ├── object/
│   │   └── style.scss
│   ├── js/
│   │   ├── main.js
│   │   ├── hamburger.js
│   │   └── lib/               # 外部ライブラリ（Swiper）
│   ├── img/
│   │   ├── common/
│   │   ├── fv/
│   │   ├── concept/
│   │   ├── course/
│   │   ├── faq/
│   │   └── contact/
│   └── favicon/
├── README.md
└── .gitignore
```

## SCSSのコンパイル

```bash
npx sass assets/scss/style.scss assets/css/style.css --watch
```

本番用（圧縮）:

```bash
npx sass assets/scss/style.scss assets/css/style.css --style=compressed
```

## ローカル確認

`index.html` をブラウザで開くか、簡易サーバーで確認してください。

```bash
npx serve . 　
```
## ブランチ運用

main
└─ feature/header
└─ feature/fv
└─ feature/concept
└─ feature/course
└─ feature/faq
└─ feature/contact

##　　作業手順

1. mainからブランチ作成
2. 担当箇所を実装
3. push
4. Pull Request作成
5. レビュー後mainへマージ