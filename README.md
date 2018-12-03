# 実験放送用ランキングゲームテンプレート

cas.nicovideo.jpへ投稿可能なコンテンツを作成する際のテンプレートです。  

# 最低限書き換える部分
- package.jsonのname
- game.jsonのサポートタイプ


# メモ書き
ゲーム開始時のInitialSceneはカスタマイズできないため、グローバルアセットを読み込む際のプログレスバーは弄れない。  
シーン遷移でそれぞれのシーンが次のシーンへの参照を持つの納得いっていない。

# リンク

- https://cas.nicovideo.jp
- https://akashic-games.github.io/guide/ranking.html
