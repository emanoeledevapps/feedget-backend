import {FeedbackRepository} from '../repositories/feedbacksRepository';
import { MailService } from '../services/mailService';

interface SubmitFeedbacksUseCaseRequest{
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbacksUseCase{
    constructor(
        private feedbacksRepository: FeedbackRepository,
        private mailService: MailService
    ){}

    async execute(request: SubmitFeedbacksUseCaseRequest){
        const {type, comment, screenshot} = request;

        if(!type){
            throw new Error('Type is required!')
        }

        if(!comment){
            throw new Error('Comment is required!')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid image format!');
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailService.sendMail({
            subject: 'Novo feedback',
            body: [
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` : ``
            ].join('\n')
        })
    }
}