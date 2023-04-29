export type QuestionProps = {
  text: string;
};

export default function Question(props: QuestionProps) {
  const { text } = props;

  return (
    <div className="page-question">
      <span className="page-question-text">{text}</span>
    </div>
  );
}
