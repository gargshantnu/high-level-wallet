# API Detials:

This documents provides curls for the apis mentioned in README.md file. Please refer: 

## 1. Setup wallet

```curl
curl --location 'http://localhost:3001/setup' \
--header 'Content-Type: application/json' \
--data '{
    "balance": 20.1234565,
    "name": "shantnu6"
}'
```


response:
```
{
    "id": "64fefdaf61f78309ea6e064a",
    "balance": 20.1235,
    "transactionId": "64fefdaf61f78309ea6e064c",
    "name": "shantnu6",
    "date": "2023-09-11T11:44:47.866Z"
}
```


## 2. Get wallet balance


```curl
curl --location 'http://localhost:3001/wallet/64fefdaf61f78309ea6e064a'
```

Response
```
{
    "id": "64fefdaf61f78309ea6e064a",
    "balance": 20.1235,
    "name": "shantnu6",
    "date": "2023-09-11T11:44:47.866Z"
}
```

## 3. Fetch transactions list


```curl
curl --location 'http://localhost:3001/transactions?walletId=64fdd84e35ff8b3759ccab6f&skip=0&limit=10'
```


Response:
```
{
    "totalTransactions": 13,
    "transactions": [
        {
            "walletId": "64fdd84e35ff8b3759ccab6f",
            "amount": 2,
            "balance": 330.8,
            "description": "abgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7babgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7b",
            "type": "CREDIT",
            "date": "2023-09-10T15:23:35.244Z",
            "id": "64fddf77d955a3abef06ca31"
        },
        {
            "walletId": "64fdd84e35ff8b3759ccab6f",
            "amount": 2,
            "balance": 328.8,
            "description": "abgyyi tgiyn tno7y novto 7iuync827cnnvyouinay7ntvnyo7tnwvyn7ontha7nto34yoqv7tyo7b",
            "type": "CREDIT",
            "date": "2023-09-10T15:23:20.723Z",
            "id": "64fddf68d955a3abef06ca29"
        },
        {
            "walletId": "64fdd84e35ff8b3759ccab6f",
            "amount": -2,
            "balance": 326.8,
            "description": "2",
            "type": "DEBIT",
            "date": "2023-09-10T15:13:18.934Z",
            "id": "64fddd0ed955a3abef06ca1b"
        },
        {
            "walletId": "64fdd84e35ff8b3759ccab6f",
            "amount": -2,
            "balance": 328.8,
            "description": "2",
            "type": "DEBIT",
            "date": "2023-09-10T15:13:14.357Z",
            "id": "64fddd0ad955a3abef06ca17"
        },
        {
            "walletId": "64fdd84e35ff8b3759ccab6f",
            "amount": -2,
            "balance": 330.8,
            "description": "2",
            "type": "DEBIT",
            "date": "2023-09-10T15:13:09.565Z",
            "id": "64fddd05d955a3abef06ca13"
        },
        {
            "walletId": "64fdd84e35ff8b3759ccab6f",
            "amount": 2,
            "balance": 332.8,
            "description": "w",
            "type": "CREDIT",
            "date": "2023-09-10T15:12:45.811Z",
            "id": "64fddcedd955a3abef06ca0a"
        },
        {
            "walletId": "64fdd84e35ff8b3759ccab6f",
            "amount": 2,
            "balance": 330.8,
            "description": "sa",
            "type": "CREDIT",
            "date": "2023-09-10T15:12:41.582Z",
            "id": "64fddce9d955a3abef06ca06"
        },
        {
            "walletId": "64fdd84e35ff8b3759ccab6f",
            "amount": 325,
            "balance": 328.8,
            "description": "4",
            "type": "CREDIT",
            "date": "2023-09-10T15:10:03.114Z",
            "id": "64fddc4bd955a3abef06c9f6"
        },
        {
            "walletId": "64fdd84e35ff8b3759ccab6f",
            "amount": 2,
            "balance": 3.8,
            "description": "2",
            "type": "CREDIT",
            "date": "2023-09-10T15:09:52.575Z",
            "id": "64fddc40d955a3abef06c9f0"
        },
        {
            "walletId": "64fdd84e35ff8b3759ccab6f",
            "amount": 1,
            "balance": 1.8,
            "description": "1",
            "type": "CREDIT",
            "date": "2023-09-10T15:09:09.117Z",
            "id": "64fddc15d955a3abef06c9e8"
        }
    ]
}
```




## 4. Credit/Debit balance

```curl
curl --location 'http://localhost:3001/transact/64fdd84e35ff8b3759ccab6f' \
--header 'Content-Type: application/json' \
--data '{
    "amount": 150,
    "description": "trip-3"
}'
```



Response:

```
{
    "balance": 480.8,
    "transactionId": "64feff5161f78309ea6e0655"
}
```