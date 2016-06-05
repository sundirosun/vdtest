var express = require('express');
var Obj = require('../model/obj');

var router = express.Router();

router.route('/object')
    .post(function(req, res) {
        var obj = new Obj();
        obj.key = req.body.key;
        obj.value = req.body.value;

        obj.save(function(err) {
            if (err) 
                res.send(err);
            
            res.json('{' + obj.key + ':' + obj.value + '}');
        });
        
    });

router.route('/object/:key')
	.get(function(req, res) {
		if (!req.query.timestamp){
	        Obj.findOne({
	        		key : req.params.key
	        	})
	           	.sort({
	           		created_date:-1
	           	})
	           	.exec(function(err, objs) {
	            	if (err)
		                res.send(err);

		            if (objs)
		            	res.json(objs.value);
		            else
		            	res.send(null);
	        });
    	} else {
    		Obj.findOne({
    				key : req.params.key, 
    				created_date: {$lte: new Date(req.query.timestamp*1000)}
    			})
    			.sort({
    				created_date:-1
    			})
    			.exec(function(err, objs) {
		            if (err)
		                res.send(err);

		            if (objs)
		            	res.json(objs.value);
		            else
		            	res.send(null);
	        });
    	}
    });

module.exports = router;
