import { SubmitFeedbacksUseCase } from "./submitFeedbacksUseCase";

const submitFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbacksUseCase(
    {create: submitFeedbackSpy},
    {sendMail:sendMailSpy}
)

describe('Submit feedbackk', () => {
    it('shoul be able to submit a feedback', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'testando jest',
            screenshot: 'data:image/png;base64'
        })).resolves.not.toThrow()

        expect(submitFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })
})