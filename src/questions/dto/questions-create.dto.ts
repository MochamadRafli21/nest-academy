export class CreateQuestionsDto {
    readonly title: string;
    readonly question: string;
    readonly options: number[];
    readonly answer: string;
}