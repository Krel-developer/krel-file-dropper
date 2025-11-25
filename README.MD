Krel file dropper
Для использования одним файлом

В содержимом файла dist/index.html в теге "html" необходимо поменять соответствующие атрибуты на свои (data-baseurl="http://example.com" data-apiurl="api/example" data-token="")

Setup
Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Production
Есть два варианта билда, один потяжелее на 3 кб, при этом будут красивые уведомления. и второй вариант полегче но собщения будут выводиться в консоль

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Development Server

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```
