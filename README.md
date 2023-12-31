<h1 align="center">
  Vite React
</h1>

<p align="center">
    A <a href="https://vitejs.dev">Vite</a> + <a href="https://reactjs.org">React</a> starter template.
</p>

<p align="center">
  <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://vitejs.dev/logo.svg" alt="Vite logo">
  </a>
</p>

## Development

To get a local copy of the code, clone it using git:

```
git clone https://github.com/bratdr/iot-pern-prisma.git
cd iot-pern-prisma
```

Make it your own:

```
rm -rf .git && git init && npm init
git add .
git commit -m "Initial commit"
```

Install backend dependencies:

```
cd backend
yarn install
```

Install frontend dependencies:

```
cd frontend
npm i
```

Now, you can start a local frontend web server by running:

```
cd frontend
npm run dev
```

Now, you can start a local backend web server by running:

```
cd backend
nodemon app.js
```

And then open http://localhost:5173 to view it in the browser.

#### Available Scripts

In this project, you can run the following scripts:

| Script        | Description                                         |
| ------------- | --------------------------------------------------- |
| npm run dev   | Runs the app in the development mode.               |
| npm run build | Builds the app for production to the `dist` folder. |
| npm run serve | Serves the production build from the `dist` folder. |

for more scripts you can read the package.json in backend and frontend folder
