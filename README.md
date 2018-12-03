# 実験放送用ランキングゲームテンプレート

cas.nicovideo.jpへ投稿可能なコンテンツを作成する際のテンプレートです。  

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
