
import DB from '../db.js';


export default class Model{

      
      constructor()
      {
         this.tableName = tableName;
         this.objectId='';
         this.db=DB.table(this.tableName);
      }

      where(column, option, value) {
        this.db.where(column, option, value);
        return this;
      }
      orderBy(column, asc = 'asc') {
         this.db.orderBy(column, asc == 'asc' ? true : false);
         return this;
      }

      list() {
         return this.db.list();
      }


}