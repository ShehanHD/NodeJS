const express = require('express');
const { fetchCompany, fetchCompanies, deleteCompany } = require('../model/companies');
const { fetchReference, addReference } = require('../model/reference');
const { newVisit, exit } = require('../model/visits');

const router = express.Router();

router.get('/companies', fetchCompanies);
router.get('/company/:id', fetchCompany);
router.get('/reference/:id', fetchReference);

router.delete('/company/:id', deleteCompany);

router.post('/visit', newVisit);
router.post('/addReference', addReference);
router.post('/exit/:id', exit);

module.exports = router;