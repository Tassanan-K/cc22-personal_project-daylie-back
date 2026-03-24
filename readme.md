daylie-app-back
===
### env guide
PORT=3001   
DATABASE_URL=***   
JWT_SECRET=cc22daylie

---

### service

|path |method |authen |params |query |body |
|:-- |:-- |:-- |:-- |:-- |:-- |
|/api/auth/register|post|-|-|-| {username, email, password, confirmPassword}
|/api/auth/login|post|-|-|-| {username, password}
|/api/auth/me|get|y|-|-|-|-|
|/api/auth/me|patch|y|-|-| {username, email, password}
|/api/mydiary|post|y|-|-| {title, content}
|/api/mydiary|get|y|-|-|-|-|
|/api/mydiary/:id|get|y|-|-|-|
|/api/mydiary/iconId|get|y|iconId|-|-|
|/api/mydiary/tag/:tagName|get|y|tagName|-|-|
|/api/mydiary/search|get|y|search|-|-|
|/api/mydiary/:id|patch|y|id|-| {date, icon, content, tag, image}
|/api/mydiary/:id|delete|y|id|-|-|
