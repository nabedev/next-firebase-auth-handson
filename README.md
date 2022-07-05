![preview](https://user-images.githubusercontent.com/26590545/177315753-ec55e865-3423-425f-8e4e-d963f2b176b9.png)



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
