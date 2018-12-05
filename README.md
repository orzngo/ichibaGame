# 実験放送用ランキングゲームテンプレート

cas.nicovideo.jpへ投稿可能なコンテンツを作成する際のテンプレートです。  
RPGアツマール経由で投稿するという仕組み上、以下３つの環境で動くようにしています。

- cas.nicovideo.jp
- RPGアツマール
- ローカル npm start

# 最低限動かす方法
```
npm install
npm run build
npm start
```

# 最低限書き換える部分
- package.jsonのname
- game.jsonのサポートタイプ


# 説明など
## シーン遷移
- MyInitialScene
- TitleScene
- DescriptionScene
- MainScene
- ResultScene


の順に遷移。MyInitialSceneに具体的な表示内容はなく、初期化完了後直ちにTitleSceenへ遷移する。


# メモ書き
ゲーム開始時のInitialSceneはカスタマイズできないため、グローバルアセットを読み込む際のプログレスバーは弄れない。  
シーン遷移でそれぞれのシーンが次のシーンへの参照を持つの納得いっていない。

# リンク

- https://cas.nicovideo.jp
- https://akashic-games.github.io/guide/ranking.html
