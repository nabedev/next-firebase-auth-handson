https://user-images.githubusercontent.com/26590545/175869374-2d71f0cd-f58e-41b8-9fa4-c76677e4022d.mov



Frontend
- Next.js
Backend
- Firebase Auth
- Apollo GraphQL server
DB
- MongoDB

TODO
- Apolloのキャッシュについて調べて、初期表示とかはキャッシュから読むようにしたい
- graphql-codegen を使ってGraphQLスキーマから型生成する。queryのhooksも自動生成できるぽいからそうしたい
- Next良く分かっていないけど、サーバー側で読んでるenvはクライアント側には公開されないぽいけどちゃんとその辺の運用について調べる
  - src/backend と src/pages/api 以下は機密性のある値を読んでるので、間違ってクライアント側から呼んでてバンドルされてないかとか確認したい
