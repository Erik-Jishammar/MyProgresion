import express from 'express'; 
import { getExercises, createExercise, updateExercise, deleteExercise } from '../controllers/exerciseController';

const router = express.Router(); 

router.get('/exercises', getExercises);

router.post('/exercises', createExercise); 

router.put('/exercises/:id', updateExercise); 

router.delete('/exercises/:id', deleteExercise); 

export default router; 

	// Binder HTTP-endpoints till controllerfunktioner.
	