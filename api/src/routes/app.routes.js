/**
 * Main Webservice Routes application
*/
import { TagController } from './../controllers/tag.controller';

const tag = new TagController();

const routes = (app) => {
    // TAGS
    app.route('/tag')
    .get(tag.getAllTags)
    .post(tag.addNewTag);    
    //CRUD - tag
    // ...Specific contact
    app.route('/tag/:name')
    // CREATE specific tag by name
    // GET specific contact by Id
    .get(tag.getTagByName)
    // UPDATE / PUT specific contact by Id
    .put(tag.updateTagByName)
    // DELETE
    .delete(tag.deleteTagByName);    
};


export default routes;