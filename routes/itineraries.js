const express=require('express');
const router=express.Router();
const {requireAuth}=require('../middleware/AuthMiddleware');
const itinerariesController=require('../controllers/itineraries');
router.get('/itineraries',requireAuth,itinerariesController.getAllItineraries);
router.get('/getUsers',requireAuth,itinerariesController.getAllUsers);

router.get('/itineraries/:id',requireAuth,itinerariesController.getIdItineraries);
router.put('/itineraries/:id',itinerariesController.putIdItineraries);
router.delete('/itineraries/:id',requireAuth,itinerariesController.deleteIdItineraries);
router.delete('/people/:id',requireAuth,itinerariesController.deleteuser);

router.post('/itineraries',requireAuth,itinerariesController.createItineraries);
router.put('/people/:id',requireAuth,itinerariesController.updateuser);

router.post('/signup',itinerariesController.signup);
router.post('/loginp',itinerariesController.login);
router.get('/logout',requireAuth,itinerariesController.logout_get);
module.exports=router;