var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('customersdb', ['customers']);

var router = express.Router();

router.get('/', function(req, res, next) {
    //console.log('Get all customers')
    db.customers.find(function(err, customers) {
        if (err) {
            res.send(err);
        }
        res.json(customers);
    });
});

router.get('/:id', function(req, res, next) {
    //console.log('Get Customer with ID: ' + req.params.id)
    db.customers.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, customer) {
        if (err) {
            res.send(err);
        }
        res.json(customer);
    });
});

router.post("/", function(req, res, next) {
    var customer = req.body;
    console.log(customer)
    db.customers.save(customer, function(err, customer) {
        if (err) {
            res.send(err);
        }
        res.json(customer);
    });
});

router.put('/:id', function(req, res, next) {
    console.log("inside put")
    var customer = req.body
    console.log(customer);
    let updatedCustomer = {
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email
    }

    db.customers.update({ _id: mongojs.ObjectId(req.params.id) }, updatedCustomer, {}, function(err, customer) {
        if (err) {
            res.send(err)
        }
        res.json(customer)
    })
});

router.delete('/:id', function(req, res, next) {
    db.customers.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, customer) {
        if (err) {
            res.send(err);
        }
        res.json(customer);
    });
});

module.exports = router;