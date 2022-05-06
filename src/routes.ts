import express from 'express';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { NodemailerMailService } from './services/nodemailer/nodemailerMailService';
import { SubmitFeedbacksUseCase } from './useCases/submitFeedbacksUseCase';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const mailService = new NodemailerMailService();

    const submitFeedbacksUseCase = new SubmitFeedbacksUseCase(
        prismaFeedbacksRepository,
        mailService
    )

    await submitFeedbacksUseCase.execute({
        type,
        comment,
        screenshot
    })
    
    return res.status(201).send()
})