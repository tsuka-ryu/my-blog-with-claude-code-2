---
title: 'Vimで生産性を向上させるコツ'
description: '日常のVim使用で実践している生産性向上のテクニックを紹介。'
date: '2024-02-20'
tags: ['Vim', 'Productivity', 'Tools']
category: 'Technology'
author: 'tsuka-ryu'
published: true
featured: false
slug: 'vim-productivity-tips'
---

# Vimで生産性を向上させるコツ

Vimを日常的に使用して数年が経ち、効率的な編集のためのテクニックが蓄積されてきました。実際に使用している生産性向上のコツを紹介します。

## Vimを選ぶ理由

### メリット

- **高速な編集**: キーボードのみで完結
- **軽量**: どの環境でも動作
- **カスタマイズ性**: 自分好みの環境を構築
- **SSH環境**: リモートサーバーでも同じ操作感

### 学習の心構え

Vimの習得は段階的に行うことが重要です。

```
1. 基本操作 (1-2週間)
2. 効率的な移動 (2-4週間)
3. テキストオブジェクト (1-2ヶ月)
4. カスタマイズ (継続的)
```

## 基本設定 (.vimrc)

### 必須設定

```vim
" 基本設定
set number              " 行番号表示
set relativenumber      " 相対行番号
set tabstop=2          " タブの表示幅
set shiftwidth=2       " インデント幅
set expandtab          " タブをスペースに展開
set autoindent         " 自動インデント
set smartindent        " スマートインデント

" 検索設定
set ignorecase         " 大文字小文字を無視
set smartcase          " 大文字を含む場合は区別
set incsearch          " インクリメンタル検索
set hlsearch           " 検索結果ハイライト

" 表示設定
set cursorline         " カーソル行ハイライト
set showmatch          " 括弧の対応表示
set laststatus=2       " ステータスライン常時表示
set ruler              " カーソル位置表示

" 操作性向上
set backspace=indent,eol,start  " Backspaceの動作改善
set clipboard=unnamed           " システムクリップボード使用
set mouse=a                     " マウス操作有効
```

### カラースキーム

```vim
" ダークテーマの設定
syntax enable
set background=dark
colorscheme desert

" もしくはモダンなテーマを使用
" colorscheme gruvbox
" colorscheme onedark
```

## 効率的な移動テクニック

### 1. 基本的な移動

```vim
" 文字単位
h, j, k, l          " 左、下、上、右

" 単語単位
w                   " 次の単語の先頭
b                   " 前の単語の先頭
e                   " 現在の単語の末尾

" 行内移動
0                   " 行の先頭
^                   " 行の最初の非空白文字
$                   " 行の末尾
f{char}             " 行内の指定文字に移動
t{char}             " 行内の指定文字の直前に移動
```

### 2. 高速移動

```vim
" 画面単位
Ctrl-f              " 1画面下
Ctrl-b              " 1画面上
Ctrl-d              " 半画面下
Ctrl-u              " 半画面上

" ファイル内移動
gg                  " ファイルの先頭
G                   " ファイルの末尾
{number}G           " 指定行に移動
%                   " 対応する括弧に移動
```

### 3. マーク機能

```vim
" マークの設定と移動
ma                  " 位置を'a'マークに保存
'a                  " 'a'マークに移動
''                  " 直前の位置に戻る

" 特別なマーク
'.                  " 最後に編集した位置
'^                  " 最後にインサートモードを抜けた位置
```

## テキストオブジェクト

### 1. 基本のテキストオブジェクト

```vim
" 単語
viw                 " 単語を選択
ciw                 " 単語を変更
diw                 " 単語を削除

" 括弧内
vi(                 " ( ) 内を選択
va(                 " ( ) を含めて選択
ci"                 " " " 内を変更
da'                 " ' ' を含めて削除
```

### 2. 実用的な組み合わせ

```vim
" HTML/XMLタグ
vit                 " タグ内を選択
dat                 " タグごと削除
cit                 " タグ内を変更

" 段落
vip                 " 段落を選択
dap                 " 段落を削除

" 文
vis                 " 文を選択
cas                 " 文を変更
```

## 便利なコマンド

### 1. 検索と置換

```vim
" 基本の検索
/pattern            " 前方検索
?pattern            " 後方検索
n                   " 次の検索結果
N                   " 前の検索結果

" 置換
:%s/old/new/g       " ファイル全体で置換
:'<,'>s/old/new/g   " 選択範囲で置換
:s/old/new/gc       " 確認しながら置換

" 正規表現を使った高度な置換
:%s/\v(\w+)\s+(\w+)/\2 \1/g  " 単語の順序を入れ替え
```

### 2. マクロ機能

```vim
" マクロの記録と再生
qa                  " 'a'レジスタにマクロ記録開始
q                   " 記録終了
@a                  " マクロ実行
@@                  " 最後のマクロを再実行
10@a                " マクロを10回実行
```

**実用例：行の整形**

```vim
" 以下の操作を記録
qa                  " 記録開始
0                   " 行頭に移動
i"                  " クォートを挿入
A"                  " 行末にクォートを挿入
j                   " 次の行
q                   " 記録終了
```

