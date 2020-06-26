## Building a simple task queue in node.js with bee-queue and redis.
>Check out the link to read the published article

### To run it locally

```sh
$ npm install
$ npm start
```
#### Endpoints
+ GET `/`

Check restaurant status

+ POST `/order` with `JSON` body

> Request body
```json
{
	"dish": "Chicken Al-faham",
	"qty": 2
}
```

> Response body
```json
{
  "done": true,
  "message": "Your order will be ready in a while"
}
```

+ POST `/order-legacy` with `JSON` body

> Request body
```json
{
	"dish": "Tacos",
	"qty": 4
}
```

> Response body
```json
{
  "done": true,
  "message": "Your 4x Tacos is ready"
}
```

