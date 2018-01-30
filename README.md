# datatables-quickedit

Плагин для JQuery Datatables, позволяет изменять содержимое ячеек в таблице и выполнять какие-либо действия с измененными данными.

## Installation

### npm

```bash
npm i datatables-quickedit
```

```js
/* Jquery Datatables */
import 'datatables.net/js/jquery.dataTables.js';
import 'datatables.net-dt/css/jquery.dataTables.css';

/* datatables-quickedit */
import 'datatables-quickedit/js/dataTables.quickEdit.js';
```

### Direct <script> Include

```html
<!-- Jquery Datatables -->
<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.16/css/jquery.dataTables.css">
<script type="text/javascript" charset="utf8" src="//cdn.datatables.net/1.10.16/js/jquery.dataTables.js"></script>

<!-- datatables-quickedit -->
<script src="dataTables.quickEdit.js"></script>
```

## Usage

```html
<table>
  <thead>
    <tr>
      <th>1 колонка</th>
      <th>2 колонка</th>
    </tr>
  </thead>
  <tbody>
     <tr>
       <td>1 значение</td>
       <td>2 значение</td>
     </tr>
  </tbody>
</table>
```

```js
var table = $('table').DataTable({
  quickEdit: {
    selector: 'td',
    callback: function(data) {
      /* Make something with updated data from row */
      makeSomethingWithRowData(data);
    },
    editableClass: 'active'
  }
});
```