### 3. ウィンドウ操作

```vim
" ウィンドウ分割
:split              " 水平分割
:vsplit             " 垂直分割
Ctrl-w w            " ウィンドウ間移動
Ctrl-w h/j/k/l      " 指定方向のウィンドウに移動
Ctrl-w =            " ウィンドウサイズを均等化
```

## プラグインによる拡張

### 1. プラグインマネージャー

**vim-plug**を使用した例：

```vim
" .vimrcに追加
call plug#begin('~/.vim/plugged')

" ファイルツリー
Plug 'preservim/nerdtree'

" ファジーファインダー
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'

" Git統合
Plug 'tpope/vim-fugitive'

" 自動補完
Plug 'neoclide/coc.nvim', {'branch': 'release'}

" テーマ
Plug 'morhetz/gruvbox'

call plug#end()
```

### 2. 必須プラグイン設定

**NERDTree（ファイルツリー）**

```vim
" NERDTree設定
map <C-n> :NERDTreeToggle<CR>
let NERDTreeShowHidden=1
let NERDTreeIgnore=['\.git$', '\.DS_Store$']
```

**FZF（ファジーファインダー）**

```vim
" FZF設定
map <C-p> :Files<CR>
map <C-f> :Rg<CR>
map <C-b> :Buffers<CR>
```

**CoC（自動補完）**

```vim
" CoC設定
inoremap <expr> <Tab> pumvisible() ? "\<C-n>" : "\<Tab>"
inoremap <expr> <S-Tab> pumvisible() ? "\<C-p>" : "\<S-Tab>"
inoremap <expr> <CR> pumvisible() ? "\<C-y>" : "\<CR>"
```

## カスタムキーマッピング

### 1. 効率化のためのマッピング

```vim
" Escキーの代替
inoremap jj <Esc>

" 保存のショートカット
nnoremap <C-s> :w<CR>
inoremap <C-s> <Esc>:w<CR>a

" ハイライト解除
nnoremap <Esc><Esc> :nohlsearch<CR>

" 行の移動
nnoremap <A-j> :m .+1<CR>==
nnoremap <A-k> :m .-2<CR>==
```

### 2. 開発用マッピング

```vim
" コメントトグル（簡易版）
nnoremap <C-/> I// <Esc>

" 括弧の自動補完
inoremap ( ()<Left>
inoremap [ []<Left>
inoremap { {}<Left>
inoremap " ""<Left>
inoremap ' ''<Left>
```

## 言語別の設定

### JavaScript/TypeScript

```vim
" JavaScript/TypeScript設定
autocmd FileType javascript,typescript setlocal tabstop=2 shiftwidth=2
autocmd FileType javascript,typescript setlocal expandtab

" ESLintとの連携
let g:coc_global_extensions = ['coc-eslint', 'coc-tsserver', 'coc-prettier']
```

### Python

```vim
" Python設定
autocmd FileType python setlocal tabstop=4 shiftwidth=4
autocmd FileType python setlocal expandtab

" PEP8準拠のインデント
autocmd FileType python setlocal textwidth=79
autocmd FileType python setlocal colorcolumn=80
```

## 実践的なワークフロー

### 1. ファイル編集の流れ

```vim
" 1. ファイルを開く
:e filename         " ファイルを編集
:o filename         " ファイルを開く

" 2. 効率的な編集
/pattern            " 編集箇所を検索
cgn                 " 検索結果を変更（. で繰り返し）

" 3. 保存と終了
:w                  " 保存
:wq                 " 保存して終了
:q!                 " 保存せずに終了
```

### 2. 複数ファイルの編集

```vim
" バッファ操作
:ls                 " バッファ一覧
:b filename         " バッファに切り替え
:bd                 " バッファを削除

" タブ操作
:tabnew             " 新しいタブ
gt                  " 次のタブ
gT                  " 前のタブ
```

## トラブルシューティング

### よくある問題と解決策

```vim
" 1. 設定が反映されない
:source ~/.vimrc    " 設定ファイルを再読み込み

" 2. プラグインが動作しない
:PlugInstall        " プラグインをインストール
:PlugUpdate         " プラグインをアップデート

" 3. 文字化け
:set encoding=utf-8 " エンコーディングを設定
:set fileencoding=utf-8
```

## まとめ

Vimで生産性を向上させるためのポイント：

1. **段階的学習**: 基本から応用へ段階的に習得
2. **継続的練習**: 毎日少しずつでも使い続ける
3. **カスタマイズ**: 自分の作業スタイルに合わせた設定
4. **プラグイン活用**: 適切なプラグインで機能拡張
5. **ワークフロー最適化**: 自分の作業パターンを分析

### 学習リソース

- **vimtutor**: Vim組み込みのチュートリアル
- **Vim Adventures**: ゲーム形式でVimを学習
- **書籍**: 「実践Vim」「Vimテクニックバイブル」

Vimは最初の学習コストが高いですが、一度習得すると長期的に大きな生産性向上をもたらします。日々の少しずつの積み重ねが重要です。
