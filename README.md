# To start an application

### 1. Create .env file inside server folder with 3 vars
```env
  MONGO_URI=
  SESSION_SECRET=
  # generate this token in github (need only access to public repos)
  GITHUB_TOKEN=
```

### 2. Start server
```sh
  cd server
  npm start
```

### 3. Start client
```sh
  cd client
  npm run dev
```
