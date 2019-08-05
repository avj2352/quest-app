/**
 * Handler Functions
 */
import  converter  from './../lib/showdown-converter';

 export const convertMarkdown = (req, res) => {    
        // console.log('Parsing', req.body);
        if(typeof req.body.content == 'undefined' || req.body.content == null) {
            res.json(["error", "No data found"]);
        } else {
            const text = req.body.content;
            const html = converter.makeHtml(text);
            res.json({
                markdown: html
            });
        }    
 }