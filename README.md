# high-level-wallet



## Pending items:

- Add webpack/build support.
- Add idempotent key support.
- Deploy using pm2 - so that multiple cores of same nodes can be used.
- Support to run on EBS/Docker
- Winston or other logging library
- Do we need to create 1 more service - TransactionService?
- nohup npm run start-test > app.log 2>&1 &



# Wallet APIs

This documentation provides details on the Wallet API, which allows you to manage wallets, check balances, fetch transaction history, and perform credit and debit operations.

## Table of Contents

1. [Setup Wallet](#1-setup-wallet)
2. [Get Wallet Balance](#2-get-wallet-balance)
3. [Fetch Transactions List](#3-fetch-transactions-list)
4. [Credit/Debit Balance](#4-creditdebit-balance)



## Base path:

For now, you can use base path as `http://18.232.86.26:3001/` and can try any of the below apis with this. Alternatively UI code is hosted here: http://18.232.86.26:3000/transactions , you can try that too.


## 1. Setup Wallet

Create a new wallet with an initial balance.

In this API, you will have to pass 2 parameters:

- `name` (String): This is the name/username of the wallet owner. It can be any string.
- `balance` (Optional, Number): It tells with how much balance should be initialized. The default value of this is `0`.


### Request

```http
POST /setup
Content-Type: application/json

{
    "balance": 20.1234565,
    "name": "shantnu6"
}
```


### Response

```json
{
    "id": "64fefdaf61f78309ea6e064a",
    "balance": 20.1235,
    "transactionId": "64fefdaf61f78309ea6e064c",
    "name": "shantnu6",
    "date": "2023-09-11T11:44:47.866Z"
}
```




## 2. Get Wallet Balance

Retrieve the balance of a wallet by its ID.

In this API, you will have to pass 1 parameter:

- `walletId` (String): This is the wallet ID for which you want to get the wallet information.


### Request

```http
GET /wallet/{walletId}
```

### Response

```json
{
    "id": "64fefdaf61f78309ea6e064a",
    "balance": 20.1235,
    "name": "shantnu6",
    "date": "2023-09-11T11:44:47.866Z"
}
```


## 3. Fetch Transactions List

Retrieve a list of transactions for a wallet.

In this API, you will have to pass 4 parameters:

- `walletId` (String): This is the wallet ID for which you want to get the transaction details.
- `skip` (Optional, Number): It tells how many initial entries you want to skip. This can be used for pagination.
- `limit` (Optional, Number): How many transactions do you want to get in the response of the API call. Default is 10. Maximum can be 100.
- `sort` (Optional): With this, you can sort the transactions. For example, to sort by amount in ascending order, use `&sort[amount]=1`. If nothing is passed, sorting is done on time (DESC) and amount (DESC).


### Request

```http
GET /transactions?walletId={walletId}&skip={skip}&limit={limit}&sort[type]=1
```


### Response

```json
{
    "totalTransactions": 13,
    "transactions": [
        {
            "walletId": "64fdd84e35ff8b3759ccab6f",
            "amount": 2,
            "balance": 330.8,
            "description": "trip share",
            "type": "CREDIT",
            "date": "2023-09-10T15:23:35.244Z",
            "id": "64fddf77d955a3abef06ca31"
        },
        // ... (more transactions)
    ]
}
```



## 4. Credit/Debit Balance

Credit or debit a wallet's balance.

In this API, you will have to pass 3 parameters:

- `walletId` (String): This is the wallet ID for which you want to perform the operation.
- `amount` (Number): This is the amount you want to add/subtract from the wallet balance. Send a positive number to add/credit some balance, and a negative number to subtract/debit some balance.
- `description` (String): This is a character string telling why this operation is being occurred.

Please note that both parameters ( amount, description ) are mandatory to be sent as of now.

### Request

```http
POST /transact/{walletId}
Content-Type: application/json

{
    "amount": 150,
    "description": "trip-3"
}
```


### Response

```json
{
    "balance": 480.8,
    "transactionId": "64feff5161f78309ea6e0655"
}
```





## 5. Export transactions

This api can be used to export all the transactions of any wallet.

In this API, you will have to pass 2 parameter:

- `walletId` (String): This is the wallet ID for which you want to get the wallet information.
- `sort` (Optional): With this, you can sort the transactions. For example, to sort by amount in ascending order, use `&sort[amount]=1`. If nothing is passed, sorting is done on time (DESC) and amount (DESC). This is same as Fetch transaction list api.

### Request

```http
GET /transactions/export?walletId=64fdd84e35ff8b3759ccab6f&sort[amount]=1
```

### Response

```json
{
    "id": "64fefdaf61f78309ea6e064a",
    "balance": 20.1235,
    "name": "shantnu6",
    "date": "2023-09-11T11:44:47.866Z"
}
```
