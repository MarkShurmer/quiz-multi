export type ActivityHeaderProps = {
  header: string;
  questionNumber: number;
};

export default function ActivityHeader(props: ActivityHeaderProps) {
  const { header, questionNumber } = props;

  return (
    <header className="page-header">
      <h1>{header}</h1>
      <h2>Q{questionNumber}.</h2>
    </header>
  );
}
