import parse from 'html-react-parser';

export type MiddleSectionProps = {
  text: string;
};

export default function MiddleSection(props: MiddleSectionProps) {
  const { text } = props;

  const insertion = `<span className="page-question-text">${text}</span>`;

  return (
    <div className="page-question">
      {/* <span className="page-question-text">{text}</span> */}
      {parse(insertion)}
    </div>
  );
}
