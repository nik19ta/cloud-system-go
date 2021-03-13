# Post request ✨

**Запрос должен передаваться по следующему шаблону:**

```js
{ 
  "type": "тип операции",
  "value": "{ в формате объекта, все значения для операции }"
 }
```
# Type:

> Тип операции и то в каком формате должны идти значения 

## local_files 📁
```js
"value": `{
  "dir": ""
}`
```
## read_file 📁
```js
"value": `{
  "file": ""
}`
```
## rename_file 📁
```js
"value": `{
  "filepath": "",
  "oldfilname": "",
  "newfilname": ""
  ""
}`
```
## delete_file 📁
```js
"value": `{
  "filepath": ""
}`
```

## create_file 📁
```js
"value": `{
  "isdir": "",
  "filepath": ""
}`
```

В ответ все приходит в таком же формате как и раньше 
