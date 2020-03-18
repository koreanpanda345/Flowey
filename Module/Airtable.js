const Airtable = require('airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: api
});
var base = Airtable.base('appI2X0jR7jcQvacQ');

module.exports = class AirTable{
  constructor(){
    
  }
  /***
   * Creates a new Record for Airtable
   * @typedef {AirTableFields} fields
   * @property {Number} id - the user's id. This is required.
   * @property {Number} balance - the user's balances. By default it is 0.
   * @property {Number} votes - the user's votes. By default it is 0.
   * @property {Number} weekly - the user's weekly votes. By default it is 0.
   * @property {String} desc - the user's description. By default it is "No Descripition".
   * @property {URL} background - the user's background, by default it is "https://i.imgur.com/VI1bAUr.jpg"
   * @property {String} birthday - the user's birthday, by default it is "1/1/2020"
   * @property {Number} xp -the user's xp, by default it is 0
   * @property {Number} level - the user's level, by default it is 0
   * @property {String} marry - the user's marry, by default it is "No one"
   * @property {String} ownBgName - the user's own bg names, by default it is Default-Pink
   * @property {URL} ownBgUrl - the user's own bg url, by default it is https://i.imgur.com/VI1bAUe.jpg
   */
  CreateUser(fields = {}){
    if(!fields.id) return console.log('Need an id in order to create a record.');
    if(!fields.balance) fields.balance = 0;
    if(!fields.votes) fields.votes = 0;
    if(!fields.weekly) fields.weekly = 0;
    if(!fields.desc) fields.desc = "No Description";
    if(!fields.background) fields.background = "https://i.imgur.com/VI1bAUr.jpg";
    if(!fields.birthday) fields.birthday = "1/1/2020";
    if(!fields.xp) fields.xp = 0;
    if(!fields.level) fields.level = 0;
    if(!fields.marry) fields.marry = "No one";
    if(!fields.ownBgName) fields.ownBgName = "Default-Pink";
    if(!fields.ownBgUrl) fields.ownBgUrl = "https://i.imgur.com/VI1bAUr.jpg"
    
    base('Users').create([{
      "fields": {
        "ID": fields.id,
        "balance": fields.balance,
        "xp": fields.xp,
        "level": fields.level,
        "votes": fields.votes,
        "weekly": fields.weekly,
        "description": fields.desc,
        "background": fields.background,
        "birthday": fields.birthday,
        "marry": fields.marry,
        "ownBgName": fields.ownBgName,
        "ownBgUrl" : fields.ownBgUrl
      }
    }], function(err, record){
      if(err) return console.error(err);
    });

  }
  
}
