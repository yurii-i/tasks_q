перед первым запуском в докере будет необходимо создать сеть 
```docker network create task_network```

запуск
```docker-compose up --build -d```

- На данный момент работает весь функцинал, кроме загрузки json и csv с тасками. 
Поэтому при добавлении тасок через запросы, нужно указывать заголовок 'application/json'

- Новые таски автоматически добавляются на страницу 
- Сохраняет легенда. 
- Пагинация динамическая - реагирует на смену размеров экрана

API
- добавление одной таски
```curl -d '{"name":"name", "description":"desc", "priority":2}' -H "Content-Type: application/json" -X POST http://localhost:3000/tasks```
- добавление нескольких тасок
```curl -d '[{"name":"name", "description":"desc", "priority":2},{"name":"name", "description":"desc", "priority":3}]' -H "Content-Type: application/json" -X POST http://localhost:3000/tasks```
- удаление тасок ("e" - "=", "g" - ">", l - "<")
```curl -d '{"action":"e", "priority":2}' -H "Content-Type: application/json" -X POST http://localhost:3000/remove_tasks```
