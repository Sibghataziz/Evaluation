
import express from 'express';
import { addHostels, bookHostel, getAllHostels, getBookedHostels, getHostel,  } from '../controllers/hostel.controllers.js';
import checkUser from '../middleware/checkUser.js';

const hostelRouter = express.Router()

hostelRouter.use(checkUser)
hostelRouter.get('/', getAllHostels)
hostelRouter.post('/', addHostels)
hostelRouter.get('/:id', getHostel)
hostelRouter.get('/:id/booked', getBookedHostels)
hostelRouter.patch('/:id', bookHostel)


export default hostelRouter