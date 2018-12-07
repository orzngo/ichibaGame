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


の順に遷移。MyInitialSceneに具体的な表示内容はなく、初期化完了後直ちにTitleSceneへ遷移する。


## シーン間でのデータの受け渡し
- シーンのコンストラクタで渡す
- game.varsなどのオブジェクト経由で渡す

アセットは受け渡すくらいならglobalアセットにしたほうがよい。  
最初のカスタムできないロード画面が長くなるため、MyInitialSceneでロードして使い回す、という方法もある。

## 背景について
背景を透過すると、実験放送上では配信映像が見えるが、RPGアツマール上では黒背景になる。  
isAtsumaruで背景に白いスプライトを置くなどの対応を取る必要あり。


## Entityのupdateについて
現時点では、updateに関数が登録されているEntityをdestroyすると高確率で例外吐いて死ぬ。
Entityに定義したonUpdateメソッドを、シーンのメインループで呼ぶ、昔ながらの方法が安心安定。  
もしくは、updateに関数を登録したEntityはdestroyしない、という方法もある。  
  
タイマーやスコア表示など、シーンのメインループとの同期が（脳内的に）そこまで重要でないものについてはupdateに登録。  
敵や弾のEntityのupdateなどはメインループから呼ぶ、が今のところベターな手法に思える。


# メモ書き
ゲーム開始時のInitialSceneはカスタマイズできないため、グローバルアセットを読み込む際のプログレスバーは弄れない。  
シーン遷移でそれぞれのシーンが次のシーンへの参照を持つの納得いっていない。

# リンク

- https://cas.nicovideo.jp
- https://akashic-games.github.io/guide/ranking.html
